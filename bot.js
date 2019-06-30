var Discord = require('discord.js')
// var Discord = require('discord.io');
var logger = require('winston')
var auth = require('./auth.json')

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console,
{
    colorize: true
});

logger.level = 'debug'

// Initialize Discord Bot
// var bot = new Discord.Client({
//    token: auth.token,
//    autorun: true
// });

const bot = new Discord.Client()

bot.on('ready', function (evt) {
    logger.info('Connected')
    logger.info('Logged in as: ')
    logger.info(bot.username + ' - (' + bot.id + ')')
});

bot.on('ready', () => {
    // List servers the bot is connected to
    console.log("Servers:")
    bot.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
    })

})

bot.login(auth.token)


let player = {
    playerName: '',
    playerTimes: []
};

function Player(playerName, playerTimes) {
    this.playerName = playerName;
    this.playerTimes = playerTimes;
}

function playTimes() {
    this.players = [];
    this.initializedTime = '';
    this.initialized = false; 
}; 

const totalMinutes = 1440

var currentInstance = new playTimes();

var totalNumberOfPlayers = 0

var timeMatrix

var serverMembers = []

var numOfUsersWhoResponded = 0

function initializeMatrix(userLength) {
    timeMatrix = Array.from(Array(userLength), () => new Array(totalMinutes))

    // This is definitely an efficiency bootleneck. It would be better to fill
    // the array with False above instead of leaving them empty. 
    for (let x = 0; x < userLength; x++) {
        for(let y = 0; y < totalMinutes; y++) {
            timeMatrix[x][y] = false
        }
    }
}

const maxMinutes = 1440;

function getUsers(recievedMessage) {

    // As you get each member, put them into them into the array. 
    // This array will be used as a reference. In the matrix, the 
    // user at index i in memberIDs is the same user at index i in
    // the matrix. 
    let keys = Array.from(recievedMessage.guild.members.keys())

    for (let y = 0; y < keys.length; y++) {
        if(recievedMessage.guild.members.get(keys[y]).user.username != 'PlaytimeBot') {
            serverMembers.push(recievedMessage.guild.members.get(keys[y]).user.username)
            totalNumberOfPlayers++
        }
    }

    initializeMatrix(serverMembers.length)
    console.log(serverMembers)
};  

    // TODO
    // Convert the user to a value between 0 and maxUsers that's unique. 
    // Call this value x. 
function indexValue(user) {
    return 0;
}

function returnPlayTimes(channel) {
    var recommendedPlayTimes = givePlayTimes()

    //channel.send(recommendedPlayTimes)

    if(recommendedPlayTimes.lastIndexOf(true) == -1) {
        channel.send('It looks like there are no times where everyone can play :(')
    } else {
        var timesInRegularFormat = convertBackToTime(recommendedPlayTimes)

        channel.send('There are some possible playtimes!')

        channel.send(timesInRegularFormat)
    }
}

function convertMinutesToString(timeInMinutes) {
    var extraInfo
    var hours = Math.floor(timeInMinutes / 60)
    var minutes = timeInMinutes % 60

    if(timeInMinutes > 719 && timeInMinutes < 1381) {
        extraInfo = 'pm'
    } else {
        extraInfo = 'am'
    }

    return hours + ':' + minutes + extraInfo
}

// Converts the all minutes format array back to a readable format. 
function convertBackToTime(inMinutes) {
    var timeInRegularFormat = []
    var gotFirstValue = false
    var startTime = 0
    var finalTime = 0

    for(let i = 0; i < maxMinutes; i++) {
        if(inMinutes[i] == true && !gotFirstValue) {
            startTime = i
            gotFirstValue = true
        } else if(inMinutes[i] && gotFirstValue) {
            // the first value was already recorded, there's no reason to record another as the start
            // startTime = i
        } else if(!inMinutes[i] && gotFirstValue) {
            finalTime = i - 1

            timeInRegularFormat.push(convertMinutesToString(startTime) + '-' + convertMinutesToString(finalTime))

            gotFirstValue = false
            startTime = 0
            finaltime = 0
        }
    }
}

