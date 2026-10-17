<!-- Generated from src/lib/legal.ts by scripts/write-docs.mts. Edit that file, then run `npm run docs`. -->

# Privacy Policy

> **This is a draft. It has not yet been reviewed by a lawyer and may change before Memento Mori launches.** Fill in every [BRACKETED] placeholder before launch.

_What Memento Mori stores, where, and what it never does with it._ Version 2026-10-16-draft.

## The short version

- Everything you enter stays on your device. Your estimate is worked out on your device too.
- We don’t have accounts you need to create, and we don’t receive your answers.
- No ads, no analytics, no tracking, no selling or sharing of your information.
- You can delete everything at any time: You → Delete everything on this device.

Effective date: [EFFECTIVE DATE]. Run by [OPERATOR: legal name of the person or entity that runs Memento Mori].

## What you enter, and where it is kept

To work out your estimate and your counts, the app asks for and keeps:
- Your first name (optional), birth date, sex at birth and country.
- Your answers about smoking, exercise or daily steps, weight range, alcohol, sleep, and how often you see people you are close to.
- How many hours a day you spend on your phone (your own estimate).
- What matters most to you, and the people, pets and activities you love: names, how often you see or do them, their ages, and optionally a phone number; when you last talked; your plans and focus.
- Small settings, such as your language, whether the clock ticks, when you last opened the app, and when you agreed to these policies.

This is kept in the app’s storage on your device: the browser’s local storage on the web, or the app’s private storage on a phone. It is not sent to us or to anyone else. The app reads your device’s region setting once, on the device, to suggest your country.

Some of this is health information. The [Consumer Health Data Privacy Policy](health-data.md) explains how we treat it.

## What we receive

None of your answers. We don’t run analytics or crash reporting, and the app sets no tracking cookies.

The web version is hosted on GitHub Pages. Like any website host, GitHub receives technical information when your browser loads the app, such as your IP address and browser type, and handles it under the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). When the app is in the App Store or Google Play, Apple and Google handle downloads under their own policies.

Earlier test versions offered a “guest” sign-in, run by our database provider, Supabase (servers in the United States). If you used it, Supabase holds a random account ID, when it was created and last used, and the technical logs that come with signing in (such as IP address and device type). It holds none of your answers. Deleting everything in the app signs it out; to have the account itself erased, email us at the address below. The app does not offer sign-in today.

If we later offer optional sign-in for backup and sync across devices, we will ask first, explain exactly what would leave your device, and update this policy before anything does.

## When you leave the app

Some buttons hand things to other apps or sites, only when you tap them: source links open the publisher’s website; Message and Call open your own messages or phone app with the person’s number and a suggested note; Share opens your device’s share sheet; “Add to my calendar” saves a calendar file to your device. What happens next is up to those apps and their policies.

## What we never do

- Sell, rent or trade your information.
- Share it with advertisers, data brokers or anyone else.
- Track you across apps or websites, or build a profile of you.
- Use your information to train AI models.

## Keeping it safe

Your information is only as safe as your device. The app does not encrypt it separately, so anyone who can use your unlocked device or browser profile could see it. A screen lock helps. Clearing your browser’s site data, or deleting the app, erases it.

## Your rights and choices

Depending on where you live, laws such as the EU and UK GDPR, the California Consumer Privacy Act (CCPA/CPRA) and Washington’s My Health My Data Act give you rights to know what is held about you, to see it, correct it, delete it, take a copy, object to or restrict its use, withdraw consent, and not be treated differently for using these rights.

Because your information stays on your device, you can do most of this yourself:
- See and correct it: everything is shown in the app; You → Edit your answers.
- Delete it: You → Delete everything on this device.
- Take a copy: You → Download my data saves everything the app keeps on your device as one readable file (JSON, which any text editor opens). On a phone it opens your share sheet, so you choose where the file goes; it holds your health answers, so keep it somewhere private.

For anything else, including a guest account from an early test, email [CONTACT EMAIL]. We will answer within 30 days (45 days where the law allows), and we won’t ask for more information than we need to confirm the request is yours. In the EU or UK you can also complain to your local data protection authority.

California residents: we do not sell or share personal information (as those words are defined in the CCPA), and we don’t use sensitive personal information to infer characteristics about you.

## Legal basis (EU and UK)

Your answers are processed on your device to give you the estimate you ask for, with your consent, which you can withdraw at any time by deleting them. For a guest account from an early test, the basis is our legitimate interest in running and securing the service.

## Children

The app is for adults (18 or the age of majority where you live). It is not directed at children, and we don’t knowingly receive information from anyone under 13. Since we don’t receive answers at all, there is nothing for us to delete; if you think a child created a guest account, contact us and we will erase it.

## How long we keep things

Your answers stay on your device until you delete them. Guest accounts from early tests are kept until you ask us to erase them, or until we retire them.

## Changes

If we change this policy we will update the effective date, and if the change matters, tell you in the app before it takes effect.

## Contact

[OPERATOR: legal name of the person or entity that runs Memento Mori]. Email: [CONTACT EMAIL].

---

## Notes for the reviewing lawyer (not shown in the app)

- Confirm whether the operator is a “controller” under GDPR for data that never leaves the device, and whether an EU/UK representative (Art. 27) is needed.
- Confirm the legal basis wording, and whether consent for special-category (health) data needs an explicit opt-in step even though processing is on device.
- Guest accounts: signOut() does not delete the Supabase auth user or the empty profiles row. Consider an in-app account deletion (Edge Function) or retiring the guest accounts before launch.
- GitHub Pages logs: confirm the disclosure is enough, or move hosting if needed.
- CCPA thresholds probably don’t apply to a free app with no revenue; the section is included for transparency. Confirm.
- Take a copy: You → Download my data exports the profile (mm.profile.v1) and settings (mm.prefs.v1) as JSON, which is “structured, commonly used and machine-readable” (GDPR Art. 20; CCPA “readily usable format”). It does not include a guest account’s sign-in session; data held by Supabase for early guest accounts still needs an emailed request. Confirm this is enough.
