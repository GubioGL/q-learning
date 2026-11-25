import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

type Props = {
    subtitle: string;
    sectionLabel: string;
    backHref: string;
};

export default function CourseHeader({ subtitle, sectionLabel, backHref }: Props) {
    return (
        <div className="sticky top-0 z-10 bg-transparent pb-3 mb-5">
            <div className="bg-[#7c3aed] rounded-xl shadow-md px-4 py-3 flex flex-col gap-2">
                <div className="flex items-center">
                    <Link href={backHref} className="flex items-center gap-2 hover:underline">
                        <Button variant="ghost" size="sm" className="p-0">
                            <ArrowLeftIcon className="w-5 h-5 stroke-2 text-white" />
                        </Button>
                        <span className="text-white font-medium">{sectionLabel}</span>
                    </Link>
                </div>
                <div>
                    <h1 className="text-white text-xl font-bold">{subtitle}</h1>
                </div>
            </div>
        </div>
    );
} 