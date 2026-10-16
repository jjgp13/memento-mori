import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Disclaimer, ScreenLink } from '@/components/disclaimer';
import { DocNote, DocScreen, DocSection } from '@/components/doc-screen';
import { SourceLink } from '@/components/source-link';
import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { COUNTRY_TABLES } from '@/lib/country-tables';
import { GAIN_CAP, LIFE_TABLES, MODEL_SHAPE, PET_LIFESPANS, PHONE_TIME, WHAT_MATTERS } from '@/lib/evidence';
import { MAX_TOTAL_GAIN } from '@/lib/habit-impact';
import { PET_LIFESPAN } from '@/lib/loves';
import { CHILD_END, GOMPERTZ_B, HABITS, HABIT_KEYS, MODEL_VERSION, US_APPROX, YOUTH_END, stepsHR } from '@/lib/model';
import { SWAP_HOURS, WAKING_HOURS, sleepHours } from '@/lib/time-use';

/** ×1.29, ×0.85, ×2.2, ×1 */
const times = (hr: number) => `×${Number(hr.toFixed(2))}`;

/**
 * How the numbers are made, in plain words: the curve, the life tables, each habit's multiplier and its
 * source, how "what if" gains combine, the phone and sleep math, the loves counts, and the limits.
 * Numbers come from the model code itself, so this page changes when the model does. Condensed from
 * docs/science.md and docs/nudges.md; keep them in step.
 */
