import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Disclaimer, ScreenLink } from '@/components/disclaimer';
import { DocNote, DocScreen, DocSection } from '@/components/doc-screen';
import { SourceLink } from '@/components/source-link';
import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';
import { dec1, fmt, num } from '@/i18n/format';
import { habitAnswer, habitOptions } from '@/i18n/labels';
import { currentLocale } from '@/i18n/locale';
import { COUNTRY_TABLES } from '@/lib/country-tables';
import { GAIN_CAP, LIFE_TABLES, MODEL_SHAPE, PET_LIFESPANS, PHONE_TIME, WHAT_MATTERS } from '@/lib/evidence';
import { MAX_TOTAL_GAIN } from '@/lib/habit-impact';
import { PET_LIFESPAN } from '@/lib/loves';
import { CHILD_END, GOMPERTZ_B, HABITS, HABIT_KEYS, MODEL_VERSION, US_APPROX, YOUTH_END, stepsHR } from '@/lib/model';
import { SWAP_HOURS, WAKING_HOURS, sleepHours } from '@/lib/time-use';

/** ×1.29, ×0.85, ×2.2, ×1 in the reader's number style. */
const times = (hr: number) => `×${num(hr)}`;
const sci = (x: number) => x.toExponential(1);
/** Model parameters keep their significant digits: 0.0012, 0.085. */
const param = (x: number) => x.toLocaleString(currentLocale(), { maximumSignificantDigits: 3 });

/**
 * How the numbers are made, in plain words: the curve, the life tables, each habit's multiplier and its
 * source, how "what if" gains combine, the phone and sleep math, the loves counts, and the limits.
 * Numbers come from the model code itself, so this page changes when the model does. Condensed from
 * docs/science.md and docs/nudges.md; keep them in step. Text is in the catalogs under `methods`.
 */
export default function HowItWorksScreen() {
  const theme = useTheme();
  const t = useT();
  const m = t.methods;
  const notInEstimate = WHAT_MATTERS.filter((e) => !e.inEstimate).map((e) => t.evidence[e.key].title);

  return (
    <DocScreen eyebrow={m.eyebrow} title={m.title} lede={m.lede}>
      <DocNote>
        <Disclaimer full links={false} />
      </DocNote>

      <DocSection title={m.curveTitle}>
        <Body>{m.curveIntro}</Body>
        <Formula>h(x) = A + B · e^(b·x)</Formula>
        <Body>{m.curveParts(String(CHILD_END), String(YOUTH_END))}</Body>
        {MODEL_SHAPE.map((s) => (
          <SourceLink key={s.url} source={s} />
        ))}
      </DocSection>

      <DocSection title={m.placeTitle}>
        <Body>{m.placeBody(fmt(COUNTRY_TABLES.length))}</Body>
        <Body>{m.placeUs(param(US_APPROX.m.A), sci(US_APPROX.m.B), param(US_APPROX.f.A), sci(US_APPROX.f.B), param(GOMPERTZ_B))}</Body>
        <Body>{m.placeLeftOut}</Body>
        <SourceLink source={LIFE_TABLES.source} prefix={t.common.lifeTables} />
      </DocSection>

      <DocSection title={m.habitsTitle}>
        <Body>{m.habitsIntro}</Body>
        <View style={[styles.table, { borderColor: theme.line }]}>
          {HABIT_KEYS.map((k) => {
            const hr: Record<string, number> = Object.fromEntries(HABITS[k].options.map((o) => [o.value, o.hr]));
            return (
              <View key={k} style={[styles.row, { borderBottomColor: theme.line }]}>
                <ThemedText type="small" themeColor="fg" style={styles.bold}>
                  {t.habits[k].short}
                </ThemedText>
                <View style={styles.options}>
                  {habitOptions(t, k).map((o) => (
                    <View key={o.value} style={styles.option}>
                      <ThemedText type="small" style={styles.flex}>
                        {o.label}
                      </ThemedText>
                      <ThemedText type="mono" themeColor={hr[o.value] === 1 ? 'muted' : 'accent'}>
                        {times(hr[o.value])}
                      </ThemedText>
                    </View>
                  ))}
                </View>
                <SourceLink of={k} />
              </View>
            );
          })}
        </View>
        <Body>{m.habitsConnection(habitAnswer(t, 'connection', 'sometimes'))}</Body>
        <Body>{m.habitsSteps(times(stepsHR(4000)), times(stepsHR(10000)))}</Body>
        <SourceLink of="steps" />
      </DocSection>

      <DocSection title={m.rangeTitle}>
        <Body>{m.rangeBody}</Body>
        <Body>{m.rangeRule(param(GOMPERTZ_B), fmt(Math.LN2 / GOMPERTZ_B), fmt(Math.LN2 / GOMPERTZ_B))}</Body>
      </DocSection>

      <DocSection title={m.combineTitle}>
        <Body>{m.combineBody(fmt(MAX_TOTAL_GAIN))}</Body>
        <Body>{m.capClaim(fmt(MAX_TOTAL_GAIN))}</Body>
        <SourceLink source={GAIN_CAP.source} />
        <Body>{m.combineCalendar}</Body>
        {notInEstimate.length ? <Body>{m.notInEstimate(t.common.list(notInEstimate))}</Body> : null}
      </DocSection>

      <DocSection title={m.timeTitle}>
        <Body>{m.timePhone(fmt(WAKING_HOURS))}</Body>
        <SourceLink source={PHONE_TIME.source} />
        <Body>{m.timeSleep(num(sleepHours({ sleep: 'ok' })), num(sleepHours({ sleep: 'short' })))}</Body>
        <Body>{m.timeSwap(fmt(SWAP_HOURS * 60))}</Body>
        <SourceLink of="phone" />
      </DocSection>

      <DocSection title={m.lovesTitle}>
        <Body>{m.lovesBody}</Body>
        <Body>{m.lovesPets(dec1(PET_LIFESPAN.dog), fmt(PET_LIFESPAN.cat))}</Body>
        {PET_LIFESPANS.map((s) => (
          <SourceLink key={s.url} source={s} />
        ))}
      </DocSection>

      <DocSection title={m.limitsTitle}>
        {m.limits.map((p, i) => (
          <Body key={i}>{p}</Body>
        ))}
      </DocSection>

      <DocSection title={m.versionTitle}>
        <ThemedText type="mono" themeColor="fg" selectable>
          {MODEL_VERSION}
        </ThemedText>
        <Body>{m.versionBody}</Body>
        <View style={styles.links}>
          <ScreenLink href="/sources" title={m.allSources} />
          <ScreenLink href="/legal/terms" title={t.legal.terms} />
          <ScreenLink href="/legal/privacy" title={t.legal.privacy} />
        </View>
      </DocSection>
    </DocScreen>
  );
}

function Body({ children }: { children: ReactNode }) {
  return (
    <ThemedText type="small" themeColor="fg">
      {children}
    </ThemedText>
  );
}

function Formula({ children }: { children: string }) {
  const theme = useTheme();
  return (
    <ThemedText type="mono" themeColor="fg" style={[styles.formula, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      {children}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  formula: {
    fontFamily: Fonts.monoMedium,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  table: {
    borderTopWidth: 1,
  },
  row: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    gap: 4,
  },
  bold: {
    fontFamily: Fonts.bodyBold,
  },
  options: {
    gap: 2,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  flex: {
    flex: 1,
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 16,
    rowGap: 4,
  },
});
