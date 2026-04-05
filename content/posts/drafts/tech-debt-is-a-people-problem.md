---
title: "Tech debt is a people problem. Here's how I frame it with my team and with leadership."
date: 2026-04-05
draft: true
categories:
  - Technology
tags:
  - engineering-management
  - tech-debt
  - leadership
description: "Tech debt conversations go badly not because the debt is hard to understand, but because everyone in the room is trying to solve a different problem."
---

Every engineering team has a version of this conversation.

An engineer flags something in a planning meeting, a service that's becoming painful to work with, a pattern that made sense three years ago and doesn't anymore, a test suite that nobody trusts. Everyone around the table nods. Everyone knows it's real. And then the sprint starts, the feature work takes over, and the thing stays exactly as it was.

Six months later, the same conversation happens again.

I used to think this was a prioritisation problem. Get better at tracking tech debt, make it more visible, carve out a percentage of each sprint for it. Good process, right?

It helped a little. But it didn't fix the thing that was actually broken.

The thing that was actually broken was that nobody, not my team, not leadership, not me, had a shared understanding of what tech debt *cost*. And without that, every conversation about it was really just a negotiation between people with different intuitions, talking past each other.

## Why "technical debt" is the wrong frame for most of the people you need to convince

The phrase "technical debt" is useful inside an engineering team. It captures something real: decisions made under time pressure, shortcuts that were reasonable once and aren't anymore, accumulated complexity that slows everything down.

But it's an engineering metaphor. And when you take it to leadership, you're asking people who don't think in those terms to fund something they can't directly see, against a backlog of features that are much easier to point to.

I've sat in enough of those conversations to know how they tend to go. Engineering says: this is slowing us down, we need to fix it. Leadership says: how much will it slow us down if we don't? Engineering says: it's hard to quantify. Leadership says: come back when you can.

That's not leadership being obstructive. That's a reasonable response to an incomplete argument.

## The reframe that actually worked

I stopped framing tech debt as an engineering concern and started framing it as a risk and a rate.

**Risk** is the easier one to communicate. What could go wrong, and how likely is it? This isn't about catastrophising, it's about being honest. If a critical service is poorly understood, poorly tested, and only one or two people know how it behaves under load, that's a real organisational risk. Leadership understands risk. They think about it all the time. Give them the actual picture.

**Rate** is subtler but often more persuasive. The question isn't just "what could break", it's "what is this already costing us, every week?" Slower delivery. More time in debugging than building. New engineers taking longer to get up to speed because the codebase is a maze. These are real costs, even when nothing has gone wrong.

When I started putting those two things together, here's the risk we're carrying, here's the rate at which it's slowing us down, the conversation with leadership changed. Not overnight, and not without pushback. But it gave us a common language.

## Making it visible in planning

The other piece that helped was getting tech debt out of the abstract and into the roadmap.

Not as a percentage of sprint capacity. I've tried that, and it tends to get quietly eroded whenever something urgent comes up. Instead, as named, scoped items with a clear rationale attached to each one.

"Refactor the ingestion pipeline" is easy to deprioritise. "Reduce ingestion pipeline failure rate, which is currently causing X hours of on-call burden per month and blocking the team from shipping Y" is harder to ignore. Same work. Completely different conversation.

The discipline here is on the engineering side: being specific about what the debt is, why it matters, and what done looks like. That's harder than writing a ticket that says "clean this up." But it's the only version that travels outside the team.

## Knowing when to pay it down, and when not to

This is the part that took me the longest to get comfortable with: not all tech debt should be fixed.

Some of it is in parts of the system that nobody touches anymore. Some of it would cost more to fix than to live with. Some of it is genuinely not that bad, it just feels bad to the engineers who are closest to it.

I've learned to ask a simple question when a piece of debt comes up: is this slowing us down right now, or do we just know it's there? Those are different things, and conflating them leads to teams spending time on rewrites that don't meaningfully change how fast they can ship.

The judgment call is always contextual. But making it explicit, naming it as a deliberate decision to live with something, rather than just letting it slide, changes the dynamic. Engineers feel heard. Leadership sees that you're being thoughtful, not just lobbying for engineering time.

## The people part

All of this is really about people.

Getting engineers to be precise about what debt costs, rather than just expressing frustration about it. Getting leadership to see it as a business concern, not just an engineering complaint. Holding the space between the two, translating in both directions, without losing credibility with either side.

That's the job. The process helps, but the process isn't the point.

The point is that tech debt conversations tend to go badly not because the debt is hard to understand, but because everyone in the room is trying to solve a different problem. Your job as an EM is to make sure you're all looking at the same one.
