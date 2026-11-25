import type { Lesson } from "@/lib/lesson";
import bits from "./bits";

export const lessons: Record<string, Lesson> = { [bits.id]: bits };
