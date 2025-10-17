---
author: Sam Hanson
pubDatetime: 2025-10-17T19:05:22.042Z
title: Don't Cry Wolf - Evidence-based Assessments of ICS Threats
slug: defcon-evidence-based-assessment
featured: true
draft: false
tags:
  - Malware Analysis
  - Threat Hunting
  - ICS-specific Malware
description: Jimmy Wylie's and my DEF CON'33 talk is now available on YouTube. We discuss the analytical rigor undertaken before claiming a capability is "ICS-specific malware" with some specific examples I found while threat hunting.
---

<style>
.video-container {
  position: relative;
  width: 100%; /* Full width for responsiveness */
  max-width: 560px; /* Optional: Limit the maximum width */
  padding-bottom: 56.25%; /* Maintain 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  margin: 0 auto; /* Center the video */
}
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* Ensure iframe scales with container */
  height: 100%;
  border: 0; /* Remove any default borders */
}
</style>

In August, Jimmy Wylie and I presented at DEF CON'33 on Dragos' process for determining whether a given capability qualifies as "ICS-specific malware."

<center class="video-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/6U_CepoMSl4?si=FRzmDYQyY7Xs-iZu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
</center>

We presented a basic rubric for making the determination and include 3 example capabilities that I discovered while threat hunting and why - though they might look like it - they do not qualify as ICS malware.

Give it a listen!
