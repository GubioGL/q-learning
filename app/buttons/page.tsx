import { Button } from "@/components/ui/button";


const ButtonsPage = () => {
    return (
        <div className="fonte-cursiva p-4 space-y-4 flex flex-col max-w-[200px]">
            <Button>  Default  </Button>
            <Button variant="ghost">Ghost </Button>
            <Button variant="buttonBlu">Primary</Button>
            <Button variant="buttonBluO">Primary outline</Button>
            <Button variant="buttonGre">Secondary </Button>
            <Button variant="buttonGreO">Secondary outline</Button>
            <Button variant="danger">Danger </Button>
            <Button variant="dangerOutline">Danger outline</Button>
            <Button variant="premium">Premium </Button>
            <Button variant="buttonRox">Rox </Button>
            <Button variant="buttonRoxO">Rox outline</Button>
            <Button variant="buttonOran">Orange </Button>
            <Button variant="buttonOranO">Orange outline</Button>
            <Button variant="sidebar">Sidebar </Button>
            <Button variant="sidebarO">Sidebar outline</Button>

        </div>
    );
};

export default ButtonsPage;