export default function HowItWorksScreen() {
  const theme = useTheme();
  const doubling = Math.LN2 / GOMPERTZ_B;
  const notInEstimate = WHAT_MATTERS.filter((e) => !e.inEstimate);

  return (
    <DocScreen
      eyebrow="How this works"
      title="Where your numbers come from"
      lede="Everything the app shows is worked out on your device from your answers and published research. Here is each step, and the study behind it.">
      <DocNote>
        <Disclaimer full links={false} />
      </DocNote>

      <DocSection title="1 · The curve everyone starts from">
        <Body>
          For adults, the yearly risk of dying rises steadily with age, roughly doubling every 7 to 8 years. Actuaries
          have described this for two centuries as a Gompertz–Makeham curve:
        </Body>
        <Formula>h(x) = A + B · e^(b·x)</Formula>
        <Body>
          B · e^(b·x) is the part that grows with age x (Gompertz); A is a small risk that doesn’t depend on age, like
          accidents (Makeham). Childhood and youth deaths don’t follow that shape, so two constant terms are added: one
          before age {CHILD_END} and one from {CHILD_END} to {YOUTH_END}.
        </Body>
        {MODEL_SHAPE.map((s) => (
          <SourceLink key={s.url} source={s} />
        ))}
      </DocSection>

      <DocSection title="2 · Where you live">
        <Body>
          Where you live matters more than any habit: in 2023 the median age at death ran from about 59 to over 90
          across countries. So the curve is fitted separately for each sex in each of {COUNTRY_TABLES.length} countries
          and areas, to the United Nations’ life tables for 2023 (World Population Prospects 2024). A, B and b come from
          death rates at ages 30 to 100; the early-life terms make survival to 15 and to 30 match the table exactly.
          Across every country and sex, the model’s median age at death from birth lands within a year of the UN
          table’s.
        </Body>
        <Body>
          Without a country, the app uses an older approximation of US tables: A = {US_APPROX.m.A}, B ={' '}
          {US_APPROX.m.B.toExponential(1)} for men; A = {US_APPROX.f.A}, B = {US_APPROX.f.B.toExponential(1)} for women; b
          = {GOMPERTZ_B} (about 75 and 81 years at birth).
        </Body>
        <Body>
          Income and education also predict lifespan within a country. They are left out on purpose: they aren’t
          something you can act on here, and they read like a verdict.
        </Body>
        <SourceLink source={LIFE_TABLES.source} prefix="Life tables" />
      </DocSection>

      <DocSection title="3 · Your habits">
        <Body>
          Each answer multiplies the yearly risk at every age. ×1 means no change; ×2 means twice the risk. The
          multipliers are rounded from large studies and reviews: they are approximations, and they come from
          associations, not experiments.
        </Body>
        <View style={[styles.table, { borderColor: theme.line }]}>
          {HABIT_KEYS.map((k) => (
            <View key={k} style={[styles.row, { borderBottomColor: theme.line }]}>
              <ThemedText type="small" themeColor="fg" style={styles.bold}>
                {HABITS[k].short}
              </ThemedText>
              <View style={styles.options}>
                {HABITS[k].options.map((o) => (
                  <View key={o.value} style={styles.option}>
                    <ThemedText type="small" style={styles.flex}>
                      {o.label}
                    </ThemedText>
                    <ThemedText type="mono" themeColor={o.hr === 1 ? 'muted' : 'accent'}>
                      {times(o.hr)}
                    </ThemedText>
                  </View>
                ))}
              </View>
              <SourceLink of={k} />
            </View>
          ))}
        </View>
        <Body>
          “A few times a month” (×1.1) for connection sits between the measured levels; it isn’t measured itself. The
          study reports odds, used here as risk multipliers, which is a close approximation.
        </Body>
        <Body>
          Daily steps, when you enter them, replace the exercise answer, so movement is never counted twice. Risk falls
          about 7% for every extra 1,000 steps, measured from 6,000 a day and leveling off at 10,000: multiplier = e^(−0.072
          × (steps − 6,000) ÷ 1,000). So 4,000 steps is {times(stepsHR(4000))} and 10,000 is {times(stepsHR(10000))}.
        </Body>
        <SourceLink of="steps" />
      </DocSection>

      <DocSection title="4 · From risk to a range">
        <Body>
          Starting from your age today, the app follows the risk month by month to age 121, multiplied by your habits.
          The age by which half of people like you have died is your median. The ages by which a quarter and three
          quarters have died give the likely range. It also shows the chance of reaching 80.
        </Body>
        <Body>
          A rule of thumb behind the habit numbers: years gained ≈ ln(1 ÷ multiplier) ÷ {GOMPERTZ_B}. Halving your risk
          adds about {Math.round(Math.LN2 / GOMPERTZ_B)} years, because at b = {GOMPERTZ_B} risk doubles about every{' '}
          {doubling.toFixed(0)} years of age (the fitted country curves are a little steeper). The screens compute the real difference rather than using the shortcut.
        </Body>
      </DocSection>

      <DocSection title="5 · What if: combining changes">
        <Body>
          Each “what if” is the difference between your median now and your median with that habit changed. Several
          changes together multiply, so they add less than the sum of each alone, since habit effects overlap. The
          total is also capped at {MAX_TOTAL_GAIN} years.
        </Body>
        <Body>{GAIN_CAP.claim}</Body>
        <SourceLink source={GAIN_CAP.source} />
        <Body>
          On the calendar, the combined gain is split between the changes you try in proportion to what each would add
          alone, so each gets its own color.
        </Body>
        {notInEstimate.length ? (
          <Body>
            Some things on the Habits screen are shown for direction only and aren’t in your numbers yet:{' '}
            {notInEstimate.map((e) => e.title.toLowerCase()).join(', ')}.
          </Body>
        ) : null}
      </DocSection>

      <DocSection title="6 · Phone and sleep time">
        <Body>
          Phone time is your own estimate, in hours a day (it starts at 4, near common estimates for US adults). Over
          the years you likely have left, it adds up to hours × years ÷ 24. As a share of your waking day, it is hours
          ÷ {WAKING_HOURS}.
        </Body>
        <SourceLink source={PHONE_TIME.source} />
        <Body>
          The “Awake” and “Off phone” views take sleep out of the calendar: about {sleepHours({ sleep: 'ok' })} hours a
          night, or {sleepHours({ sleep: 'short' })} if you said under 6. Sleep is time well spent, not lost.
        </Body>
        <Body>
          The swap suggests taking {SWAP_HOURS * 60} minutes a day back from the phone and shows what it could become,
          for example daily walks with your dog over the years you both likely have.
        </Body>
        <SourceLink of="phone" />
      </DocSection>

      <DocSection title="7 · Loves: “N more times”">
        <Body>
          For each person, pet or activity, the app counts the years you likely share, then multiplies by how often
          you see them or do it. The years shared end at the earliest of: your median age; the age you said you’d stop
          an activity; a person’s own median age (from their age, averaged over both sexes, since the app doesn’t ask,
          and assumed to live in your country); or a pet’s typical lifespan.
        </Body>
        <Body>
          Typical lifespans: dogs about {PET_LIFESPAN.dog} years, cats about {PET_LIFESPAN.cat}, from UK veterinary
          records. Breed and size matter a lot. An older pet is always counted as having at least half a year.
        </Body>
        {[...PET_LIFESPANS.dog.sources, ...PET_LIFESPANS.cat.sources].map((s) => (
          <SourceLink key={s.url} source={s} />
        ))}
      </DocSection>

      <DocSection title="8 · What it can’t tell you">
        <Body>
          These are population averages. They describe how long groups of people with answers like yours tended to
          live, not what will happen to you. They know nothing of your health history, your genes or your medical
          care.
        </Body>
        <Body>
          The links between habits and lifespan come from observational studies: people who do X tend to live longer,
          partly because of X and partly because of everything that travels with it. Changing a habit may not change
          your lifespan by the amount shown.
        </Body>
        <Body>
          That’s why the app shows a range, never a date. Half of people like you live past the median; many live far
          longer.
        </Body>
      </DocSection>

      <DocSection title="Model version">
        <ThemedText type="mono" themeColor="fg" selectable>
          {MODEL_VERSION}
        </ThemedText>
        <Body>
          The model changes only on strong evidence, such as meta-analyses, and each change gets a new version.
        </Body>
        <View style={styles.links}>
          <ScreenLink href="/sources" title="Every source, in full" />
          <ScreenLink href="/legal/terms" title="Terms of Use" />
          <ScreenLink href="/legal/privacy" title="Privacy Policy" />
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
