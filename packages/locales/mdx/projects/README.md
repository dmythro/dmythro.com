# Project articles — structure and voice

Each project has two files, `{slug}.en.mdx` and `{slug}.uk.mdx`. They carry the article body
only — title, description, tags, status, dates and links all live in
`apps/www2/src/data/projects.ts`, so nothing is duplicated across locales.

This file is not part of the content collection (the glob only matches `*.mdx`).

## The seven beats

Beats 1–3 are required. The rest are used when the project actually has something to say, which
is what makes a small tool's page short and a large one's page long without either feeling padded.

| # | Beat | Heading | Length |
| - | ---- | ------- | ------ |
| 1 | **Lede** | *(none — opens the article)* | 2–3 sentences |
| 2 | **Examples** | `## Examples` | Smallest useful snippet(s), right below the rendered install command |
| 3 | **Why it exists** | `## Why it exists` | 1 paragraph |
| 4 | **How it's different** | `## How it's different` | Table or 3–4 bullets + one "use X instead if" line |
| 5 | **What's inside** | `## What's inside` | One `###` sub-beat per real feature, each with a snippet |
| 6 | **Design notes** | `## Design notes` | 1–3 paragraphs on non-obvious decisions |
| 7 | **Status** | `## Status` | 2–4 sentences, or a short list for a roadmap |

### 1. Lede

The itch, in first person, concrete. Name the actual annoyance — not the category of annoyance.
This is the beat that decides whether a reader keeps going, and the one that makes the page read
like a person rather than a package registry.

Bad: *"The `foo` package provides a comprehensive solution for bar management."*
Good: *"I wanted one command that tells me which `.env` a repo is currently on. There wasn't one."*

### 2. Examples

Code goes **above the fold**, before any explanation. The install command is rendered from
`projects.ts`, so do not repeat it here — open with the smallest snippet that does something
real. For projects with no install line at all (a website, say), show how to run it locally. A project whose code is not public has nothing to run, so it has no Examples beat. Show results in comments rather than describing them in prose:

```ts
getCountryCode('Україна') // 'UA'
```

### 3. Why it exists

The origin story. What was being built when the gap appeared, what the workaround was, why the
workaround stopped being acceptable. One paragraph — resist the urge to write the whole history.

### 4. How it's different

Name the real alternatives. Describe what each one optimises for rather than what it lacks, then
say plainly when someone should use it instead:

> Use `i18n-iso-countries` instead if you need country names in forty languages.

An honest "don't use this if" line buys more credibility than three paragraphs of features. Skip
this beat entirely when there is no genuine alternative.

### 5. What's inside

Only for projects with enough surface to warrant it. One `###` per feature, each with a snippet.
If a feature can't carry a code example, it probably belongs in the lede as a clause.

### 6. Design notes

The curious-mind beat: one decision that wasn't obvious, and the reasoning behind it. Rejected
alternatives are more interesting than chosen ones — *why age and not GPG*, *why an opt-in subpath
and not a top-level export*. This is what a reader remembers.

### 7. Status

Where it stands and what's next. For `wip` and `planned` projects this beat carries the
anticipation, so be specific about what's landing rather than vague about ambition.

## Voice rules

- **First person.** "I built", "I kept hitting". The author should be visible.
- **Bold at most once per paragraph**, on a noun worth scanning for. Bolding every technology name
  turns the page into keyword soup and makes nothing stand out.
- **No stats in prose.** Stars and downloads render live from the API. Writing "1,300+ stars" into
  the copy duplicates the badge and goes stale.
- **Nothing that ages on its own.** Avoid "twelve years later", "currently five skills", "recently",
  "this year" — anything that silently becomes wrong when nobody edits the file. Fixed dates
  ("since 2014") are fine because they stay true; elapsed time and live counts are not.
- **One idea per paragraph.** Three-sentence paragraphs beat seven-sentence ones.
- **No adjective stacking.** "Comprehensive, structured data" says less than "capital, currency,
  calling code, native name".
- **Headings are mandatory.** An article with no `##` cannot be skimmed, and most readers skim.
- **Link out generously** — to specs, to the tools being compared, to related projects. The
  `<Link>` MDX component adds the right icon for GitHub, npm, and YouTube automatically.

## Sounding like a person

The rules above keep an article accurate and easy to skim. These are about how it reads. The
failure they guard against is easy to miss: every sentence is correct, and the page still sounds
assembled.

- **Say it the way you would tell a colleague.** Read the paragraph aloud. Whatever you would not
  say across a desk gets rewritten until you would.
- **A fact does not need its benefit attached.** "X, so Y", "X, which means Y" and "X instead of Y"
  are fine once. When most sentences in a paragraph end that way, cut the tails a reader can work
  out alone. One per paragraph at most.
- **Neighbouring sentences are not built alike.** Three statements in a row of the same length and
  shape read as a spec sheet. A short sentence next to a long one is fine where the content is
  like that, and never for effect.
- **An instance instead of a summary.** "It taught me a lot" says nothing. "Text copied from the
  PDF came out as 'q uality'" is what a reader remembers. If there is no instance, cut the
  sentence.
- **Where something happened, tell it as it happened.** "I tried GPG first, and the passphrase
  prompt kept showing up in the wrong place" reads as a person. A row of present-tense properties
  reads as a manual. Keep the manual voice for tables, lists and snippets.
- **Sub-beats do not share a template.** If every `###` goes definition, mechanism, benefit, open
  some of them with the snippet, the problem or the mistake.
- **Room in proportion.** The decision that took a week gets a paragraph, the obvious one gets a
  clause or nothing. Equal paragraphs for unequal things make a page read like a filled-in form.
- **Paragraphs lead into each other.** If they can be shuffled and nobody notices, they are a list.
  Make them one, or connect them.
- **Nothing written for effect.** No punchline closing a paragraph, no "it isn't X, it's Y", no
  groups of three for the rhythm, no heading that is a slogan. A line that sounds good and adds
  nothing gets cut.
- **The author's own lines stay.** A joke, an aside or an odd turn of phrase is the voice. Do not
  smooth it out, in either language.

## Bilingual

Both locales ship together, always. Translate the *argument*, not the words — a literal
translation of an English idiom usually reads worse than a fresh Ukrainian sentence making the
same point. Executable code, identifiers and CLI output stay identical across locales; prose and
explanatory code comments get translated.

The Ukrainian text is written, not converted. Start from what the paragraph has to say and write
it the way it would be said in Ukrainian. Sentences do not have to begin and end where the English
ones do. Verbs carry the sentence, not verbal nouns, «я» goes where it adds something and not
before every verb, and the dash stays wherever Ukrainian grammar puts it («Сторінки — це статичний
HTML»), whatever the English punctuation was.

No Russian words in the Ukrainian text, and no phrases built the Russian way out of Ukrainian
words: «завдання», not «задача»; «безпосередньо», not «напряму»; «застосунок», not «додаток»;
«здебільшого», not «в основному». `apps/www2/tests/ukrainian.test.ts` holds the list and fails
on any of them. When a new one is caught, it goes into that list in the same change.

## Checklist before committing

- [ ] Beats 1–3 present, in order
- [ ] The rendered install command is not repeated in the body; snippets fit the active install metadata (`installPackage`, `installRunner`, or `install`)
- [ ] Every code block was actually run, and its comments show real output
- [ ] No hardcoded star/download counts
- [ ] `updatedAt` bumped in `projects.ts` for a meaningful revision
- [ ] Both `.en.mdx` and `.uk.mdx` updated
- [ ] Each language read aloud once, start to finish
