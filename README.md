**This bot is operational, but in its early stages.**
****


# Playtime Bot



Welcome to the Playtime Bot repository! Playtime Bot is a Discord bot who is designed to receive the times in which each player in the guild can play, within the day it is activated, and then return the times in which all users can play. This way people don't need to fumble around with figuring out when everyone can play, Playtime Bot does it for you!

Once you've downloaded this repo, if you are unfamiliar with deploying a Discord bot you have two options:
1. You can simply navigate to the downloaded directory and run `node bot.js`. If you want the bot to be operating 24/7, that means you must keep the bot running on your computer and have it connected to the internet constantly. 
2. You can deploy the bot on a server like Amazon EC2, though you will need to look into how to get it running. Alternatively, a Raspberry Pi should be a subtle alternative especially if you happen to have one lying about. 


## How to use the bot

Playtime bot uses several commands:
* **!playtime**
* **!times**
* **!no**
* **!timesup**
* **!forceStop**

### !playtime
This command is used to get the bot to start recording times from everyone in the guild. It cannot be used again until everyone has responded with the times in which they can play.

### !times
This command is used to tell the bot that you are sending the times in which you can play. It requires a special format to receive the times which is specified when !playtime is sent.

### !no
This command tells the bot that the user who sent it is unable to play. 

### !timesup
If you want to stop the bot from recording times and have it return the times from the users that have responded, use this to stop the bot. 

### !forceStop
This command tells the bot to stop recording times from users and return the results from the users that have answered. 

## Requirements

* Discord.js
  * This needs to be installed either in the directory locally or on the computer that runs the bot globally.
* NPM

## Future Features 
* Instead of it getting the times within the day it is deployed, have it calculate the times within the 24 hours it's deployed. 
* Add a command for stopping the bot without returning any times.
