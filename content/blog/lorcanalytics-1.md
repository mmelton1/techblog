---
title: "Lorcanalytics - A full stack trading card game project (Part 1)"
draft: false
date: 2023-08-15
tags:
- python
- mysql
- azure
- git
- social media
external: false
---

**Summary:** Lorcana is a Disney trading card game created by Ravensburger. An important aspect to many collectors of trading card games is knowledge about card price trends. As Lorcana is a new game released in August 2023, there were no tools available to access data related to price trends.

### Objective:

1. Build a presence on social media and automate posts for card price analysis.
2. Create a website which allows for people to view price analysis and trends for cards.

**Objective 1:** *Build a presence on social media and automate posts for card price analysis*

To start, I first thought about what I'd need in order to accomplish my goal. I knew I needed the following capabilities:

1. Accessing pricing data for every Lorcana card
2. Storing data in a database
3. Automating and executing scripts


#### 1. Accessing pricing data for every Lorcana card
I decided to base the card pricing data off of [TCG Player's](https://www.tcgplayer.com/) pricing, as it is one of the most popular marketplaces for trading card games. Also, they offered API access to TCG parters. Next, I reached out to their team and filled out the necessary paperwork. After some time, I was accepted into the TCG Player affiliate program, which allowed me to earn commission on sales I referred to their website. More importantly, I received API access.

With my new API keys in hand, I got to work testing and understanding the TCG player API endpoints. I decided to use Python, as it's a language I'm comfortable with. The first script I wrote was a way to obtain an access token that I could use to make API requests. Then, I identified which endpoints I needed in order to pull a list of every TCG product I wanted to track prices for, as well as the endpoint I needed in order to access pricing data for each product. 

At this point, I was able to access all of the data I needed, but I needed somewhere to store it.

#### 2. Storing data in a database
For a database, I decided to use a Azure Database for MySQL flexible server, as it's low cost and requires minimal upkeep and configuration. Once the database was stood up, I used the mysql.connector for Python in order to connect to my database. 

#### 3. Automating and executing scripts

-docker
-GO
-rest API
-