---
author: Sam Hanson
pubDatetime: 2025-09-20T22:05:22.042Z
modDatetime: 2025-09-20T22:05:22.042Z
title: The Bot(net) that Got Away
slug: the-botnet-that-got-away
featured: true
draft: false
tags:
  - Distributed Denial of Service (DDoS)
  - Botnet
description: A fun surprise in early August - this website was the target of a DDoS attack! It wasn't very effective, it didn't take my website down nor did I notice at the time.
---

I was at DEF CON preparing for my upcoming talk "[Don't Cry Wolf - Evidence Based Assessments of ICS Threats](https://media.defcon.org/DEF%20CON%2033/DEF%20CON%2033%20villages/DEF%20CON%2033%20-%20ICS%20Village%20-%20Wylie%20Hanson%20-%20Dont%20Cry%20Wolf.pdf)" when I thought to log into my website's hosting provider and check some traffic metrics. Expecting to see the usual meager statistic of 600 visitors in the last week, my jaw nearly dropped when I saw a surprising number: <i><b>350,000 visitors in about two hours.</b></i>
<br><br>

<div>
  <figure>
  <img src="/assets/pageviews_over_week.png" alt="356,000 page views in two hours">
  <center><figcaption>356,000 page views in about two hours</figcaption></center>
  </figure>
</div>

I checked the number of unique visitors and it was immediately suspicious. ~700 visitors for ~350,000 requests?

<div>
  <figure>
  <img src="/assets/unique_visitors_count.png" class="sm:w-1/2 mx-auto" alt="696 unique visitors for 356,000 requests">
  <center><figcaption>696 unique visitors for 356,000 requests</figcaption></center>
  </figure>
</div>

<div>
  <figure>
  <img src="/assets/top_locations_by_request.png" class="sm:w-1/1 mx-auto" alt="Requests broken down by geolocation">
  <center><figcaption>Request geolocations</figcaption></center>
  </figure>
</div>

## Data Collection and Dead Ends

Unfortunately, my hosting provider does not automatically collect visitor information. Consequently, I had very little to initially investigate. However, I emailed Netlify, hoping they may have additional answers. They got back to me (s/o Netlify!) - and after some back and forth, they provided me with a list of the top 10 or so IP addresses by request count along with the top user agents.

<div>
  <figure>
  <img src="/assets/netlify_email_ddos_user_agent.png" class="sm:w-3/4 mx-auto" alt="Netlify email confirming DDoS">
  <center><figcaption>Lmao, this makes it pretty clear.</figcaption></center>
  </figure>
</div>

|   IP address   | Request Count |
| :------------: | :-----------: |
|  103.116.9.4   |     3989      |
| 213.194.64.194 |     3528      |
| 78.108.182.63  |     3121      |
| 51.79.166.152  |     2966      |
| 103.154.77.110 |     2598      |
| 103.154.77.104 |     2476      |
| 145.239.94.103 |     2280      |
| 170.81.241.14  |     2142      |
|  92.45.71.146  |     2070      |
| 85.163.10.163  |     2045      |

While the full list of 700 IPs would've been better, I gotta hand it to Netlify's customer support. They were significantly more helpful than I had expected.

Unfortunately, I have not been able to tie this activity to any specific botnet. I would've considered the possibility of a poorly programmed, gone awry scanner as a explanation, but the DDoS user agent string certainly seems to indicate otherwise. Researchers or analysts who come across similar activity or overlaps with the above indicators - please reach out over LinkedIn.

<img href=""></img>
