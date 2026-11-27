import Image from "next/image";
import { asset } from "@/lib/asset";

const KETS = [
    { label: "|0⟩", className: "left-1/2 top-0 -translate-x-1/2" },
    { label: "|1⟩", className: "left-1/2 bottom-0 -translate-x-1/2" },
    { label: "|+⟩", className: "right-0 top-1/2 -translate-y-1/2" },
    { label: "|−⟩", className: "left-0 top-1/2 -translate-y-1/2" },
];

// Decorative: the mascot inside a Bloch-sphere-like orbit. Motion only when the visitor allows it (globals.css).
export function HeroVisual() {
    return (
        <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[22rem]">
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
                <circle cx="100" cy="100" r="82" fill="none" stroke="var(--color-purple-700)" strokeWidth="1.5" />
                <ellipse cx="100" cy="100" rx="82" ry="24" fill="none" stroke="var(--color-purple-800)" strokeWidth="1.2" strokeDasharray="4 4" />
                <g className="ql-orbit" style={{ transformOrigin: "100px 100px" }}>
                    <ellipse cx="100" cy="100" rx="92" ry="34" fill="none" stroke="var(--color-fuchsia-500)" strokeWidth="1.5" transform="rotate(-30 100 100)" />
                    <circle cx="180" cy="54" r="5" fill="var(--color-fuchsia-400)" />
                </g>
                <g className="ql-orbit-rev" style={{ transformOrigin: "100px 100px" }}>
                    <ellipse cx="100" cy="100" rx="92" ry="34" fill="none" stroke="var(--color-sky-500)" strokeWidth="1.5" transform="rotate(30 100 100)" />
                    <circle cx="20" cy="54" r="5" fill="var(--color-sky-400)" />
                </g>
            </svg>
            <Image src={asset("/cat-400.png")} alt="" width={200} height={200} priority
                className="ql-float absolute left-1/2 top-1/2 h-auto w-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_10px_30px_rgba(147,51,234,0.45)]" />
            {KETS.map((k) => (
                <span key={k.label} className={`absolute rounded-lg border-2 border-purple-700 bg-gray-900 px-2 py-0.5 font-mono text-lg font-bold text-purple-200 ${k.className}`}>
                    {k.label}
                </span>
            ))}
        </div>
    );
}
