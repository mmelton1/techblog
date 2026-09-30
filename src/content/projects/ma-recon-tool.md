---
title: "M&A discovery platform"
summary: "An internal platform that automates discovery for mergers and acquisitions, built with Python, FastAPI, PostgreSQL, and React."
stack: ["Python", "FastAPI", "PostgreSQL", "React", "CI/CD"]
featured: true
publishDate: 2026-09-29
---

**Summary:** When we acquire a company, my team has to work out what's actually in its systems before the integration can be planned. For a long time, that work relied on multiple ad-hoc reports, each of which only showed the environment as it looked when it was run. I created a platform to replace them, and I now lead its development alongside three other analysts. So far, it has been used on more than 30 acquisitions.

## Objectives:

1. Replace ad-hoc reports with data that stays current for the life of a deal.
2. Give analysts one place to record their decisions and generate deliverables from them.
3. Grow the platform from a solo project into something a team could build together.

**Objective 1:** _Replace ad-hoc reports with data that stays current for the life of a deal_

### Replacing ad-hoc reports

When I started, discovery relied on multiple ad-hoc reports pulled from the acquired company's cloud environment. Each one only showed the environment as it looked when it was run, and since deals can run for weeks or months, the picture could drift as the company added users or made changes. The reports also had gaps, so each analyst filled them in with their own scripts and tracked their decisions in their own spreadsheets. Because of that, the same deliverable could come out quite differently depending on who put it together.

In 2025, I wrote a tool that pulled live data into a database instead. Around the same time, the team decided to build a platform rather than keep relying on ad-hoc reports, so in early 2026 we started it as a fork of my tool.

### Collecting data every day

The first thing the platform needed was a way to keep the data current. It reads Microsoft 365, Google Workspace, and the other systems an acquisition runs on every night, and analysts can upload anything it can't reach directly. The result is essentially a live view of the acquired company's environment for as long as the deal is open. It only ever reads from those systems and never makes changes to them.

Collecting every day also means that if new users or mailboxes show up at an acquired company, the people working the deal hear about it right away instead of running into it later in the integration.

**Objective 2:** _Give analysts one place to record their decisions and generate deliverables from them_

### Recording decisions

Next, analysts needed a place to record how we'll handle every user, mailbox, group, app, domain, and device as part of the integration. Every change is logged with the date and the reason, so anyone picking up the deal later can see why something was decided. More than 5,000 decisions have been recorded so far.

We store the collected data and the decisions separately. That way, a nightly rescan can never overwrite a decision, and we can rescan as often as we want without losing anyone's work.

### Generating deliverables

With current data and decisions in one place, the platform could generate the deliverables directly. The worksheets and reports the integration work is planned from are built from the database rather than by hand, so they come out the same no matter which analyst runs them. Other teams have started using the platform's output as well.

**Objective 3:** _Grow the platform from a solo project into something a team could build together_

### Growing from one developer to a team

The platform started with just me working on a laptop. It now has four of us working in a shared repository, and all four are systems analysts rather than professional software developers. So, I set up a process that let us build it together without breaking the version people use every day: branches and pull requests with reviews, separate development and production environments, and automated tests that run on every change.
