import ReactMarkdown, { type Components } from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { isExerciseFence, parseExercise } from "@/lib/exercise";
import { ExerciseBlock } from "./exercise";

// Fenced blocks are rendered by `pre`; exercise fences become interactive exercises.
const components: Components = {
    h2: ({ children }) => <h2 className="mt-10 mb-3 text-2xl font-bold text-gray-100">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 mb-2 text-xl font-semibold text-gray-100">{children}</h3>,
    p: ({ children }) => <p className="my-4 text-lg leading-relaxed text-gray-300">{children}</p>,
    ul: ({ children }) => <ul className="my-4 list-disc space-y-1 pl-6 text-lg text-gray-300">{children}</ul>,
    ol: ({ children }) => <ol className="my-4 list-decimal space-y-1 pl-6 text-lg text-gray-300">{children}</ol>,
    strong: ({ children }) => <strong className="text-gray-100">{children}</strong>,
    blockquote: ({ children }) => <blockquote className="my-6 border-l-4 border-purple-500 pl-4 text-gray-400">{children}</blockquote>,
    // eslint-disable-next-line @next/next/no-img-element -- content images are small local SVG/PNG
    img: ({ src, alt }) => <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} className="mx-auto my-6 max-w-full" />,
    code: ({ children }) => <code className="rounded bg-gray-800 px-1.5 py-0.5 font-mono text-[0.9em] text-purple-200">{children}</code>,
    pre: ({ node, children }) => {
        const code = node?.children[0];
        if (code?.type === "element") {
            const lang = (code.properties.className as string[] | undefined)?.[0]?.replace(/^language-/, "");
            const text = code.children[0]?.type === "text" ? code.children[0].value : "";
            if (isExerciseFence(lang)) return <ExerciseBlock exercise={parseExercise(lang!, text)} />;
        }
        return <pre className="my-4 overflow-x-auto rounded-lg bg-gray-950 p-4 font-mono text-sm [&_code]:bg-transparent [&_code]:p-0">{children}</pre>;
    },
};

export function SkillMarkdown({ markdown }: { markdown: string }) {
    return (
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} components={components}>
            {markdown}
        </ReactMarkdown>
    );
}
