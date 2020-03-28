//import dependencies 
const Discord = require('discord.js');
const client = new Discord.Client();
const {
   prefix,
   token,
} = require('./config.json');
const ytdl = require('ytdl-core');
const fetch = require('node-fetch');


//map of times and song url
let ACM = new Map();
ACM.set("0am animal crossing new horizons", "https://youtu.be/OW36kFCHdQ4");  //normal music
ACM.set("1am animal crossing new horizons", "https://youtu.be/I9j_PrSn38A");
ACM.set("2am animal crossing new horizons", "https://youtu.be/8Q2m0Sl3uyc");
ACM.set("3am animal crossing new horizons", "https://youtu.be/GD-3FiOHTe0");
ACM.set("4am animal crossing new horizons", "https://youtu.be/q4TndIe-648");
ACM.set("5am animal crossing new horizons", "https://youtu.be/XH6IXiXU8Eo");
ACM.set("6am animal crossing new horizons", "https://youtu.be/3DdlJCXm7Vw");
ACM.set("7am animal crossing new horizons", "https://youtu.be/kXvpdzYzyiU");
ACM.set("8am animal crossing new horizons", "https://youtu.be/e5h_KM1kXgw");
ACM.set("9am animal crossing new horizons", "https://youtu.be/e1qKdkDeDoc");
ACM.set("10am animal crossing new horizons", "https://youtu.be/B20O58ceYko");
ACM.set("11am animal crossing new horizons", "https://youtu.be/roj0iqA1X7o");
ACM.set("12pm animal crossing new horizons", "https://youtu.be/xs4FJOvLPC8");
ACM.set("1pm animal crossing new horizons", "https://youtu.be/WGCPde7TbRk");
ACM.set("2pm animal crossing new horizons", "https://youtu.be/HgETcBBLdTk");
ACM.set("3pm animal crossing new horizons", "https://youtu.be/9sF-9m-jThI");
ACM.set("4pm animal crossing new horizons", "https://youtu.be/jK7wl38aGao");
ACM.set("5pm animal crossing new horizons", "https://youtu.be/uLtJIPu-Cns");
ACM.set("6pm animal crossing new horizons", "https://youtu.be/sDSOT1LaNhU");
ACM.set("7pm animal crossing new horizons", "https://youtu.be/pSm8QMT6gG0");
ACM.set("8pm animal crossing new horizons", "https://youtu.be/wm4A_6fu4uQ");
ACM.set("9pm animal crossing new horizons", "https://youtu.be/TuMvh1R2Wkw");
ACM.set("10pm animal crossing new horizons", "https://youtu.be/ohZOZ8casjw");
ACM.set("11pm animal crossing new horizons", "https://youtu.be/z5Xb6FQMnss");
ACM.set("0am animal crossing new horizons rain", "https://youtu.be/mjxwRmAlotA");  //rain music
ACM.set("1am animal crossing new horizons rain", "https://youtu.be/KrkwWLV2Mx0");
ACM.set("2am animal crossing new horizons rain", "https://youtu.be/clXbS9JOVmY");
ACM.set("3am animal crossing new horizons rain", "https://youtu.be/pBwH77-DCmk");
ACM.set("4am animal crossing new horizons rain", "https://youtu.be/tc453B3c83k");
ACM.set("5am animal crossing new horizons rain", "https://youtu.be/MR2O7jPvAbE");
ACM.set("6am animal crossing new horizons rain", "https://youtu.be/sVFaQEHLndk");
ACM.set("7am animal crossing new horizons rain", "https://youtu.be/Cpeapou7YLA");
ACM.set("8am animal crossing new horizons rain", "https://youtu.be/qJcIHbjCDrg");
ACM.set("9am animal crossing new horizons rain", "https://youtu.be/dmlYmH16-CE");
ACM.set("10am animal crossing new horizons rain", "https://youtu.be/L_I9eUkI8W0");
ACM.set("11am animal crossing new horizons rain", "https://youtu.be/kt8SZNjQ4D4");
ACM.set("12pm animal crossing new horizons rain", "https://youtu.be/ZOMo962Xuyg");
ACM.set("1pm animal crossing new horizons rain", "https://youtu.be/nBZYhlcl9Ng");
ACM.set("2pm animal crossing new horizons rain", "https://youtu.be/nBZYhlcl9Ng");
ACM.set("3pm animal crossing new horizons rain", "https://youtu.be/9sF-9m-jThI");
ACM.set("4pm animal crossing new horizons rain", "https://youtu.be/Y-UJ-U-p-2A");
ACM.set("5pm animal crossing new horizons rain", "https://youtu.be/AOnxBYHV_Ss");
ACM.set("6pm animal crossing new horizons rain", "https://youtu.be/IZswtflfWlY");
ACM.set("7pm animal crossing new horizons rain", "https://youtu.be/Z0kgYx93FAU");
ACM.set("8pm animal crossing new horizons rain", "https://youtu.be/VIG2CDQZDzc");
ACM.set("9pm animal crossing new horizons rain", "https://youtu.be/pNy1w-X43ZY");
ACM.set("10pm animal crossing new horizons rain", "https://youtu.be/oEpYueb2gqs");
ACM.set("11pm animal crossing new horizons rain", "https://youtu.be/NRtiXe9ykec");
ACM.set("0am animal crossing new horizons snow", "https://youtu.be/OW36kFCHdQ4");  //snow music 
ACM.set("1am animal crossing new horizons snow", "https://youtu.be/OW36kFCHdQ4");
ACM.set("2am animal crossing new horizons snow", "https://youtu.be/I9j_PrSn38A");
ACM.set("3am animal crossing new horizons snow", "https://youtu.be/GD-3FiOHTe0");
ACM.set("4am animal crossing new horizons snow", "https://youtu.be/q4TndIe-648");
ACM.set("5am animal crossing new horizons snow", "https://youtu.be/XH6IXiXU8Eo");
ACM.set("6am animal crossing new horizons snow", "https://youtu.be/3DdlJCXm7Vw");
ACM.set("7am animal crossing new horizons snow", "https://youtu.be/kXvpdzYzyiU");
ACM.set("8am animal crossing new horizons snow", "https://youtu.be/e5h_KM1kXgw");
ACM.set("9am animal crossing new horizons snow", "https://youtu.be/e1qKdkDeDoc");
ACM.set("10am animal crossing new horizons snow", "https://youtu.be/B20O58ceYko");
ACM.set("11am animal crossing new horizons snow", "https://youtu.be/roj0iqA1X7o");
ACM.set("12pm animal crossing new horizons snow", "https://youtu.be/xs4FJOvLPC8");
ACM.set("1pm animal crossing new horizons snow", "https://youtu.be/WGCPde7TbRk");
ACM.set("2pm animal crossing new horizons snow", "https://youtu.be/HgETcBBLdTk");
ACM.set("3pm animal crossing new horizons snow", "https://youtu.be/D2TFSxMn-mc");
ACM.set("4pm animal crossing new horizons snow", "https://youtu.be/D2TFSxMn-mc");
ACM.set("5pm animal crossing new horizons snow", "https://youtu.be/uLtJIPu-Cns");
ACM.set("6pm animal crossing new horizons snow", "https://youtu.be/sDSOT1LaNhU");
ACM.set("7pm animal crossing new horizons snow", "https://youtu.be/sDSOT1LaNhU");
ACM.set("8pm animal crossing new horizons snow", "https://youtu.be/wm4A_6fu4uQ");
ACM.set("9pm animal crossing new horizons snow", "https://youtu.be/TuMvh1R2Wkw");
ACM.set("10pm animal crossing new horizons snow", "https://youtu.be/ohZOZ8casjw");
ACM.set("11pm animal crossing new horizons snow", "https://youtu.be/z5Xb6FQMnss");

