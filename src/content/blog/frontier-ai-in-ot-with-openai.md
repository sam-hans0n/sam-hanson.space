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

What can a frontier AI model actually do when it encounters an industrial network? That question is more useful to me than a prediction about whether AI will someday “hack a power plant.” At [Dragos](https://www.dragos.com/), we had a chance to test it with [OpenAI](https://openai.com/) in controlled environments and put the results on the record.

<a href="https://hub.dragos.com/whitepaper/frontier-ai-models-xot-environment"><img src="/assets/frontier-ai-xot-whitepaper-cover.jpg" class="mx-auto w-full max-w-md" alt="Cover of the Dragos whitepaper What Frontier AI Models Can Actually Do in an xOT Environment, by Sam Hanson, Sumeet Jauhar, and Daniel Michaud-Soucy"></a>

I coauthored [_What Frontier AI Models Can Actually Do in an xOT Environment_](https://hub.dragos.com/whitepaper/frontier-ai-models-xot-environment) with Sumeet Jauhar and Daniel Michaud-Soucy. The paper covers seven assessments involving Dragos cyber ranges, industrial firmware, and ICS malware. We tested GPT-5.5-Cyber and GPT-5.6 Sol, then examined what the models accomplished, where they failed, and where an experienced analyst still had to intervene.

One of the clearest results came from a mock power plant range. With very little initial context, a model distinguished OT assets from ordinary IT activity and found two previously unknown vulnerabilities in engineering software used to manage protective relay data. Those findings exposed protection settings and breaker trip logic. The model built a useful picture of an unfamiliar industrial environment and then found weaknesses in software tied to its operation. That is valuable to a defender doing authorized research, and it is also the sort of groundwork an adversary would want before attempting anything physical.

The rest of the work matters just as much as that headline result. The assessments explored firmware analysis, a partial rebuild of a PIPEDREAM malware module, and activity reaching Stage 2 of the ICS Cyber Kill Chain. They also documented false positives and cases where model activity crashed devices. Those failures are part of the finding. In OT, an answer that sounds plausible is not enough, and an unsafe test can itself have consequences. The results needed human validation and the guardrails of a lab.

[OpenAI's GPT-6 Cyber announcement](https://openai.com/index/introducing-gpt-6-cyber/) discusses the Dragos collaboration in its section on defending critical infrastructure. OpenAI describes using our feedback to refine safeguards around dangerous requests while preserving access for authorized defenders.

My takeaway is that frontier models are already useful for parts of OT reconnaissance and vulnerability research, but their output has to be checked against the actual system. Industrial environments are diverse, long lived, and connected to physical processes. Understanding what a model can discover, what it gets wrong, and how its actions affect equipment gives defenders a firmer basis for testing, prioritizing, and building safeguards.

The [full Dragos whitepaper](https://hub.dragos.com/whitepaper/frontier-ai-models-xot-environment) has the assessment details and defensive context. [OpenAI's post](https://openai.com/index/introducing-gpt-6-cyber/) explains how the collaboration informed its broader approach to critical infrastructure safeguards.
