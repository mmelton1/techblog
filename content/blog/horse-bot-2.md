---
title: "Horse Bot – A discord bot and MySQL database hosted on AWS written in python (Part 2)"
draft: false
date: 2022-12-11T09:16:45.000Z
tags:
- aws
- python
- sql
external: false
---

**Summary:** Speed Star is a web based game where players race, train, and breed horses. In order to do well in races, it’s important for players to obtain the best horses on the market. Horses have numerous attributes that determine how well they’ll do in a race, including their speed, stamina, etc. However, the data to make educated decisions on which horses to buy and breed is only available through the UI on the game website, where it is difficult to navigate efficiently.

### Objective:

1. Create a tool that allows players to easily check the attributes of a horse.
2. Create a database that allows players to easily sort, filter, and compare horses.

**Objective 2:** *Create a database that allows players to easily sort, filter, and compare horses*
&nbsp;

In part 1, I explained how to obtain the data needed from the Speed Star website using python. My objective for part 2 is to store this data in a database to perform additional analysis.

To start, I needed a database to store all of the data that I’ll be pulling from the Speed Star website. Since I’m familiar with SQL, I created a MySQL database using the Amazon Relational Database Service (Amazon RDS) on AWS. Then, I remoted into the virtual machine I created from part 1 using SSH and ran the following python script to create a table on the database with the appropriate field names and data types:

```
import mysql.connector

#connect to db
db = mysql.connector.connect(
    host="speedstar-database.ctpajak0gfho.us-east-1.rds.amazonaws.com",
    user="admin",
    passwd="************",
    database="sys"
    )

CREATE TABLE horses (
    id INT,
    horse_name VARCHAR(10),
    rarity VARCHAR(10),
    sex VARCHAR(10),
    breed_current INT,
    breed_max INT,
    horse_class INT,
    fatigue INT,
    field_dirt INT,
    field_grass INT,
    field_clay INT,
    field_snow INT,
    speed_current INT,
    speed_max INT,
    stamina_current INT,
    stamina_max INT,
    dexterity_current INT,
    dexterity_max INT,
    intensity_current INT,
    intensity_max INT,
    gate_current INT,
    gate_max INT,
    temper_current INT,
    temper_max INT,
    level_current INT,
    level_max INT,
    experience INT,
    owner_address VARCHAR(50),
    pattern INT,
    popularity INT,
    is_genesis INT,
    created_at INT,
    PRIMARY KEY (ID)
);
```
&nbsp;

I then setup MySQL Workbench to connect to my database and verified that the table had all of the required fields. Next, I wanted to populate the table with data. To do this, I setup the below script to connect to the database then start a while loop to request the JSON data and write it to the database.

To test, I set my loop to start from horse ID 1 and end at horse ID 50. The script ran fine until I identified a particular horse ID that didn’t exist (error: “message”:”horse not found”). To get around this, I needed to implement a check to see whether I received the expected response for a given request. When I received this error, the script prints “Horse not found” and moves onto the next ID.

Once the script ignored IDs that didn’t have proper data, I was able to write all of the needed data to the database.

```
import requests
import json
import mysql.connector

#connect to db
db = mysql.connector.connect(
    host="speedstar-database.ctpajak0gfho.us-east-1.rds.amazonaws.com",
    user="admin",
    passwd="********",
    database="sys"
    )

#define message for horseNotFound
url = "https://app.speedstargame.com/api/ranches/horses/999999999999"
r = requests.get(url)
horseNotFound = json.loads(r.text)

#start at horse ID 1, run until horse ID 10000
count = 1
while count < 10000:
    print(count)
    
    #grab horse data, put into json
    url = "https://app.speedstargame.com/api/ranches/horses/" + str(count)
    r = requests.get(url)
    data = json.loads(r.text)
    if data == horseNotFound:
        print("Horse not found.")
        count += 1
        continue
    id = (data['id'])
    horse_name = (data['name'])
    rarity = (data['rarity'])
    sex = (data['sex'])
    breed_current = (data['breed']['count'])
    breed_max = (data['breed']['max'])
    horse_class = (data['status']['class'])
    fatigue = (data['status']['fatigue'])
    field_dirt = (data['attribute']['field']['dirt'])
    field_grass = (data['attribute']['field']['grass'])
    field_clay = (data['attribute']['field']['clay'])
    field_snow = (data['attribute']['field']['snow'])
    speed_current = (data['raceStatus']['speed']['value'])
    speed_max = (data['raceStatus']['speed']['capacity'])
    stamina_current = (data['raceStatus']['stamina']['value'])
    stamina_max = (data['raceStatus']['stamina']['capacity'])
    dexterity_current = (data['raceStatus']['dexterity']['value'])
    dexterity_max = (data['raceStatus']['dexterity']['capacity'])
    intensity_current = (data['raceStatus']['intensity']['value'])
    intensity_max = (data['raceStatus']['intensity']['capacity'])
    gate_current = (data['raceStatus']['gate']['value'])
    gate_max = (data['raceStatus']['gate']['capacity'])
    temper_current = (data['raceStatus']['temper']['value'])
    temper_max = (data['raceStatus']['temper']['capacity'])
    level_current = (data['level']['current'])
    level_max = (data['level']['maxLevel'])
    experience = (data['level']['experience'])
    owner_address = (data['ownerAddress'])
    pattern = (data['pattern'])
    popularity = (data['popularity'])
    is_genesis = (data['isGenesis'])
    created_at = (data['createdAt'])

#Write to database
    mycursor = db.cursor()
    mycursor.execute("REPLACE INTO horses (id, horse_name, rarity, sex, breed_current, breed_max, horse_class, fatigue, field_dirt, field_grass, field_clay, field_snow, speed_current, speed_max, stamina_current, stamina_max, dexterity_current, dexterity_max, intensity_current, intensity_max, gate_current, gate_max, temper_current, temper_max, level_current, level_max, experience, owner_address, pattern, popularity, is_genesis, created_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", (id, horse_name, rarity, sex, breed_current, breed_max, horse_class, fatigue, field_dirt, field_grass, field_clay, field_snow, speed_current, speed_max, stamina_current, stamina_max, dexterity_current, dexterity_max, intensity_current, intensity_max, gate_current, gate_max, temper_current, temper_max, level_current, level_max, experience, owner_address, pattern, popularity, is_genesis, created_at))
    db.commit()
    
    count += 1
    continue
```
&nbsp;

However, as I was testing the script I experienced another problem. Initially, I was using an “INSERT INTO” sql statement to write to my database. I realized this wouldn’t work well if I continuously ran the script, as it would fail if the ID already existed in the table. So, I changed the statement to “REPLACE INTO”, which allowed me to insert data if the record didn’t exist, or update all existing data if it already existed.

With those challenges behind me, I was able to create a full database of every horse in the game, as shown below. Using this data, I was able to efficiently perform analysis that wasn’t possible using the in-game UI:

![](assets/horsebot7.png)
&nbsp;

To conclude, the Horse Bot and associated Database was a fun and useful project that I learned many new skills from. I’ve stopped working on this project, but if I were to continue, I’d want to add the following features:

+ Automate the script that writes the data to the database so that the data refreshes daily
+ Create a website to act as a front end to the database using React