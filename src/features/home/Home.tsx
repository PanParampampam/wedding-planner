import PageHeader from "../../shared/ui/PageHeader";
import { useRequiredAuthProvider } from "../authProvider/hooks/useAuthProvider";
import WeddingCountdown from "./components/WeddingCountdown";

export default function Home() {
  const { user } = useRequiredAuthProvider();

  return (
    <main>
      <PageHeader
        title="Welcome to your Wedding Planner"
        description="Keep your guest list, budget, and wedding details organized in one place."
      />
      <WeddingCountdown weddingDate={user.weddingDate} userName={user.name} />
    </main>
  );
}
