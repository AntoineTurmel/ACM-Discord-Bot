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
ACM.set("12am animal crossing new leaf", "https://youtu.be/yMsEExr7rOg");
ACM.set("1am animal crossing new leaf", "https://youtu.be/S0UUTc8R_tk");
ACM.set("2am animal crossing new leaf", "https://youtu.be/6ctYQ2giDfw");
ACM.set("3am animal crossing new leaf", "https://youtu.be/lfCcR1G_VkU");
ACM.set("4am animal crossing new leaf", "https://youtu.be/yL2diojhue8");
ACM.set("5am animal crossing new leaf", "https://youtu.be/ZZk2CyGgbR0");
ACM.set("6am animal crossing new leaf", "https://youtu.be/j4JrrHgnCb8");
ACM.set("7am animal crossing new leaf", "https://youtu.be/XTXN67hugbA");
ACM.set("8am animal crossing new leaf", "https://youtu.be/B9mDv-Z1_rI");
ACM.set("9am animal crossing new leaf", "https://youtu.be/_O2SmI_aYMQ");
ACM.set("10am animal crossing new leaf", "https://youtu.be/OOVpaOpdGmM");
ACM.set("11am animal crossing new leaf", "https://youtu.be/yi_gzkqae_s");
ACM.set("12pm animal crossing new leaf", "https://youtu.be/fKFRr3vJWWU");
ACM.set("1pm animal crossing new leaf", "https://youtu.be/PsEaskBg-TU");
ACM.set("2pm animal crossing new leaf", "https://youtu.be/nJB0OvU_vkg");
ACM.set("3pm animal crossing new leaf", "https://youtu.be/n1eTTQLGU88");
ACM.set("4pm animal crossing new leaf", "https://youtu.be/0x5FxWCCBiw");
ACM.set("5pm animal crossing new leaf", "https://youtu.be/pLtKoYCPHFI");
ACM.set("6pm animal crossing new leaf", "https://youtu.be/PWoicGQV4JU");
ACM.set("7pm animal crossing new leaf", "https://youtu.be/yfYDBZgqD3g");
ACM.set("8pm animal crossing new leaf", "https://youtu.be/deuR4NKHl38");
ACM.set("9pm animal crossing new leaf", "https://youtu.be/-MSF-zfgNuY");
ACM.set("10pm animal crossing new leaf", "https://youtu.be/HRpOxztFoUI");
ACM.set("11pm animal crossing new leaf", "https://youtu.be/VMetMEMsYx4");

//notify terminal of bot logging in
client.on('ready', () => {
   console.log(`Logged in as ${client.user.tag}!`);
});

 //reads chat messages
client.on('message', async message => {
   //messages to ignore
   if (!message.content.startsWith(prefix) || message.author.bot) return;
   
   // /play message
   if (message.content.startsWith(prefix + "play")) {
      //gets time in the correct format
      let time = message.createdAt + " ";
      time = Number(time.substring(time.indexOf(":") - 2, time.indexOf(":")));
      if (time >= 12 && time < 24) {
         time = time - 12 + "pm" + " animal crossing new leaf";
      } else {
         time = time + "am" + " animal crossing new leaf";
      }
      //gets the voice channel
      const voiceChannel = message.member.voice.channel;
      play(message,time,voiceChannel);
   }
   if (message.content.startsWith(prefix + "stop")) {
      //stop(message);
   } 
});

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
   const songInfo = await ytdl.getInfo(ACM.get(time));
   const song = {
   title: songInfo.title,
	url: songInfo.video_url,
   };
   message.reply("Playing " + song.title + "\n" + song.url);

   //join voice channel
   /*try {
      var connection = await voiceChannel.join();
   } catch (err) {
      console.log(err);
   }*/

   //play the song
   voiceChannel.join().then(connection => {
      const stream = ytdl(song.url, { filter: 'audioonly' });
      const dispatcher = connection.play(stream);

      dispatcher.on('end', () => voiceChannel.leave());
   });
};
client.login(token);