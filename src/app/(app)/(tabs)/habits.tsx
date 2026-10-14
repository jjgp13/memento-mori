import { Placeholder } from '@/components/placeholder';
import { Screen } from '@/components/screen';

export default function HabitsScreen() {
  return (
    <Screen>
      <Placeholder
        eyebrow="What is in your control"
        title="Change a habit, change the count"
        body="Port from the prototype: median-age estimate, daily-steps slider with step-by-step math, habit options with years gained or lost, and the ranked What matters most list."
      />
    </Screen>
  );
}
