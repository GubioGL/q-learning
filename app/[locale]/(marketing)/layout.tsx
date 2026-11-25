import { Header } from "./header";
import { Footer } from "./footer";

interface MarketingLayoutProps {
    children: React.ReactNode;
}

/**
 * Layout da área de marketing, com header, main e footer.
 */
const MarketingLayout = ({ children }: MarketingLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main id="main" className="flex-1 flex flex-col items-center justify-center ">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default MarketingLayout;
