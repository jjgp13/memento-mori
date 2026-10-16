/**
 * The legal documents (Terms of Use, Privacy Policy, Consumer Health Data Privacy Policy). The in-app
 * screens render these, and scripts/write-docs.mts writes the Markdown copies in docs/legal/, so the two
 * can't drift. Edit here, then run `npm run docs`.
 *
 * ENGLISH ONLY, on purpose: the one exception to "all UI text lives in the language catalogs". Legal text
 * should be translated professionally from the lawyer-reviewed English, not drafted in 11 languages.
 * Everything around the documents (titles in links, the draft notice, the disclaimer and support line)
 * is in the catalogs under `legal` and `disclaimer`.
 *
 * DRAFTS: written to match what the app does today (data on device only, no ads, no analytics, no
 * selling), but not yet reviewed by a lawyer. Everything in [BRACKETS] must be filled in before launch.
 *
 * Text format: one string per paragraph; "- " starts a bullet; [label](href) is a link, where an href
 * starting with "/" is a screen in the app.
 */

/** Bump when the Terms or policies change in a way people should agree to again. */
export const LEGAL_VERSION = '2026-10-15-draft';

export const PLACEHOLDERS = {
  operator: '[OPERATOR: legal name of the person or entity that runs Memento Mori]',
  contact: '[CONTACT EMAIL]',
  effective: '[EFFECTIVE DATE]',
  law: '[GOVERNING LAW: state or country]',
  venue: '[VENUE: courts of a city/county and state]',
} as const;
const P = PLACEHOLDERS;

export type LegalKey = 'terms' | 'privacy' | 'health-data';

export type LegalDoc = {
  key: LegalKey;
  title: string;
  /** One line under the title. */
  summary: string;
  sections: { heading: string; body: string[] }[];
  /** Questions for the reviewing lawyer; only in the Markdown copy, not shown in the app. */
  reviewNotes: string[];
};

export const DRAFT_NOTICE =
  'This is a draft. It has not yet been reviewed by a lawyer and may change before Memento Mori launches.';

