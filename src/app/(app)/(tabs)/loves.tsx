import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeOut, LinearTransition } from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';

import { Button } from '@/components/button';
import { LoveEditor } from '@/components/onboarding/love-editor';
import { PersonPlan } from '@/components/plan-editor';
import { Screen } from '@/components/screen';
import { ReachOut } from '@/components/reach-out';
import { Segmented } from '@/components/segmented';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Radius } from '@/constants/theme';
import { useNow } from '@/hooks/use-now';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';
import { fmt } from '@/i18n/format';
import { loveCount, loveCountLabel, loveCountReason, type Love } from '@/lib/loves';
import { ageAt, estimate } from '@/lib/model';
import { saveProfile, useProfile, type Profile } from '@/lib/profile';

const GROUPS = ['who', 'what'] as const;

export default function LovesScreen() {
  const profile = useProfile();
  return <Screen>{profile ? <Loves profile={profile} /> : null}</Screen>;
}

function Loves({ profile }: { profile: Profile }) {
  const t = useT();
  const now = useNow(60_000);
  const [group, setGroup] = useState<'who' | 'what'>('who');
  const loves = profile.loves ?? [];
  const setLoves = (next: Love[]) => saveProfile({ ...profile, loves: next });
  const yearsLeft = Math.max(1, estimate(profile, now).med - ageAt(profile.dob, now));

  return (
    <>
      <View style={styles.head}>
        <ThemedText type="eyebrow">{t.loves.eyebrow}</ThemedText>
        <ThemedText type="subtitle">{t.loves.title}</ThemedText>
        <ThemedText type="small">{t.loves.sub}</ThemedText>
      </View>

      {loves.length ? (
        <View style={styles.list}>
          {loves.map((l, i) => (
            <LoveCard
              key={l.id}
              love={l}
              index={i}
              profile={profile}
              now={now}
              yearsLeft={yearsLeft}
              onRemove={() => setLoves(loves.filter((x) => x.id !== l.id))}
              onChange={(next) => setLoves(loves.map((x) => (x.id === next.id ? next : x)))}
            />
          ))}
        </View>
      ) : (
        <ThemedText>{t.loves.empty}</ThemedText>
      )}

      <View style={styles.add}>
        <ThemedText type="heading">{t.loves.addHeading}</ThemedText>
        <Segmented
          options={GROUPS.map((key) => ({ key, label: t.loves.groups[key] }))}
          value={group}
          onChange={setGroup}
          accessibilityLabel={t.loves.addToA11y}
        />
        <LoveEditor key={group} group={group} loves={loves} onChange={setLoves} me={profile} showList={false} />
      </View>
    </>
  );
}

function LoveCard({
  love,
  index,
  profile,
  now,
  yearsLeft,
  onRemove,
  onChange,
}: {
  love: Love;
  index: number;
  profile: Profile;
  now: number;
  yearsLeft: number;
  onRemove: () => void;
  onChange: (next: Love) => void;
}) {
  const theme = useTheme();
  const t = useT();
  const { times, years } = loveCount(love, profile, now);
  const label = loveCountLabel(love, t);
  const reason = loveCountReason(love, t);

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 70).duration(500)}
      exiting={FadeOut.duration(200)}
      layout={LinearTransition}
      style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <View style={styles.top}>
        <View accessible accessibilityLabel={t.loves.cardA11y(fmt(times), label, reason)} style={styles.top}>
          <Ring fraction={Math.min(1, years / yearsLeft)} />
          <View style={styles.text}>
            <ThemedText style={styles.n}>{fmt(times)}</ThemedText>
            <ThemedText>{label}</ThemedText>
            <ThemedText type="small">{reason}</ThemedText>
          </View>
        </View>
        <Button title={t.common.remove} variant="link" accessibilityLabel={t.common.removeA11y(love.name)} onPress={onRemove} />
      </View>
      {love.kind === 'person' ? (
        <>
          <ReachOut love={love} onChange={onChange} />
          <PersonPlan love={love} onChange={onChange} />
        </>
      ) : null}
    </Animated.View>
  );
}

/** How much of your likely remaining life this love spans: an arc from 12 o'clock, clockwise. */
function Ring({ fraction }: { fraction: number }) {
  const theme = useTheme();
  const size = 54;
  const c = size / 2;
  const r = c - 4;
  const f = Math.min(0.9999, Math.max(0.02, fraction));
  const a = -Math.PI / 2 + Math.PI * 2 * f;
  const arc = `M${c},${c - r}A${r},${r} 0 ${f > 0.5 ? 1 : 0},1 ${c + r * Math.cos(a)},${c + r * Math.sin(a)}`;

  return (
    <Svg width={size} height={size}>
      <Circle cx={c} cy={c} r={r} stroke={theme.maybe} strokeWidth={4} fill="none" />
      <Path d={arc} stroke={theme.accent} strokeWidth={4} strokeLinecap="round" fill="none" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  head: {
    gap: 8,
  },
  list: {
    gap: 12,
  },
  card: {
    gap: 12,
    borderWidth: 1,
    borderRadius: Radius.card,
    padding: 16,
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  text: {
    flex: 1,
    gap: 2,
  },
  n: {
    fontFamily: Fonts.monoMedium,
    fontSize: 30,
    lineHeight: 36,
    fontVariant: ['tabular-nums'],
  },
  add: {
    gap: 12,
    paddingTop: 8,
  },
});
