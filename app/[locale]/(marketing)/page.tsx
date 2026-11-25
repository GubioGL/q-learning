import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locales";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const { home: t } = getDict(locale);
  return (
    <div className="flex flex-1 flex-col px-4">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center mb-4 text-purple-700">
          <span className="block">{t.welcome}</span>
          <span className="block">{t.path}</span>
        </h1>
        <p className="mb-4 text-center text-lg text-gray-700">{t.intro}</p>
        <Image src="/caticonpng.png" alt="" width={250} height={250} className="mb-4" priority />
        <Button asChild variant="buttonRox" size="lg"><Link href={`/${locale}/cursos`}>{t.start}</Link></Button>
      </div>

      <p className="my-6 mx-auto text-base text-center text-gray-600 max-w-xl">{t.quote}</p>
    </div>
  );
}
