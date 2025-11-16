import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="p-8">
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-4">Welcome to Dashboard</h2>
        <p className="text-muted-foreground mb-4">
          Navigate to the Data section to view and interact with your data.
        </p>
      </Card>
    </div>
  );
}
