import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import AppTabs from '@/components/app-tabs';
import { OpeningSequence } from '@/components/opening-sequence';
import { useReminderSync } from '@/hooks/use-reminders';
import { introSeen, markIntroSeen } from '@/lib/intro';
import { useReminderTap } from '@/lib/notifications';
import { useProfile } from '@/lib/profile';

export default function TabLayout() {
  const profile = useProfile();
  const [showIntro, setShowIntro] = useState(() => !introSeen());

  // Once per launch: coming back to the tabs later doesn't replay it.
  useEffect(() => {
    markIntroSeen();
  }, []);

  useReminderSync(profile);
  // A tapped reminder goes straight to that person, Call and Message ready; no opening sequence first.
  useReminderTap((id) => {
    setShowIntro(false);
    router.push({ pathname: '/person/[id]', params: { id } });
  });

  return (
    <View style={{ flex: 1 }}>
      <AppTabs />
      {showIntro && profile ? <OpeningSequence profile={profile} onClose={() => setShowIntro(false)} /> : null}
    </View>
  );
}
