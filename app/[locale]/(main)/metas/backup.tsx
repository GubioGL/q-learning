"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n/context";
import { exportProgress, importProgress } from "@/lib/use-progress";

const FILE_NAME = "quantum-learning.json";

export function Backup() {
    const { goals: t } = useT();
    const input = useRef<HTMLInputElement>(null);
    const [imported, setImported] = useState<boolean | null>(null);

    const download = () => {
        const url = URL.createObjectURL(new Blob([exportProgress()], { type: "application/json" }));
        Object.assign(document.createElement("a"), { href: url, download: FILE_NAME }).click();
        URL.revokeObjectURL(url);
    };

    const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = ""; // lets the same file be chosen again
        if (file) setImported(importProgress(await file.text()));
    };

    return (
        <section aria-labelledby="backup-title" className="rounded-lg border border-(--ql-line) p-6">
            <h2 id="backup-title" className="mb-3 text-xl font-semibold text-gray-50">{t.backupTitle}</h2>
            <p className="mb-4">{t.backupText}</p>
            <div className="flex flex-wrap gap-3">
                <Button variant="buttonRox" onClick={download}>{t.exportFile}</Button>
                <Button variant="buttonBluO" onClick={() => input.current?.click()}>{t.importFile}</Button>
                <input ref={input} type="file" accept="application/json,.json" onChange={onFile} aria-label={t.importFile} className="hidden" />
            </div>
            <p role="status" className={`mt-3 ${imported ? "text-green-300" : "text-red-300"}`}>
                {imported === null ? "" : imported ? t.imported : t.importError}
            </p>
        </section>
    );
}
