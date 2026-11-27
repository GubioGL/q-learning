import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Nunito } from 'next/font/google';
import { getDict } from '@/lib/i18n';
import { LocaleProvider } from '@/lib/i18n/context';
import { HTML_LANG, LOCALES, isLocale, type Locale } from '@/lib/i18n/locales';
import '../globals.css';

// Configuração da fonte
const nunito = Nunito({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

type LocaleParams = { params: Promise<{ locale: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

// Runs before paint: saved choice, else the system preference.
const THEME_SCRIPT = `try{var t=localStorage.getItem("ql_theme")}catch(e){}document.documentElement.dataset.theme=t==="light"||t==="dark"?t:matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"`;

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return { title: 'Quantum Learning', description: isLocale(locale) ? getDict(locale).description : undefined };
}

export default async function RootLayout({ children, params }: LocaleParams & { children: React.ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={HTML_LANG[locale as Locale]} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} /></head>
      <body className={`${nunito.className} antialiased`}>
        <LocaleProvider value={locale}>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[1001] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-purple-800">
            {getDict(locale).skipToContent}
          </a>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
