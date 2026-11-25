"use client";

import { ProgressBar } from "@/components/ui/progress-bar";
import { percentDone } from "@/lib/progress";
import { useDone } from "@/lib/use-progress";

export function CourseProgress({ keys, label }: { keys: string[]; label: string }) {
    return <ProgressBar value={percentDone(keys, useDone())} label={label} />;
}
