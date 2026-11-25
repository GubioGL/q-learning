import type { Lesson } from "@/lib/lesson";
import bits from "./bits";
import portasLogicas from "./portas-logicas";

// The challenge trail, from the most basic level to the most advanced. Order matters: each level unlocks the next.
export const levels: Lesson[] = [bits, portasLogicas];

export const findLevel = (id: string) => levels.find((l) => l.id === id);