const TERMS: LegalDoc = {
  key: 'terms',
  title: 'Terms of Use',
  summary: 'The agreement for using Memento Mori: a free tool, offered as is, for reflection and education.',
  sections: [
    {
      heading: 'About these terms',
      body: [
        `Memento Mori (“the app”) is run by ${P.operator} (“we”, “us”). These terms apply to the app on the web, iOS and Android. By using the app you agree to them. If you don’t agree, please don’t use it.`,
        `Effective date: ${P.effective}.`,
      ],
    },
    {
      heading: 'What the app is',
      body: [
        'Memento Mori is a free tool for reflection and education. It estimates, from population statistics and your answers, how much time people like you tend to have, and helps you point that time at the people and things you love.',
        'It has no ads and no paid features. We may ask for voluntary donations one day, only if hosting costs require it.',
      ],
    },
    {
      heading: 'Not medical advice, and not a prediction',
      body: [
        'The estimates are statistical: they describe how long groups of people with similar answers lived on average, in published studies and United Nations life tables. They are not a prediction of when you will die, and they cannot account for your personal health history, genes or medical care.',
        'Nothing in the app is medical advice, diagnosis or treatment, or a substitute for it. Don’t start, stop or change any treatment, medication, diet or exercise based on the app. Talk with a doctor or other qualified professional about your health.',
        'The links between habits and lifespan are associations from population studies; they don’t prove that changing a habit will change your lifespan by the amount shown.',
        'If you are in crisis or thinking about harming yourself, please reach out now: in the US call or text [988](https://988lifeline.org); elsewhere see [findahelpline.com](https://findahelpline.com), or call your local emergency number. The app is not a crisis or emergency service.',
      ],
    },
    {
      heading: 'Who can use it',
      body: [
        'You must be at least 18 years old, or the age of majority where you live if that is older, to use the app.',
      ],
    },
    {
      heading: 'Your information',
      body: [
        'Your answers stay on your device. How we handle information is described in the [Privacy Policy](/legal/privacy) and the [Consumer Health Data Privacy Policy](/legal/health-data), which are part of these terms.',
        'Because your data lives only on your device, you are responsible for it: if you clear your browser’s site data, delete the app or lose your device, your answers are gone and we cannot restore them.',
      ],
    },
    {
      heading: 'Using the app fairly',
      body: [
        'Please don’t use the app to break the law, to harm anyone, or to interfere with the app or the services it runs on (for example by attacking, overloading or scraping them).',
        'If you add other people to the app (for example someone who loves you, with a phone number), you are responsible for having the right to do so. That information stays on your device.',
      ],
    },
    {
      heading: 'Other sites and services',
      body: [
        'The app links to studies and other websites, and can open your own messages, phone, share sheet or calendar. Those are run by others, under their own terms. We are not responsible for their content or how they handle your information.',
        'Life tables come from the United Nations World Population Prospects 2024 (CC BY 3.0 IGO). The Stoic quotes come from public-domain translations. The full list is on the [Sources](/sources) screen.',
      ],
    },
    {
      heading: 'No warranty',
      body: [
        'The app is provided “as is” and “as available”, without warranties of any kind, express or implied, including warranties of accuracy, fitness for a particular purpose, merchantability and non-infringement. We don’t promise that the estimates are accurate or complete, or that the app will always be available or free of errors. Some places don’t allow these exclusions, so some of them may not apply to you.',
      ],
    },
    {
      heading: 'Limitation of liability',
      body: [
        'To the fullest extent the law allows, we will not be liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of data, health, life or opportunity, arising from your use of or reliance on the app, even if we were told such damages were possible. Our total liability for any claim about the app is limited to the greater of the amount you paid us to use it (which is nothing, since it is free) or US $50.',
        'Nothing in these terms limits liability that cannot be limited by law, such as liability for death or personal injury caused by negligence where that rule applies, or your rights as a consumer under the laws of where you live.',
      ],
    },
    {
      heading: 'Changes',
      body: [
        'We may change the app, or stop offering it, at any time. We may update these terms; if a change matters, we will tell you in the app and ask you to agree again. The effective date above shows the latest version.',
        'You can stop using the app at any time and delete everything on your device from the You screen.',
      ],
    },
    {
      heading: 'Governing law',
      body: [
        `These terms are governed by the laws of ${P.law}, without regard to its conflict-of-laws rules. Any dispute will be handled in ${P.venue}, unless the law where you live gives you the right to bring it there.`,
      ],
    },
    {
      heading: 'Contact',
      body: [`Questions about these terms: ${P.contact}.`],
    },
  ],
  reviewNotes: [
    'Confirm the operator (individual vs. entity) and whether forming an LLC is advisable before launch.',
    'Confirm the 18+ / age-of-majority rule. The app does not verify age; onboarding asks for a birth date, which could be used to block under-18s.',
    'Confirm the liability cap amount and the consumer-law carve-outs for the EU/UK and US states.',
    'Decide whether an arbitration clause or class-action waiver is wanted (not included; gentler and simpler without).',
    'Consider whether an indemnity clause is needed (not included).',
    'App Store and Google Play require their own minimum terms (e.g. Apple’s standard EULA); check before native release.',
  ],
};