// Takes the timeMatrix and finds the common playtimes and stores them in an array
// of size maxMinutes which has each minute that everyone in the guild can play. 
function givePlayTimes() {
    var playTimes = [];

    for(i = 0; i < maxMinutes; i++) {
        if(timeMatrix[0][i] == false) {
            playTimes.push(false)
        } else {
            var flag = true
            for(j = 1; j < totalNumberOfPlayers && flag; j++) {
                if(timeMatrix[j, i] == false) {
                    playTimes.push(false) 
                    // I don't know if that is valid
                    flag = false
                    // j = totalNumberOfPlayers
                }
            }

            if(j == totalNumberOfPlayers) {
                playTimes.push(true)
            }

            // This isn't right :(
            // if(playTimes[i] === 'uninitialized') {
            //    playTimes.push(true)
            // }
        }
    }

    return playTimes
}

// Inserts all of the time between and including time1 and time2 for user into
// timeMatrix. 
function intoMatrix(time1, time2, user) {
    var x = indexValue(user); 

    for(let i = time1; i < time2; i ++) {
        timeMatrix[x][i] = true;
    } 
}

// Converts the time to an all minutes format with 12am being 0 minutes. 
// Example: 12:30am => 30
// Example: 6:30am => 390
function transformPlaytime(times, user) {
    var time1, time2, extra1, extra2, intTime1, intTime2;

    
        timeInterval = times;
        if(timeInterval.includes(':')) {
            timeInterval = timeInterval.replace(':', '');
        }

        if(timeInterval.includes(':')) {
            timeInterval = timeInterval.replace(':', '');
        }

        timeInterval = timeInterval.split('-');
        time1 = timeInterval[0];
        time2 = timeInterval[1];
        // This needs to be validated
        /* time1 = timeInterval.split(0, '-');
        time2 = timeInterval.split('-' + 1); */

        logger.info('First time1 ' +  time1);
        logger.info('First time2 ' +  time2);
        
        // extra1 = time1.splice(time1.length - 3, time1.length - 1);
        // extra2 = time2.splice(time2.length - 3, time2.length - 1);

        // time1 = time1.splice(time1.length - 3, time1.length - 1);
        // time2 = time2.splice(time2.length - 3, time2.length - 1);

        extra1 = time1.slice(time1.length - 2, time1.length);
        extra2 = time2.slice(time2.length - 2, time2.length);

        time1 = time1.slice(0, time1.length - 2);
        time2 = time2.slice(0, time2.length - 2);

        intTime1 = parseInt(time1, 10);
        intTime2 = parseInt(time2, 10);

        if((extra1 == 'pm' || extra1 == 'PM') && intTime1 < 1200) {
            intTime1 += 1200
        }

        if((extra2 == 'pm' || extra2 == 'PM') && intTime2 < 1200) {
            intTime2 += 1200
        }

        if((extra1 == 'am' || extra1 == 'AM') && intTime1 >= 1200) {
            intTime1 = intTime1 % 100;
            logger.info("HERE: " + intTime1);
        }

        if((extra2 == 'am' || extra2 == 'AM') && intTime2 >= 1200) {
            intTime2 = intTime2 % 100;
        }

        // Converts the time to an all minutes format with 12am being 0 minutes. 
        // Example: 12:30am => 30
        // Example: 6:30am => 390

        intTime1 = (intTime1 % 100) + (Math.floor(intTime1 / 100) * 60); 
        intTime2 = (intTime2 % 100) + (Math.floor(intTime2 / 100) * 60);

        logger.info('Final time1 ' + intTime1);
        logger.info('Final time2 ' +  intTime2);

        intoMatrix(intTime1, intTime2, user);
};

function extractTimes(args, user) {
    for(x = 1; x < args.length; x++) {
        transformPlaytime(args[x], user);
    }
    console.log(timeMatrix)
};

