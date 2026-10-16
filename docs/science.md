# The science behind Memento Mori

What most affects how long people live (lifespan), how long they stay healthy (healthspan), and whether
the time feels meaningful — and what that means for the app. Researched October 2026.

> **Read every number here as an association, not a promise.** Almost all of it comes from observational
> studies: people who do X tend to live longer, partly because of X and partly because of everything that
> travels with X. Effects also overlap, so they can't simply be added up. The app should keep showing
> ranges and say "could add about", never "will add".

---

## 1. Lifespan is not the whole story

- **The healthspan gap.** Across 183 countries, people now live on average **9.6 years** at the end of
  life with disease or disability. The US gap is the largest in the world, **12.4 years**, up from 10.9 in
  2000. Women's gap is about 2.4 years wider than men's. (Garmany et al., *JAMA Network Open* 2024)
- **Habits move healthy years even more than total years.** In two large Harvard cohorts, people at 50
  with 4–5 healthy habits lived about **10.7 (women) and 7.6 (men) more years free of cancer, heart
  disease and diabetes** than people with none. (Li et al., *BMJ* 2020)

**For the app:** the count of years left should be paired with an estimate of *healthy* years left.
That's the more honest and more motivating number.

- **Where you live.** In 2023 the median age at death, from birth, ran from about **59** to over **90**
  across 237 countries and areas: a gap larger than any habit. Men in Russia reach a median of about 70,
  women in Japan about 90. (UN World Population Prospects 2024)

**In the app:** the baseline is the person's own country, by sex, from the UN WPP 2024 single-age life
tables (2023 estimates, CC BY 3.0 IGO). `scripts/fit-country-tables.mts` fits the same curve the model
uses, a Gompertz–Makeham hazard A + B·e^(b·x), to each table's death rates at ages 30–100 (weighted by
deaths), plus two constant early-life terms (before 15, and 15–29) so survival to those ages matches the
table exactly. Across all 474 country–sex tables, the model's median and quartile ages at death land a
median of 0.1–0.3 years from the table's (from birth, 20, 40 or 70), and never more than 1.4 years; the
median from birth is always within 0.8 years. Habit hazard ratios multiply on top, unchanged. Profiles
without a country keep the original approximation of US tables. Income and education also predict
lifespan within countries, but they are left out on purpose: they aren't something a person can act on
here, and they read like a verdict.

---

## 2. What matters most for a long, healthy life

Ranked roughly by size and strength of evidence.

| # | Factor | What the evidence says | Strength | In the model today |
|---|---|---|---|---|
| 1 | **Not smoking** | The largest single lever. Quitting at any age helps. | Strong | Yes: current ×2.2, former ×1.3 |
| 2 | **Moving & fitness** | Steps: risk keeps falling up to **8–10k/day under 60**, **6–8k/day over 60** (meta-analysis of 15 cohorts, 47,471 adults). Cardio fitness: the fittest people were ~80% less likely to die than the least fit over ~8 years, with no upper limit of benefit seen (122,000 treadmill tests). Strength: 30–60 min/week of muscle-strengthening linked to **10–17% lower** mortality, on top of aerobic exercise. | Strong | Yes: exercise answer or steps; strength not yet |
| 3 | **Close relationships** | Stronger social ties: **~1.5× the odds of survival** across 148 studies (308,849 people) — comparable to smoking. Isolation, loneliness, living alone: **+29%, +26%, +32%** odds of early death across 70 studies (3.4 M people, Holt-Lunstad 2015). Relationship satisfaction at 50 predicted health at 80 better than cholesterol (Harvard Study of Adult Development, 85+ years). | Strong | **Yes, since Oct 14** (rarely ×1.29) |
| 4 | **What you eat** | Switching from a typical Western diet to an optimal one at 20: **+10.7 years (women), +13.0 (men)**; at 60 still **+8**; at 80 **+3.4**. Biggest wins: more legumes, whole grains, nuts; less red and processed meat. (Modeling study; population-level, not individual.) | Strong–moderate | **No** |
| 5 | **Healthy weight & blood pressure** | Part of every "healthy lifestyle" score; obesity and high blood pressure drive heart disease, the top cause of death. | Strong | Weight yes; BP no |
| 6 | **Sleep** | Under ~6 h: **12% higher** mortality. Over ~9 h: 30% higher, but that is mostly a *sign* of illness, not a cause (16 studies, 1.38 M people). | Moderate | Yes: <6 h ×1.15 |
| 7 | **Alcohol** | Newest large meta-analysis (107 cohorts, 4.8 M people): **no protective effect** of light drinking vs never drinking; risk rises from ~25 g/day (≈2 drinks) for women and ~45 g/day for men. | Moderate | Yes: heavy ×1.4; light = neutral (correct) |
| 8 | **Purpose & outlook** | Strong sense of purpose: **17% lower** mortality and cardiovascular events (10 studies, 136,265 people). Most optimistic quarter: **11–15% longer lifespan**, 50–70% higher odds of reaching 85. | Moderate | **No** |
| 9 | **Helping others** | Volunteering in later life: **24% lower** mortality after adjusting for health (14 studies). | Moderate | **No** |

