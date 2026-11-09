---
author: Sam Hanson
pubDatetime: 2026-11-08T12:00:00.000Z
title: "What Frontier AI Can Do in OT: Our Work with OpenAI"
slug: frontier-ai-in-ot-with-openai
featured: false
draft: false
tags:
  - Dragos
  - OpenAI
  - Vulnerability Research
  - ICS Security
description: A look at Dragos' controlled evaluations of OpenAI frontier models against industrial environments, and what the results mean for OT defenders.
---

[Read the Dragos whitepaper](https://hub.dragos.com/whitepaper/frontier-ai-models-xot-environment) · [Read OpenAI's announcement](https://openai.com/index/introducing-gpt-6-cyber/)

What can a frontier AI model actually do when it encounters an industrial network? That question is more useful to me than a prediction about whether AI will someday “hack a power plant.” At Dragos, we had a chance to test it with OpenAI in controlled environments and put the results on the record.

<a href="https://hub.dragos.com/whitepaper/frontier-ai-models-xot-environment"><img src="/assets/frontier-ai-xot-whitepaper-cover.jpg" class="mx-auto w-full max-w-md" alt="Cover of the Dragos whitepaper What Frontier AI Models Can Actually Do in an xOT Environment, by Sam Hanson, Sumeet Jauhar, and Daniel Michaud-Soucy"></a>

I coauthored _What Frontier AI Models Can Actually Do in an xOT Environment_ with Sumeet Jauhar and Daniel Michaud-Soucy. The paper covers seven assessments involving Dragos cyber ranges, industrial firmware, and ICS malware. We tested GPT-5.5-Cyber and GPT-5.6 Sol, then examined what the models accomplished, where they failed, and where an experienced analyst still had to intervene.

One of the clearest results came from a mock power plant range. With very little initial context, a model distinguished OT assets from ordinary IT activity and found two previously unknown vulnerabilities in engineering software used to manage protective relay data. Those findings exposed protection settings and breaker trip logic. The model built a useful picture of an unfamiliar industrial environment and then found weaknesses in software tied to its operation. These models lowered the skill required to perform these steps and greatly increased the speed at which they can be done.

<figure>
  <img src="/assets/ot-daybreak.webp" width="1672" height="941" loading="lazy" decoding="async" alt="Illustration of an electrical substation and distant power plant at dawn, with faint network paths across the sky" />
  <figcaption>Industrial systems at daybreak. Illustration created for this article.</figcaption>
</figure>

The assessments explored firmware analysis, a partial rebuild of a PIPEDREAM malware module, and activity reaching Stage 2 of the ICS Cyber Kill Chain. They also documented false positives and cases where model activity crashed devices. The results needed human validation and the guardrails of a lab.

## What OpenAI said about the Dragos work

> “Dragos put a frontier model on a mock power plant range and told it almost nothing.”
>
> — Rob T. Lee, Chief AI Officer, Dragos, in [OpenAI's GPT-6 Cyber announcement](https://openai.com/index/introducing-gpt-6-cyber/#defending-critical-infrastructure)

In that section, OpenAI describes the controlled Dragos evaluations, from network discovery and asset enumeration through more sensitive and potentially dangerous device actions. It says our feedback helped refine safeguards so the models can still support authorized industrial security testing while restricting harmful assistance. [Read the full section on OpenAI's site.](https://openai.com/index/introducing-gpt-6-cyber/#defending-critical-infrastructure)

Frontier models are already useful for technical tasks such as reverse engineering and network reconnaissance. But many efforts still require iterative development and validation against real systems. This is not a simple “prompt and be done” process; expert review is still needed in many cases.

We have not yet seen a fully agentic system carry out a Stage 2 attack that impacts OT.

Yet.
