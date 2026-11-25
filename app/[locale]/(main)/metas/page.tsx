import { Backup } from "./backup";
import GoalsForm from "./goals-form";

export default function MetasPage() {
    return (
        <div className="space-y-8">
            <GoalsForm />
            <Backup />
        </div>
    );
}