//notify terminal of bot logging in
client.on('ready', () => {
   console.log(`Logged in as ${client.user.tag}!`);
});

 //reads chat messages
client.on('message', async message => {
   //messages to ignore
   if (!message.content.startsWith(prefix) || message.author.bot) return;
   
   // >play Command
   if (message.content.startsWith(prefix + "play")) {
      let voiceChannel = message.member.voice.channel;
      let d = new Date();
      execute(message, getTime(d.getHours()), voiceChannel);
   }

   // >stop command
   if (message.content.startsWith(prefix + "stop")) {
      message.member.voice.channel.leave();
   } 
});

//helper function convert current time to ACM key value
function getTime(time) {
   //time
   if (time >= 12 && time < 24) {
      time = time - 12 + "pm" + " animal crossing new horizons";
   } else {
      time = time + "am" + " animal crossing new horizons";
   }

   //weather
   let zipCode = "22033";
   fetch(`https://api.openweathermap.org/data/2.5/weather?zip=22033,us&appid=669ff27dc2631f02701457280f1de433`)
      .then(response => {
         return response.json();
      })
      .then(parsedWeather => {
         weather = parsedWeather.weather[0].main;
         if (weather === 'Thunderstorm' || weather === 'Drizzle' || weather === 'Rain') {
            time += " rain";
         }
         if (weather === 'Snow') {
            time  += " snow";
         }
   }); 
   return time;
}

async function execute(message,time,voiceChannel) {
   if (!voiceChannel) {
      return message.channel.send('You need to be in a voice channel to play music!');
   }
   const permissions = voiceChannel.permissionsFor(message.client.user);
   if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    return message.channel.send('I need the permissions to join and speak in your voice channel!');
   }

   try {
      var connection = await voiceChannel.join();
      play(message, time, connection);
   } catch (err) {
      console.log(err);
   }
}

//play function 
async function play(message, time, connection) {
   //finds song
   const songInfo = await ytdl.getInfo(ACM.get(time));
   const song = {
   title: songInfo.title,
	url: songInfo.video_url, 
   };
   message.channel.send("Playing " + song.title + "\n" + song.url);

   const dispatcher = connection.play(ytdl(song.url));
   dispatcher.on("finish", () => {
       let d = new Date();
       play(message,getTime(d.getHours()), connection);
   });
};

client.login(token);

