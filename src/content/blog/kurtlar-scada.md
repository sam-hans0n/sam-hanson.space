---
author: Sam Hanson
pubDatetime: 2025-03-23T16:05:22.042Z
modDatetime: 2025-02-23T16:05:22.042Z
title: The Story of KurtLar_SCADA.exe
slug: kurtlar-scada
featured: true
draft: false
tags:
  - Malware Analysis
  - VNC
  - Hacktivism
description: Check out my research in uncovering and analyzing a malware named KurtLar_SCADA.exe, a VNC remote access capability targeting Internet-exposed and poorly secured industrial HMIs. This research was covered in a webinar hosted by SANS ICS. Big thanks to them for having me!
---

# From Malware Discovery to Victim Notification

Check out my [SANS ICS webcast](https://www.sans.org/webcasts/story-kurtlar-scada-malware-discovery-victim-disclosure/)!

<br>

## Introduction

Part of my responsibilities at Dragos include threat hunting in public malware repositories such as VirusTotal. During an investigation into ICS/OT related filenames submitted from geopolitical hot bed zones, one file immediately caught my eye.

<div>
  <figure>
  <img src="/assets/kurtlar_logo.png" class="sm:w-1/2 mx-auto" alt="KurtLar CLI Logo">
  <center><figcaption>KurtLar_SCADA's "Big Scary" Logo</figcaption></center>
  </figure>
</div>

I will cover in more detail below, but this binary is essentially a VNC client application with basic brute forcing capabilities. Provided a list of IP addresses, KurtLar_SCADA attempts connection of each one. If authentication is required, KurtLar_SCADA will brute force the credentials with a small list of default credentials hardcoded in the binary. Once successfully authenticated, the tool takes a screenshot and saves it, proving it has access to the system.

<div>
  <figure>
  <img src="/assets/KurtLar_SCADA_Execution_Flow.png" class="sm:w-3/4 mx-auto" alt="KurtLar CLI Logo">
  <center><figcaption>KurtLar_SCADA Execution Flow - <a href="https://hub.dragos.com/hubfs/312-Year-in-Review/2025/Dragos-2025-OT-Cybersecurity-Report-A-Year-in-Review.pdf?hsLang=en">Dragos 2025 YiR</a></figcaption></center>
  </figure>
</div>

## The Telegram Channel

During investigation, we discovered a Telegram channel advertising their tools, exploits, database dumps, hacking courses, and more. The administrator behind the channel boasts pro-Iranian and anti-Western ideology, expressing their interest in hacking US or Israeli industrial systems (even offering discounts to those targeting USA/IL).

Here's one of their Telegram messages advertising their tool:

<div>
  <figure>
  <img src="/assets/kurtlar_ad.png" class="sm:w-1/2 mx-auto"  alt="KurtLar CLI Logo">
  <center><figcaption>Advertisement of the tool</figcaption></center>
  </figure>

To prove their tool works, they provide multiple screenshots of compromised HMI screens, as demonstrated by the following US-based HMI:

  <figure>
  <img src="/assets/us_oil_hmi.png" class="sm:w-1/2 mx-auto" alt="KurtLar CLI Logo">
  <center><figcaption>Compromised, US-based Oil HMI</figcaption></center>
  </figure>

There's even a video of the developers using and compromising HMIs:

  <figure>
    <video width="700" height="450" controls> <source src="/assets/kurtlar_scada_demo.MP4" type="video/mp4" class="sm:w-1/2 mx-auto"/>
    </video>
    <center><figcaption>Warning: loud, obnoxious hacker music</figcaption></center>
  </figure>
</div>

<br><br>

## Malware Analysis of a Compiled Python Binary

Analyzing the malware was a unique challenge. KurtLar_SCADA is written in Python3.12, then compiled into a Windows binary via PyInstaller. For readers unfamiliar with compiled python, this is a mechanism to bundle the CPython interpreter with Python bytecode (an intermediate representation of your original source code). Fortunately, compiled python binaries can be decompiled into original Python source code, no IDA Pro license necessary!

<div>
  <figure>
  <img src="/assets/typical-decompilation-process.png" class="sm:w-1/2 mx-auto" alt="Typical Decompiation Process Flow">
  <center><figcaption>Typical Compiled Python Decompilation Process of a PyInstaller Generated Binary</figcaption></center>
  </figure>
</div>

Unfortunately, since it's Python3.12, there's quite literally not a single decompilation tool available that covers Python3.10+. However, this does not mean we are completely stuck.

Using `pycdas`, a sibling tool to `pycdc`, we can obtain the bytecode's disassembly which enables (painful) static analysis of the bytecode (similar to traditional static analysis of x86). There are some obfuscation layers to defeat, however most (except for symbol obfuscation) are trivial.

### Defeating Obfuscation Layers

In one of the binaries, a marshalled Python code object is used to hide the contents from detections capabilities like Yara. Here's an example of what this looks like:

```py
import marshal

min = b'\xe3\x00\x00\x00<PYTHON_BYTECODE>\xde\x01\x00\x00'
ob = marshal.loads(min)
exec(ob)
```

Essentially, this script embeds another Python script inside of it - the `min` variable contains the payload to be executed on line 6. This is easily defeated by modifying the script to instead format the bytecode into a valid PYC file representation and simply writing to disk:

```py
import marshal
import importlib

min = b'\xe3\x00\x00\x00<PYTHON_BYTECODE>\xde\x01\x00\x00'
ob = marshal.loads(min)
#exec(ob) # ALWAYS COMMENT THIS LINE OUT!
bytecode = importlib._bootstrap_external._code_to_timestamp_pyc(ob)
with open("./kurtlar_scada.pyc", "wb") as pyc_file:
    f.write(bytecode)
```

Using a combination of static analysis of the bytecode disassembly, as well as leveraging LLMs like ChatGPT/PyLingual, we can slowly decipher it's execution flow. Perhaps in a future blog I will cover compiled python and bytecode more in detail, but for another day!

<br>

## Alerting the Victims

Leveraging Dragos' OT-CERT, we made contact with CISA and a couple other external parties. Through these relationships, we informed 3 victims of their compromised, exposed, and poorly secured assets. The responses ranged from gratitude (and further leveraging CISAs services) to indifference. 'Tis the name of the game, you can lead a horse to water but you can't force it to drink.

<br>

## Conclusion

KurtLar_SCADA is another example of low-skilled, opportunistic hacktivists leveraging "low-hanging fruit" techniques. This is a threat the should <i>not</i> be hyped. However, these techniques are still effective if you leave HMIs exposed to the internet and poorly secured. Please use a VPN, do not port forward remote access services like VNC.

This type of activity could be reduced significantly if vendors were incentivized to care about security. One of vendors who produced the software which was compromised by KurtLar_SCADA had this to say on their VNC security page...

<div>
  <figure>
  <img src="/assets/vnc-security-lol.png" class="sm:w-1/1 mx-auto">
  <center><figcaption>Vendor's VNC Security Page...Yikes</figcaption></center>
  </figure>
</div>

Folks - <i>please so demand.</i>
