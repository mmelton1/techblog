---
title: "Horse Bot – A discord bot and MySQL database hosted on AWS written in python (Part 1)"
draft: false
date: 2022-12-09
tags:
- aws
- python
external: false
---

**Summary:** Speed Star is a web based game where players race, train, and breed horses. In order to do well in races, it’s important for players to obtain the best horses on the market. Horses have numerous attributes that determine how well they’ll do in a race, including their speed, stamina, etc. However, the data to make educated decisions on which horses to buy and breed is only available through the UI on the game website, where it is difficult to navigate efficiently.

test

### Objective:

1. Create a tool that allows players to easily check the attributes of a horse.
2. Create a database that allows players to easily sort, filter, and compare horses.

**Objective 1:** *Create a tool that allows players to easily check the attributes of a horse*

First, I needed a way to obtain data about each horse. I went to the Speed Star game website where it displayed horses. By opening a network inspect window and filtering by “api”, I was able to identify a URL which listed all of the data I needed in JSON format.

![](/src/assets/horsebot4.png)
&nbsp;

I verified that I was able to access data for any horse by simply changing the last digits in the URL.

![](/src/assets/horsebot5.png)
&nbsp;

However, the data wasn’t very readable. So, I used a JSON formatter to clean up the data. I then took note of all of the data points I was interested in, as I would need these later.

![](/src/assets/horsebot6.png)
&nbsp;

Great! Now that I knew where my data was, I wanted to view it using Python. On my local machine, I used the following script to map out the data and verify that I was seeing the values I expected by printing it to the console:

```
import requests
import json

url = "https://app.speedstargame.com/api/horses/6077"
r = requests.get(url)
data = json.loads(r.text)

#info
print("Info:")
print(data['popularity'])
print(data['ownerAddress'])
print(data['breeder'])
print(data['sex'])
print(data['rarity'])
print(data['id'])
print(data['isGenesis'])

#level
print("Level:")
print(data['level']['current'])
print(data['level']['maxLevel'])

#parts
print("Parts:")
print(data['parts']['body']['rarity'])
print(data['parts']['ear']['rarity'])
print(data['parts']['leg']['rarity'])
print(data['parts']['hair']['rarity'])
print(data['parts']['mane']['rarity'])
print(data['parts']['tail']['rarity'])
print(data['parts']['hoof']['rarity'])
print(data['parts']['eye']['rarity'])

#stats
print("Stats:")
print(data['raceStatus']['speed']['value'])
print(data['raceStatus']['speed']['capacity'])
print(data['raceStatus']['stamina']['value'])
print(data['raceStatus']['stamina']['capacity'])
print(data['raceStatus']['dexterity']['value'])
print(data['raceStatus']['dexterity']['capacity'])
print(data['raceStatus']['intensity']['value'])
print(data['raceStatus']['intensity']['capacity'])
print(data['raceStatus']['gate']['value'])
print(data['raceStatus']['gate']['capacity'])
print(data['raceStatus']['temper']['value'])
print(data['raceStatus']['temper']['capacity'])

#Attributes
print("Attributes:")
print(data['attribute']['field']['dirt'])
print(data['attribute']['field']['grass'])
print(data['attribute']['field']['clay'])
print(data['attribute']['field']['snow'])

#Breed
print(data['breed']['count'])
print(data['breed']['max'])
```
&nbsp;

Now that I was able to pull data for any horse, the next step was to make the data easily readable and accessible. People that play Speed Star generally use Discord (a messaging/chat room app) to discuss the game. I decided to create a bot that would connect to the discord server and pull data on request.

I began by importing the required libraries, including discord, requests, and json. I also needed commands from discord.ext so that the bot could listen for specific commands. To make it simple, I configured the bot to respond to anyone that typed “!horse ####” into the chat (the #### would be the ID of the horse that the player wanted to view).

```
import discord
from discord.ext import commands
import requests
import json

#Define command preset for discord
client = commands.Bot(command_prefix="!")

#Define command for discord
@client.command()
async def horse(ctx, *, search):

#Display a message when the bot is online and ready
@client.event
async def on_ready():
    print('\n{0.user} is online.'.format(client))

#Run the bot
client.run('***************')
```
&nbsp;

Now that the bot can respond to commands, I used the script from early to request horse data from the Speed Star website and put each point of data into a variable.

Unfortunately, the data I was requesting only displayed the value of a given attribute, and not the maximum value. For example, it’s useful to the player to not only know that a horse has 50 speed, but that it could potentially grow to 100 speed. To get around this, I defined three variables for each attribute; one for the current value, one for the maximum value, and another to display both values in a string.

