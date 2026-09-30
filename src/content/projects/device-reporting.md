---
title: "Automated device reporting"
summary: "An automated, company-wide device report built with Python and Power BI."
stack: ["Python", "Power BI", "REST API"]
featured: true
draft: true
publishDate: 2025-11-01
---

**Summary:** When working with acquisitions, we use an RMM (a remote monitoring and management tool) to manage the acquired company's computers. Reporting on those devices used to mean running reports and scripts by hand, and the results depended on who ran them and when. I built an automated device report in Python and Power BI, and published it with our IT operations team as a company-wide app.

## Objectives:

1. Replace the manual script process with a device report that stays current on its own.
2. Cut down on the scripts analysts ran by hand to check individual devices.

**Objective 1:** _Replace the manual script process with a device report that stays current on its own_

### Building the device report

The old process worked, but it wasn't consistent. Each time someone needed a picture of an acquired company's devices, they ran reports and scripts against the RMM themselves, so two people could end up with two different answers.

First, I wrote a Python script that pulls the device data from the RMM's API. Then, I built a Power BI report on top of that data, so the numbers refresh without anyone having to run anything. Once it was working, I partnered with our IT operations team to publish it as a company-wide app.

**Objective 2:** _Cut down on the scripts analysts ran by hand to check individual devices_

### Adding custom fields to the RMM

Analysts on my team were also running the same scripts over and over to check individual devices during discovery. To cut that down, I built a custom dashboard in the RMM with scripted fields that show whether a device has a backup agent, which drives are mapped, whether the disk is encrypted, which user profiles are on it, and whether endpoint protection is running. That information now shows up on its own, instead of someone running a script to find it.

Along the same lines, I added the last logged-in user for each device to our software inventory report. That let business analysts pick the right people for user acceptance testing without having to ask the acquired company.
