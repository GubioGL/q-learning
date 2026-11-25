import "server-only";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import db from "./drizzle";
import { completions } from "./schema";

// While sign-in is optional, visitors get an anonymous id cookie so their progress is still saved.
const ANON_COOKIE = "ql_anon";
const ANON_MAX_AGE_S = 60 * 60 * 24 * 365;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

// create=true only from Server Actions (cookies can't be set while rendering a page).
export async function currentUserId(create = false): Promise<string | null> {
    const { userId } = await auth();
    if (userId) return userId;
    const jar = await cookies();
    const anon = jar.get(ANON_COOKIE)?.value;
    if (anon && UUID.test(anon)) return `anon:${anon}`;
    if (!create) return null;
    const id = crypto.randomUUID();
    jar.set(ANON_COOKIE, id, {
        httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: ANON_MAX_AGE_S, path: "/",
    });
    return `anon:${id}`;
}

// Keys the current visitor has completed; empty set for a new visitor.
export async function getDone(): Promise<Set<string>> {
    const userId = await currentUserId();
    if (!userId) return new Set();
    const rows = await db.select({ key: completions.key }).from(completions).where(eq(completions.userId, userId));
    return new Set(rows.map((r) => r.key));
}

export async function markDone(userId: string, key: string) {
    await db.insert(completions).values({ userId, key }).onConflictDoNothing();
}