**Put together.** In US cohorts, people at 50 with all five classic habits (never smoking, healthy weight,
30+ min/day of activity, moderate-or-less drinking, good diet) were projected to live **14.0 (women) and
12.2 (men) years longer** than people with none (Li et al., *Circulation* 2018). A larger VA study adding
stress management, sleep, no opioid misuse and **positive social relationships** reported up to **24 (men)
and 21 (women) more years** from age 40 — but that was a conference presentation, not yet peer-reviewed.

**What stands out for Memento Mori:** the two factors the app is *about* — relationships and purpose — are
also among the strongest predictors of a long, healthy life. The loves and values people enter aren't
decoration; they're health factors.

---

## 3. Meaning and direction

- **Purpose predicts health**, independent of other factors (see #8 above).
- **People regret what they didn't do.** In the short term people regret actions; over the long run they
  regret *inactions* — not spending time with friends and family, chances not taken. (Gilovich & Medvec,
  *Psychological Review* 1995.) That is exactly what a "N more visits with Mom" counter speaks to.
- **Time feels like wealth.** Spending money to free up time (e.g. paying for a chore) raised well-being
  more than spending it on things, in a small randomized experiment (Whillans et al., *PNAS* 2017).

**For the app:** the values someone picks should shape what they see — the daily question, the
weekly reminder, which loves get highlighted — and the app should nudge toward *action* ("call her this
week"), because inaction is what people end up regretting.

---

## 4. Where the hours go

- **Phones.** US adults spend roughly **4–5 hours a day** on their smartphones (estimates vary widely by
  source and method; no single authoritative figure).
- **Friends.** Time Americans spend with friends has fallen sharply: from about 47 minutes a day in the
  early 2000s to about 34 in 2023 by one ATUS-based estimate, with the steepest drop after 2014.
- **Cutting social media helps, in experiments, not just surveys.**
  - Deactivating Facebook for 4 weeks (randomized, 2,743 users) → **more time with friends and family
    offline, higher well-being**, and people kept using it less afterwards (Allcott et al., *AER* 2020).
  - Limiting social media to ~30 minutes a day for 3 weeks (randomized, 143 students) → **less
    loneliness and depression** (Hunt et al., *J. Soc. Clin. Psychol.* 2018).

**What that looks like in the app's terms** (for someone with ~44 years left):

| Daily habit | Over the time likely left |
|---|---|
| 4.5 h a day on the phone | about **8 years**, roughly a quarter of waking hours |
| 30 min a day of scrolling | about **11 months** |
| Swap that 30 min for a daily walk with Max (a 4-year-old dog) | about **3,100 more walks** over the ~8.5 years he likely has |

---

## 5. What we could build from this

Proposals, roughly in order of value for effort.

1. **"Where your hours go."** Ask how much time goes to things they'd rather spend less on (phone,
   social media, TV, commute, …) and turn it into time-left terms: "4 h a day on your phone is about 7
   years of what's left." Then offer a swap with something they love: "30 minutes less scrolling a day = about
   3,100 more walks with Max." Start with self-report (works on web, no permissions). Later, on the native app:
   - **Android:** read app usage with the user's "Usage access" permission.
   - **iOS:** Apple's Screen Time API needs a special entitlement Apple must approve, only one app can
     hold the data at a time, and usage reports run in a sandbox that can't export data. Feasible but slow.
2. **Healthy years, not just years.** Show "about N years in good health" next to the lifespan
   estimate, and show that habits move healthy years more than total years (Li 2020).
3. **Add the missing factors to the model**, each versioned, with evidence badges, gains still capped:
   - **Social connection** (biggest gap, strongest evidence). A careful hazard ratio for isolation/loneliness
     of about 1.25–1.3 would be defensible.
   - **Diet quality** (a 2–3 question screener: legumes/whole grains/nuts, processed meat, sugary drinks).
   - **Strength training** (yes/no, 30–60 min a week).
   - **Purpose** (one Ryff-style question), shown as "linked to", with a moderate-evidence badge.
4. **Health data on device** (native app): steps, sleep and resting heart rate from Apple Health / Health
   Connect replace self-reported answers. No sign-in needed — it never leaves the phone.
5. **Values-driven reminders**: the 1–2 weekly reminders draw on their values and loves and suggest one
   concrete action.

---

## Sources

Lifespan, healthspan and habits
- United Nations, Department of Economic and Social Affairs, Population Division. *World Population Prospects 2024*, single-age life tables by sex, estimates 1950–2023. CC BY 3.0 IGO. — [population.un.org/wpp](https://population.un.org/wpp/)
- Li Y. et al. Impact of healthy lifestyle factors on life expectancies in the US population. *Circulation* 2018. — [AHA summary](https://www.heart.org/en/news/2018/05/03/americans-could-live-up-to-14-years-longer-by-doing-five-things), [Harvard release](https://www.hsph.harvard.edu/news/press-releases/five-healthy-lifestyle-habits/)
- Li Y. et al. Healthy lifestyle and life expectancy free of cancer, cardiovascular disease, and type 2 diabetes. *BMJ* 2020;368:l6669. — [BMJ](https://www.bmj.com/content/368/bmj.l6669), [Harvard release](https://www.hsph.harvard.edu/news/press-releases/healthy-lifestyle-in-middle-age-increases-years-free-of-chronic-diseases/)
- Garmany A. et al. Global healthspan-lifespan gaps among 183 WHO member states. *JAMA Netw Open* 2024. — [PubMed](https://pubmed.ncbi.nlm.nih.gov/39661386/), [Mayo Clinic](https://newsnetwork.mayoclinic.org/discussion/the-global-divide-between-longer-life-and-good-health/)
- Nguyen X-M.T. et al. Eight habits and life expectancy, Million Veteran Program. NUTRITION 2023 (conference). — [ASN release](https://nutrition.org/these-eight-habits-could-lengthen-your-life-by-decades/)

Activity and fitness
- Paluch A.E. et al. Daily steps and all-cause mortality: a meta-analysis of 15 international cohorts. *Lancet Public Health* 2022. — [DOAJ](https://doaj.org/article/c3639c468b4348958202e52793ab979d)
- Mandsager K. et al. Cardiorespiratory fitness and long-term mortality. *JAMA Netw Open* 2018. — [Cleveland Clinic](https://newsroom.clevelandclinic.org/2018/10/19/cleveland-clinic-research-shows-better-cardiorespiratory-fitness-correlates-to-a-longer-life/), [ACC summary](https://acc.org/latest-in-cardiology/articles/2019/02/20/08/11/cardiorespiratory-fitness-and-long-term-mortality)
- Momma H. et al. Muscle-strengthening activities and mortality. *Br J Sports Med* 2022. — [BJSM](https://bjsm.bmj.com/content/56/13/755), [TCTMD](https://www.tctmd.com/news/strength-training-linked-less-premature-mortality-cvd-and-diabetes)

Diet, sleep, alcohol
- Fadnes L.T. et al. Estimating impact of food choices on life expectancy. *PLOS Med* 2022. — [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8824353)
- Cappuccio F.P. et al. Sleep duration and all-cause mortality. *Sleep* 2010. — [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC2864873/)
- Zhao J. et al. Daily alcohol intake and risk of all-cause mortality. *JAMA Netw Open* 2023. — [Healio](https://www.healio.com/news/primary-care/20230405/metaanalysis-alcohol-consumption-does-not-lower-allcause-mortality-risk), [HealthDay](https://www.healthday.com/healthpro-news/general-health/low-volume-daily-alcohol-consumption-not-protective-against-death-2659702669.html)

Relationships, purpose, outlook
- Holt-Lunstad J. et al. Social relationships and mortality risk: a meta-analytic review. *PLoS Med* 2010. — [DOAJ](https://doaj.org/article/c9833ba608474b048444b92ae7ee48ad)
- US Surgeon General. Our Epidemic of Loneliness and Isolation (advisory), 2023. — [NPR](https://www.npr.org/transcripts/1173418268)
- Waldinger R., Schulz M. Harvard Study of Adult Development. — [World Economic Forum](https://weforum.org/agenda/2016/01/what-one-of-the-worlds-longest-studies-tells-us-about-happiness)
- Cohen R., Bavishi C., Rozanski A. Purpose in life and mortality/cardiovascular events. *Psychosom Med* 2016. — [EurekAlert](https://eurekalert.org/news-releases/529471)
- Alimujiang A. et al. Life purpose and mortality among US adults over 50. *JAMA Netw Open* 2019. — [PDF](https://www.themapofmeaning.org/wp-content/uploads/2025/08/alimujiang_2019_oi_190185.pdf)
- Lee L.O. et al. Optimism and exceptional longevity. *PNAS* 2019. — [CNBC](https://www.cnbc.com/2019/08/29/having-an-optimistic-outlook-could-help-you-live-years-longer-study.html)
- Okun M.A. et al. Volunteering by older adults and risk of mortality. *Psychol Aging* 2013. — [ASU](https://keep.lib.asu.edu/items/129666)

Time, regret, attention
- Gilovich T., Medvec V.H. The experience of regret. *Psychol Rev* 1995. — [Kellogg](https://www.kellogg.northwestern.edu/academics-research/research/detail/1998/varieties-of-regret-a-debate-and-partial-resolution)
- Whillans A.V. et al. Buying time promotes happiness. *PNAS* 2017. — [Cornell summary](https://evidencebasedliving.human.cornell.edu/blog/can-money-buy-happiness)
- Allcott H. et al. The welfare effects of social media. *AER* 2020. — [AEA](https://www.aeaweb.org/doi/10.1257/aer.20190658), [NBER](https://www.nber.org/papers/w25514.pdf)
- Hunt M.G. et al. No more FOMO: limiting social media decreases loneliness and depression. *J Soc Clin Psychol* 2018. — [TechCrunch](https://techcrunch.com/2018/11/09/limiting-social-media-use-reduced-loneliness-and-depression-in-new-experiment)
- Time with friends (ATUS). — [SSM Population Health 2023](https://pubmed.ncbi.nlm.nih.gov/36618547/), [The Ringer](https://www.theringer.com/2022/11/29/national-affairs/why-america-is-suffering-a-friendship-recession)
- Smartphone time (secondary estimates). — [Boston 25 / eMarketer](https://www.boston25news.com/news/deep-dive-into-americans-mobile-habits-2025/UCZOPSUIZVJ57EK5YZ2BTPEYAE/)
- Apple Screen Time API (Family Controls). — [Apple docs](https://developer.apple.com/documentation/xcode/configuring-family-controls.md)

Pets (used for the Loves counts)
- Dogs ~12.5 years, cats ~14 years median lifespan: O'Neill D.G. et al. (UK VetCompass studies, 2013–2024).
