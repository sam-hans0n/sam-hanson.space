---
author: Sam Hanson
pubDatetime: 2024-12-14T11:05:56.066Z
modDatetime: 2024-12-14T11:05:56.066Z
title: The Fuxnet Malware
slug: fuxnet-malware
featured: false
draft: false
tags:
  - Malware Analysis
  - Fuxnet
  - Meter-bus
description: Read Dragos'public intelligence report on the 8th ICS-specific malware, co-written by me and Bryce Livingston.
---

For in-depth analysis, check out these whitepapers on Fuxnet, co-written by me and Bryce Livingston:

- [Fuxnet Malware](https://hub.dragos.com/hubfs/Reports/WP_FUXNET_Final_2_CH.pdf)
- [Fuxnet Strategic Overview](https://hub.dragos.com/hubfs/Reports/Dragos_SB_Intel_Fuxnet_ICSMalware.pdf?hsLang=en)

</br></br>

# Fuxnet Malware

<div>
  <img src="/assets/facebook-hacked-moskollektor.png" class="sm:w-1/2 mx-auto" alt="password cracking software advertisement">
</div>

In April of 2024, BlackJack (a self-proclaimed hacktivist group) announced compromise of Moskollektor, a
Russian municipal organization in the Moscow area. They are responsible for running Moscow's utility tunnels, an underground network of cables and pipes.

BlackJack <i>did not</i> provide samples of the malware used. Consequently, analysts can only analyze the
data provided by the group. All data provided by BlackJack appear legitimate, but we must approach
assessments and claims carefully.

Fuxnet, provided the binary exists, would be the 8th ICS-specific malware to exist. After analyzing the screenshots
of Fuxnet's source code (provided by BlackJack), the capability can be split into two categories:

- <b>Linux wiper:</b> destroys file system, UBI volume, and flash memory) targeting industrial sensor-gateway devices.
- <b>Meter-bus Denial of Service:</b> floods industrial sensor via Meter-bus protocol over a serial connection, attempts
  DoS fuzzing at the same time.

<div>
  <figure>
  <img src="/assets/fuxnet_source_mbus_packet.png" class="sm:w-1/2 mx-auto" alt="password cracking software advertisement">
  <center><figcaption>Meter-bus packet generation with fuzzing.</figcaption></center>
  </figure>
</div>

Due to the inclusion of the Meter-bus functionality, Fuxnet as deployed is an offensive action on an
industrial asset, therefore counting as ICS-specific malware.
