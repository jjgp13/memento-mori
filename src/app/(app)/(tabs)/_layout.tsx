import { useEffect, useState } from 'react';
import { View } from 'react-native';

import AppTabs from '@/components/app-tabs';
import { OpeningSequence } from '@/components/opening-sequence';
import { introSeen, markIntroSeen } from '@/lib/intro';
import { useProfile } from '@/lib/profile';

export default function TabLayout() {
  const profile = useProfile();
  const [showIntro, setShowIntro] = useState(() => !introSeen());

  // Once per launch: coming back to the tabs later doesn't replay it.
  useEffect(() => {
    markIntroSeen();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AppTabs />
      {showIntro && profile ? <OpeningSequence profile={profile} onClose={() => setShowIntro(false)} /> : null}
    </View>
  );
}
