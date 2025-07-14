import { Button } from "@/components/ui/button";
import { Header } from "@/app/(marketing)/header";
import { Footer } from "@/app/(marketing)/footer";

const ButtonsPage = () => {
    return (
        <>
            <Header />
            <div className="fonte-cursiva p-4 space-y-4 flex flex-col max-w-[200px]">
                <Button>  Default  </Button>
                <Button variant="ghost">Ghost </Button>
                <Button variant="buttonBlu">Primary</Button>
            </div>
            <Footer />
        </>
    );
};

export default ButtonsPage;