const PRIVACY: LegalDoc = {
  key: 'privacy',
  title: 'Privacy Policy',
  summary: 'What Memento Mori stores, where, and what it never does with it.',
  sections: [
    {
      heading: 'The short version',
      body: [
        '- Everything you enter stays on your device. Your estimate is worked out on your device too.',
        '- We don’t have accounts you need to create, and we don’t receive your answers.',
        '- No ads, no analytics, no tracking, no selling or sharing of your information.',
        '- You can delete everything at any time: You → Delete everything on this device.',
        `Effective date: ${P.effective}. Run by ${P.operator}.`,
      ],
    },
    {
      heading: 'What you enter, and where it is kept',
      body: [
        'To work out your estimate and your counts, the app asks for and keeps:',
        '- Your first name (optional), birth date, sex at birth and country.',
        '- Your answers about smoking, exercise or daily steps, weight range, alcohol, sleep, and how often you see people you are close to.',
        '- How many hours a day you spend on your phone (your own estimate).',
        '- What matters most to you, and the people, pets and activities you love: names, how often you see or do them, their ages, and optionally a phone number; when you last talked; your plans and focus.',
        '- Small settings, such as whether the clock ticks, when you last opened the app, and when you agreed to these policies.',
        'This is kept in the app’s storage on your device: the browser’s local storage on the web, or the app’s private storage on a phone. It is not sent to us or to anyone else. The app reads your device’s region setting once, on the device, to suggest your country.',
        'Some of this is health information. The [Consumer Health Data Privacy Policy](/legal/health-data) explains how we treat it.',
      ],
    },
    {
      heading: 'What we receive',
      body: [
        'None of your answers. We don’t run analytics or crash reporting, and the app sets no tracking cookies.',
        'The web version is hosted on GitHub Pages. Like any website host, GitHub receives technical information when your browser loads the app, such as your IP address and browser type, and handles it under the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). When the app is in the App Store or Google Play, Apple and Google handle downloads under their own policies.',
        'Earlier test versions offered a “guest” sign-in, run by our database provider, Supabase (servers in the United States). If you used it, Supabase holds a random account ID, when it was created and last used, and the technical logs that come with signing in (such as IP address and device type). It holds none of your answers. Deleting everything in the app signs it out; to have the account itself erased, email us at the address below. The app does not offer sign-in today.',
        'If we later offer optional sign-in for backup and sync across devices, we will ask first, explain exactly what would leave your device, and update this policy before anything does.',
      ],
    },
    {
      heading: 'When you leave the app',
      body: [
        'Some buttons hand things to other apps or sites, only when you tap them: source links open the publisher’s website; Message and Call open your own messages or phone app with the person’s number and a suggested note; Share opens your device’s share sheet; “Add to my calendar” saves a calendar file to your device. What happens next is up to those apps and their policies.',
      ],
    },
    {
      heading: 'What we never do',
      body: [
        '- Sell, rent or trade your information.',
        '- Share it with advertisers, data brokers or anyone else.',
        '- Track you across apps or websites, or build a profile of you.',
        '- Use your information to train AI models.',
      ],
    },
    {
      heading: 'Keeping it safe',
      body: [
        'Your information is only as safe as your device. The app does not encrypt it separately, so anyone who can use your unlocked device or browser profile could see it. A screen lock helps. Clearing your browser’s site data, or deleting the app, erases it.',
      ],
    },
    {
      heading: 'Your rights and choices',
      body: [
        'Depending on where you live, laws such as the EU and UK GDPR, the California Consumer Privacy Act (CCPA/CPRA) and Washington’s My Health My Data Act give you rights to know what is held about you, to see it, correct it, delete it, take a copy, object to or restrict its use, withdraw consent, and not be treated differently for using these rights.',
        'Because your information stays on your device, you can do most of this yourself:',
        '- See and correct it: everything is shown in the app; You → Edit your answers.',
        '- Delete it: You → Delete everything on this device.',
        '- Take a copy: it is on your device; an export button is planned.',
        `For anything else, including a guest account from an early test, email ${P.contact}. We will answer within 30 days (45 days where the law allows), and we won’t ask for more information than we need to confirm the request is yours. In the EU or UK you can also complain to your local data protection authority.`,
        'California residents: we do not sell or share personal information (as those words are defined in the CCPA), and we don’t use sensitive personal information to infer characteristics about you.',
      ],
    },
    {
      heading: 'Legal basis (EU and UK)',
      body: [
        'Your answers are processed on your device to give you the estimate you ask for, with your consent, which you can withdraw at any time by deleting them. For a guest account from an early test, the basis is our legitimate interest in running and securing the service.',
      ],
    },
    {
      heading: 'Children',
      body: [
        'The app is for adults (18 or the age of majority where you live). It is not directed at children, and we don’t knowingly receive information from anyone under 13. Since we don’t receive answers at all, there is nothing for us to delete; if you think a child created a guest account, contact us and we will erase it.',
      ],
    },
    {
      heading: 'How long we keep things',
      body: [
        'Your answers stay on your device until you delete them. Guest accounts from early tests are kept until you ask us to erase them, or until we retire them.',
      ],
    },
    {
      heading: 'Changes',
      body: [
        'If we change this policy we will update the effective date, and if the change matters, tell you in the app before it takes effect.',
      ],
    },
    {
      heading: 'Contact',
      body: [`${P.operator}. Email: ${P.contact}.`],
    },
  ],
  reviewNotes: [
    'Confirm whether the operator is a “controller” under GDPR for data that never leaves the device, and whether an EU/UK representative (Art. 27) is needed.',
    'Confirm the legal basis wording, and whether consent for special-category (health) data needs an explicit opt-in step even though processing is on device.',
    'Guest accounts: signOut() does not delete the Supabase auth user or the empty profiles row. Consider an in-app account deletion (Edge Function) or retiring the guest accounts before launch.',
    'GitHub Pages logs: confirm the disclosure is enough, or move hosting if needed.',
    'CCPA thresholds probably don’t apply to a free app with no revenue; the section is included for transparency. Confirm.',
    'An in-app data export is promised as planned; add it before launch if the right to portability requires it.',
  ],
};

