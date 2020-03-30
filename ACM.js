//import dependencies 
const Discord = require('discord.js');
const client = new Discord.Client();
const {
   prefix,
   token,
} = require('./config.json');
const ytdl = require('ytdl-core');

//map of times and song url
let ACM = new Map();
ACM.set("0am animal crossing new horizons", "https://youtu.be/OW36kFCHdQ4");
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
ACM.set("3pm animal crossing new horizons", "https://youtu.be/D2TFSxMn-mc");
ACM.set("4pm animal crossing new horizons", "https://youtu.be/jK7wl38aGao");
ACM.set("5pm animal crossing new horizons", "https://youtu.be/uLtJIPu-Cns");
ACM.set("6pm animal crossing new horizons", "https://youtu.be/sDSOT1LaNhU");
ACM.set("7pm animal crossing new horizons", "https://youtu.be/pSm8QMT6gG0");
ACM.set("8pm animal crossing new horizons", "https://youtu.be/wm4A_6fu4uQ");
ACM.set("9pm animal crossing new horizons", "https://youtu.be/TuMvh1R2Wkw");
ACM.set("10pm animal crossing new horizons", "https://youtu.be/ohZOZ8casjw");
ACM.set("11pm animal crossing new horizons", "https://youtu.be/z5Xb6FQMnss");

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
      play(message, getTime(d.getHours()), voiceChannel);
   }

   // >stop command
   if (message.content.startsWith(prefix + "stop")) {
      message.member.voice.channel.leave();
   } 
});

//helper function convert current time to ACM key value
function getTime(time) {
   if (time >= 12 && time < 24) {
      time = time - 12 + "pm" + " animal crossing new horizons";
   } else {
      time = time + "am" + " animal crossing new horizons";
   }
   return time;
}

//play function 
async function play(message, time, voiceChannel) {
   //checks voice channel things
   if (!voiceChannel) {
      return message.channel.send('You need to be in a voice channel to play music!');
   }
   const permissions = voiceChannel.permissionsFor(message.client.user);
   if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    return message.channel.send('I need the permissions to join and speak in your voice channel!');
   }

   //finds song
   console.log(time);
   const songInfo = await ytdl.getInfo(ACM.get(time));
   const song = {
   title: songInfo.title,
	url: songInfo.video_url,
   };
   message.channel.send("Playing " + song.title + "\n" + song.url);

   //play the song
   voiceChannel.join().then(connection => {
      const dispatcher = connection.play(ytdl(song.url));
      dispatcher.on("finish", () => {
         let d = new Date();
         play(message,getTime(d.getHours()),voiceChannel);
      });
   });
   
};

client.login(token);
