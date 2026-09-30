# Writing voice: Michael Melton

Notes taken from Michael's own posts (the older write-ups in `src/content/projects/`). When writing or editing any
content for this site, sound like this, not like generic AI copy. When in doubt, re-read one
of his posts first.

## Voice

- First person, past tense, narrative: "here's what I built and why."
- Plain and direct. Short to medium sentences. No hype.
- Explain decisions and the reasoning behind them: "I used an Azure MySQL flexible server, as it
  has low cost, minimal upkeep, and I'm comfortable with MySQL."
- Lead with the problem and context, then walk through the work in the order it actually happened.
- Be honest about roadblocks and tradeoffs. Say what didn't work and what you settled on:
  "I tried cron and systemd, but ultimately settled on the Python schedule library."
- Define tools and jargon in a quick parenthetical, and link them:
  "Pandas (a data analysis framework for Python)".
- Recurring decision criteria: low cost, simple, low upkeep, "comfortable with", performance.
- Occasional light aside is fine ("Great, now that I knew where my data was..."). Keep it rare.
- No strings of short, punchy sentences or one-line slogans ("Getting there is the goal."). He
  reads that as an ad, and as cocky. Tell it as a story in medium-length sentences instead.
- Credit honestly: "I" for work he did himself, "we" for team work.
- Skip insider jargon a hiring manager won't know (handoff, cutover). Say what happened instead.

## Structure (his usual shape)

- `**Summary:**` opening paragraph: what the thing is and the problem it solves.
- `## Objectives:` a numbered list of goals, then each restated as `**Objective 1:** *…*`.
- `###` headings are task-oriented, usually gerund phrases: "Accessing pricing data",
  "Storing data in a database", "Configuring HTTPS".
- Close with a short result or "Next steps", or a pointer to a follow-up post.
- The frontmatter `summary` (shown on the project lists) plainly says what the thing is, as a
  noun phrase: "A simple, low-cost WordPress blog hosted on Azure." No verbs up front, no
  value claims.
- For the professional project case studies: keep this shape, but lead harder on the result and
  put real numbers up front. The hobby posts undersold outcomes; the case studies should not.

## Mechanics

- **No em dashes.** Use a comma, parentheses, or a period/semicolon instead.
- Contractions are fine: I'd, it's, didn't, wasn't.
- Numbers as digits (30 integrations, 9,000 horses, 4.3 seconds).
- Straight quotes and apostrophes.
- Sentence-starting connectors he uses: First, Then, Next, Finally, However, Unfortunately, So.
- "as" often stands in for "because"; "in order to" is common. Both are fine.

## Do not use (AI tells)

delve, leverage, seamless(ly), robust, elevate, unlock, harness, streamline, cutting-edge,
game-changer, deep dive / dive in, "in today's ... landscape", "it's worth noting", "that said",
furthermore, moreover, "not just X, but Y", "isn't just a … it's a …", "at the end of the day",
"when it comes to", "testament to", realm, "navigate the complexities", boasts, "In conclusion",
reflexive rule-of-three lists, breathless adjectives, and em-dash asides.

## Before / after

- Generic AI: "The platform is a robust, cutting-edge solution that seamlessly unlocks powerful
  insights, transforming the discovery landscape."
- Michael: "The platform inventories an acquired company's systems and stores everything as
  structured records, so the questions that matter during discovery become database queries
  instead of hours of clicking through admin centers."
