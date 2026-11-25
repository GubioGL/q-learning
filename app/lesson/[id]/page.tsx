import { notFound } from "next/navigation";
import { lessons } from "@/content/lessons";
import LessonClient from "./lesson-client";

export const generateStaticParams = () => Object.keys(lessons).map((id) => ({ id }));

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const lesson = lessons[id];
    if (!lesson) notFound();
    return <LessonClient lesson={lesson} />;
}