/*
    There are several commands for the bot. 
    !playtime: Ask the playtime bot to get playtimes from the user. It can specify 
               a subset of users if not everyone in the server is going to play. 
    !no: The user who enters this command cannot play during that day
    !times: The user who enters this command is giving the time(s) that 
            they can play.
    !timesup: Force the bot to return the results that have been given before the time
              limit has expired. 
*/
// bot.on('message', function (user, userID, channelID, message, evt) {

bot.on('message', (recievedMessage) => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`

    var message = recievedMessage.content;

    if (message.substring(0,1) == '!') {
        var args = message.substring(1).split(' ')
        var cmd = args[0]
       
        //This uncommented out removed the first item in args, I think. I'm not sure,
        //it was boilerplate code from a tutorial. 
        //args = args.splice(1);
        switch(cmd) {
            // !ping
            // if args[1] is not empty, go through the arguments getting the names
            // of all the users you want to include. 
            case 'playtime':
                if(currentInstance.initialized == false) {
                    // getUsers(channelID, bot.guilds);

                    // Correctly returns TheConArtist
                    // console.log(recievedMessage.guild.members.get('385889455317450761').user.username)

                    getUsers(recievedMessage)//recievedMessage.channel.id, recievedMessage.guild.id, recievedMessage.channel)

                    let x = recievedMessage.guild.members.random.toString

                    recievedMessage.channel.send(recievedMessage.author + ' wants to play! What times can everyone join in today?\n\nResponse options:\n\n!no: This indicates that you cannot play today.\n!times: This means you are giving me the times you can play and then follow this command with the times you can play. You can enter them in this format:\n\n\"!times 12:30pm-2:00pm 4:00pm-5:30pm"')

                    var currentDate = new Date()
                    var time = currentDate.getTime()

                    currentInstance.initialized = true

                    //TODO
                    // If the number of players was represented in the arguments, put it 
                    // in the playtime instance. 
                    // args.length != 1
                    if(args.length != 1) {
                        if(!isNaN(args[1])) { 
                            currentInstance.players = args[1]

                        } else {
                            
                        }
                    } 
                } else {
                    recievedMessage.channel.send('A playtime check has already started. You cannot start another one until the current one is closed.')
                }

            break;

            case 'no':
                if (currentInstance.initialized == false) {
                    recievedMessage.channel.send('I am sorry that you cannot join us ' + recievedMessage.author)

                    //TODO
                    //Indicate in currentInstance that user cannot play. Maybe leave their
                    //times as false. 

                    numOfUsersWhoResponded++
                    // Maybe I can remove the person from the matrix..


                } else {
                    recievedMessage.channel.send('I am sorry that you cannot join us ' + recievedMessage.author)
                }
            break;

            case 'forceStop':
                if (currentInstance.initialized) {
                    returnPlayTimes(recievedMessage.channel)

                    totalNumberOfPlayers = 0
                    currentInstance.initialized = false
                } else {
                    recievedMessage.channel.send('Sorry, but a playtime needs to be initiated before you can call that command.')
                }
            break;

            case 'times':
                // TODO:
                // Add a condition to check to make sure that the author hasn't already answered. 
                extractTimes(args, recievedMessage.author)
                recievedMessage.channel.send('Thank you, ' + recievedMessage.author + '! Your times have been recorded.')
                numOfUsersWhoResponded++
                if(numOfUsersWhoResponded == totalNumberOfPlayers) {
                    returnPlayTimes(recievedMessage.channel)

                    totalNumberOfPlayers = 0
                    numOfUsersWhoResponded = 0
                    currentInstance.initialized = false
                    serverMembers = []
                }

                // recievedMessage.channel.send('totalNumberOfPlayers ' + totalNumberOfPlayers)
                // recievedMessage.channel.send('numOfUsersWhoResponded ' + numOfUsersWhoResponded)

            break; 
        }
    }
});