const HEALTH: LegalDoc = {
  key: 'health-data',
  title: 'Consumer Health Data Privacy Policy',
  summary: 'For Washington’s My Health My Data Act and similar laws: the health-related data the app uses, and your rights.',
  sections: [
    {
      heading: 'Why this policy exists',
      body: [
        `Washington State’s My Health My Data Act, and similar laws in other states, protect “consumer health data”: information that identifies or could be linked to you and describes or could reveal your health. This policy explains how Memento Mori, run by ${P.operator}, treats that kind of data. It adds to our [Privacy Policy](/legal/privacy).`,
        `Effective date: ${P.effective}.`,
      ],
    },
    {
      heading: 'The health data the app uses',
      body: [
        '- Your answers about smoking, exercise or daily steps, weight range, alcohol, sleep, and how often you see people you are close to (including whether you often feel alone).',
        '- Your birth date and sex at birth, which together with your answers could suggest things about your health.',
        '- How many hours a day you spend on your phone.',
        '- What the app works out from these on your device: your estimated lifespan and range, and how each habit moves it.',
        '- The people and pets you love, their ages, and how often you see them, which feed the “N more times” counts.',
        'In the future, with your permission, the app may read steps and sleep from Apple Health or Health Connect. That would also stay on your device, and we will update this policy before it is offered.',
      ],
    },
    {
      heading: 'Where it comes from, and why',
      body: [
        'All of it comes from you, typed into the app. We use it for one purpose: to show you your estimate, your calendar and your counts, on your device.',
      ],
    },
    {
      heading: 'Where it goes',
      body: [
        'Nowhere. It is stored and processed only on your device. We, the operator, never receive it, and it is not sent to any server.',
        '- We do not share consumer health data with any third party or affiliate.',
        '- We do not sell consumer health data, and never will.',
        '- We do not use it for advertising, and we do not use geofencing.',
        'If we ever offer optional backup or sync, we will ask for your separate, explicit consent before any health data leaves your device, tell you exactly what and to whom, and update this policy first.',
      ],
    },
    {
      heading: 'Your rights',
      body: [
        'You have the right to confirm whether we collect, share or sell your consumer health data; to see it; to get a list of anyone we have shared it with (there is no one); to withdraw consent; and to have it deleted.',
        '- See it: it is all shown in the app, and You → Edit your answers lets you change it.',
        '- Withdraw consent and delete it: You → Delete everything on this device erases it at once. Uninstalling the app or clearing your browser’s site data also erases it.',
        `- Ask us: email ${P.contact}. We will respond within 45 days. If we can’t do what you ask, we will explain why, and you may appeal by replying with “Appeal” in the subject; we will answer the appeal within 45 days. If you are not satisfied, you can contact the [Washington State Attorney General](https://www.atg.wa.gov/file-complaint).`,
        'We will never treat you differently for using these rights.',
      ],
    },
    {
      heading: 'Contact',
      body: [`${P.operator}. Email: ${P.contact}.`],
    },
  ],
  reviewNotes: [
    'Key question: does on-device processing by our software count as the operator “collecting” consumer health data under RCW 19.373 (“collect” includes “process … in any manner”)? This policy assumes caution and treats it as covered.',
    'If it is covered, MHMDA requires consent before collection: confirm whether the “By beginning, you agree…” line on the welcome screen is enough, or whether a separate, unbundled opt-in for health data is needed before the habit questions.',
    'This policy must be linked from the homepage (MHMDA §19.373.020). It is linked from the welcome screen and the You screen; consider also the web build’s landing page.',
    'Check Nevada SB 370 and Connecticut’s consumer health data provisions, which have similar requirements.',
    'Confirm the appeal process and 45-day timelines.',
  ],
};

export const LEGAL_DOCS: Record<LegalKey, LegalDoc> = { terms: TERMS, privacy: PRIVACY, 'health-data': HEALTH };
export const LEGAL_KEYS = Object.keys(LEGAL_DOCS) as LegalKey[];
