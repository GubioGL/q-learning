import { getDailyGoal } from "@/db/progress";
import GoalsForm from "./goals-form";

export default async function MetasPage() {
    return <GoalsForm dailyGoal={await getDailyGoal()} />;
}
