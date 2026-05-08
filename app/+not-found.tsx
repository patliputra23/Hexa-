import { Link } from "expo-router";
import { EmptyState, PrimaryButton, Screen } from "@/ui/components";

export default function NotFoundScreen() {
  return (
    <Screen>
      <EmptyState title="This room is dark" body="The Lumen screen you opened does not exist." />
      <Link href="/(tabs)" asChild>
        <PrimaryButton>Return home</PrimaryButton>
      </Link>
    </Screen>
  );
}
