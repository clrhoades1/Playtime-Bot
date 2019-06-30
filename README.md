****
## DO NOT USE THIS BOT!
**For some reason this bot is sending out spam at random times, even when inactive. I am working on figuring out why**
****
**THIS REPOSITORY IS CURRENTLY A WORK IN PROGRESS! IF YOU HAPPEN TO FIND THIS REPO BEFORE THIS WAS DELETED, KNOW THAT THERE ARE PLENTY OF BUGS IN THE CODE AND THAT YOU SHOULDN'T USE THIS BOT AS OF YET**
****


# Playtime Bot



Welcome to the Playtime Bot repository! Playtime Bot is a Discord bot whose designed to receive the times in which each player in the guild can play within the day it is activated and then return the times in which each user can play. This way people don't need to fumble around with figuring out when everyone can play, Playtime Bot does it for you!

If you are unfamiliar with deploying a Discord bot on a server, check out [FILL IN] for information. 

## How to use the bot

Playtime bot uses several commands:
* **!playtime**
* **!times**
* **!no**
* **!timesup**

### !playtime
This command is used to get the bot to start recording times from everyone in the guild. It cannot be used again until everyone has responded with the times in which they can play.

### !times
This command is used to tell the bot that you are sending the times in which you can play. It requires a special format to receive the times which is specified when !playtime is sent.

### !no
This command tells the bot that the user who sent it is unable to play. 

### !timesup
If you want to stop the bot from recording times and have it return the times from the users that have responded, use this to stop the bot. 

## Requirements

* Discord.js
* NPM

## Future Features 
* Instead of it getting the times within the day it is deployed, have it calculate the times within the 24 hours it's deployed. 
* Add a command for stopping the bot without returning any times