To make things more complicated, a horse can have one of five rarities. Each rarity has a different maximum value for its stats, so I needed to put these values into a variable and display them based on the horse’s rarity. Here’s what the code looks like to request data from a given horse:

```
#Define URLs
url = "https://app.speedstargame.com/api/ranches/horses/" + search

#Load JSON data from speed star website
r = requests.get(url)
data = json.loads(r.text)

#Define json variables
id = (data['id'])
urlImg = str(img) + str(id) + "placeholder.png"
popularity = (data['popularity'])
sex = (data['sex'])
rarity = (data['rarity'])
level_current = (data['level']['current'])
level_max = (data['level']['maxLevel'])
level = '/'.join([str(level_current), str(level_max)])
breed_current = (data['breed']['count'])
breed_max = (data['breed']['max'])
breed = '/'.join([str(breed_current), str(breed_max)])
speed_current = (data['raceStatus']['speed']['value'])
speed_max = (data['raceStatus']['speed']['capacity'])
speed = '/'.join([str(speed_current), str(speed_max)])
stamina_current = (data['raceStatus']['stamina']['value'])
stamina_max = (data['raceStatus']['stamina']['capacity'])
stamina = '/'.join([str(stamina_current), str(stamina_max)])
dexterity_current = (data['raceStatus']['dexterity']['value'])
dexterity_max = (data['raceStatus']['dexterity']['capacity'])
dexterity = '/'.join([str(dexterity_current), str(dexterity_max)])
intensity_current = (data['raceStatus']['intensity']['value'])
intensity_max = (data['raceStatus']['intensity']['capacity'])
intensity = '/'.join([str(intensity_current), str(intensity_max)])
gate_current = (data['raceStatus']['gate']['value'])
gate_max = (data['raceStatus']['gate']['capacity'])
gate = '/'.join([str(gate_current), str(gate_max)])
temper_current = (data['raceStatus']['temper']['value'])
temper_max = (data['raceStatus']['temper']['capacity'])
temper = '/'.join([str(temper_current), str(temper_max)])
stats_current = speed_current + stamina_current + dexterity_current + intensity_current + gate_current + temper_current
stats_max = speed_max + stamina_max + dexterity_max + intensity_max + gate_max + temper_max
stats = '/'.join([str(stats_current), str(stats_max)])
field_dirt = (data['attribute']['field']['dirt'])
field_grass = (data['attribute']['field']['grass'])
field_clay = (data['attribute']['field']['clay'])
field_snow = (data['attribute']['field']['snow'])
owner_address = (data['ownerAddress'])
breeder = (data['breeder'])
is_genesis = (data['isGenesis'])
pattern = (data['pattern'])
breed_at = (data['breedAt'])
fatigue = (data['status']['fatigue'])

#Max stats and popularity for first genesis horses
common_max_stats = 571
common_max_popularity = 40
rare_max_stats = 679
rare_max_popularity = 60
super_max_stats = 749
super_max_popularity = 140
hyper_max_stats = 849
hyper_max_popularity = 200
exotic_max_stats = 860
exotic_max_popularity = 280
all_max_stats = 860
all_max_popularity = 280

#Select current_stats to compare based on horses of the same rarity
compare_stats_rarity = 0
if str(rarity) == "common": compare_stats_rarity = common_max_stats
if str(rarity) == "rare": compare_stats_rarity = rare_max_stats
if str(rarity) == "super": compare_stats_rarity = super_max_stats
if str(rarity) == "hyper": compare_stats_rarity = hyper_max_stats
if str(rarity) == "exotic": compare_stats_rarity = exotic_max_stats
#compare_stats_rarity = str(round(compare_stats_rarity,2)) + "%"

#Select current_popularity to compare based on horses of the same rarity
compare_popularity_rarity = 0
if str(rarity) == "common": compare_popularity_rarity = common_max_popularity
if str(rarity) == "rare": compare_popularity_rarity = rare_max_popularity
if str(rarity) == "super": compare_popularity_rarity = super_max_popularity
if str(rarity) == "hyper": compare_popularity_rarity = hyper_max_popularity
if str(rarity) == "exotic": compare_popularity_rarity = exotic_max_popularity
#compare_popularity_rarity = str(round((100-compare_popularity_rarity),2)) + "%"

#Select current_stats to compare based on all horses
compare_stats_all = all_max_stats
#if str(rarity) == "common": compare_stats_all = stats_max/all_max_stats
#if str(rarity) == "rare": compare_stats_all = stats_max/all_max_stats
#if str(rarity) == "super": compare_stats_all = stats_max/all_max_stats
#if str(rarity) == "hyper": compare_stats_all = stats_max/all_max_stats
#if str(rarity) == "exotic": compare_stats_all = stats_max/all_max_stats
#compare_stats_all = str(round((100-compare_stats_all),2)) + "%"

#Select current_popularity to compare based on all horses
compare_popularity_all = all_max_popularity
#if str(rarity) == "common": compare_popularity_all = popularity/all_max_popularity
#if str(rarity) == "rare": compare_popularity_all = popularity/all_max_popularity
#if str(rarity) == "super": compare_popularity_all = popularity/all_max_popularity
#if str(rarity) == "hyper": compare_popularity_all = popularity/all_max_popularity
#if str(rarity) == "exotic": compare_popularity_all = popularity/all_max_popularity
#compare_popularity_all = str(round((100-compare_popularity_all),2)) + "%"

embed=discord.Embed(
title="Horse #" + search, 
url="https://app.speedstargame.com/inventory/horses/" + id, 
#description = "Horse #" + str(id) + " has better max stats than **" + str(compare_stats_rarity) + "** of horses with the same rarity, and better popularity than **" + str(compare_popularity_rarity) + "** of horses with the same rarity. Horse #" + str(id) + " has better max stats than **" + str(compare_stats_all) + "** of all horses, and better popularity than **" + str(compare_popularity_all) + "** of all horses.",
color = current_color)

embed.set_thumbnail(url=urlImg)
embed.add_field(name="Info: ", value="```" + "ID: " + str(id) + "\n" "Rarity: " + str(rarity) + "\n" + "Sex: " + str(sex) + "\n"  + "Popularity: " + str(popularity) + "\n"  + "Level: " + str(level) + "\n" "Breed: " + str(breed) + "\n" "Fatigue: " + str(fatigue) + "```" , inline=False) 
embed.add_field(name="Stats", value="```" + "Stats: " + str(stats) + "\n" + "Stamina: " + str(stamina) + "\n" + "Speed: " + str(speed) + "\n" + "Dexterity: " + str(dexterity) + "\n" + "Intensity: " + str(intensity) + "\n" + "Gate: " + str(gate) + "\n" + "Temper: " + str(temper) + "```", inline=True)    
embed.add_field(name="Attributes", value="```" + "Dirt: " + str(field_dirt) + "\n" + "Grass: " + str(field_grass) + "\n" + "Clay: " + str(field_clay) + "\n" + "Snow: " + str(field_snow) + "```", inline=True)
embed.add_field(name="Stat Comparison", value="```" + "Stats max: " + str(stats_max) + "\n" + "Stats max (same rarity): " + str(compare_stats_rarity) + "\n" + "Stats max (all horses): " + str(compare_stats_all) + "\n" + "Popularity: " + str(popularity) + "\n" + "Popularity (same rarity): " + str(compare_popularity_rarity) + "\n" + "Popularity (all horses): " + str(compare_popularity_all) + "```", inline=False)    
embed.add_field(name="Misc: ", value="```" + "Owner: " + str(owner_address) + "\n" + "Genesis: " + str(is_genesis) + "\n"  + "Breed at: " + str(breed_at) + "\n"  "Pattern: " + str(pattern) + "```", inline=False) 
embed.set_footer(text="Note: As of now, stat and popularity comparisons are based off of ~9,000 genesis horses")

await ctx.send(embed=embed)
```
&nbsp;

At this point, if a user were to type “!horse 3333” into the chat, they’d see the following:

![](/src/assets/horsebot3.png)
&nbsp;

That works well enough, but I wanted to make it look more presentable and provide more value. So, I improved the formatting, added an image of the horse instead of a placeholder, and performed some data analysis to display at the top of the response. Using this bot, a player would be able to tell how a given horse stacks up against the others with ease:

![](/src/assets/horsebot2.png)
&nbsp;

I didn’t want to continue hosting the bot on my local machine, so I decided to host it in the cloud. This would allow people to use the bot anytime as it would always be running. I wanted to get exposure to AWS, so I signed up for an account and performed the following steps (note: the documentation for this section is limited as I no longer have access to this account):

+ Create a virtual machine
+ Install python
+ Upload python script for bot
+ Create a cron script to start the discord bot automatically if the server ever restarts
&nbsp;

Finally, you can see the completed project below. A user is able to type “!horse ####” into the discord chat and the bot responds with the requested data. My first objective for this project is complete, I’ll explain the second in Part 2.

![](/src/assets/horsebot1.png)