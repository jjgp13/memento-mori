import { Placeholder } from '@/components/placeholder';
import { Screen } from '@/components/screen';

export default function TodayScreen() {
  return (
    <Screen>
      <Placeholder
        eyebrow="Today"
        title="Quote, question, review"
        body="Port from the prototype: the daily Stoic quote and question, and the evening-review journal (entries encrypted before they reach Supabase)."
      />
    </Screen>
  );
}
