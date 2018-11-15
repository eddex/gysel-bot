const teleBot = require('telebot');
const fs = require('fs');
const CronJob = require('cron').CronJob;

// load bot token and password from file and create bot
var token = fs.readFileSync('telegram_token.secret').toString().replace(/\n$/, '');
var password = fs.readFileSync('password.secret').toString().replace(/\n$/, '');
const bot = new teleBot(token);

let done = false;
let chatId = '';
let messages = Array(
  "GÜSEL RAUSBRINGEN!",
  "Hoppi galoppi, de Güsel lauft ned selber!",
  "REEEEEEEEEEEEEEEEEE!!!111!!",
  "Guten Morgen liebe Kinder ",
  "🚮🚮🚮🚮🚮🚮🚮🚮",
  "De Güsel leert sich ned voneleige! 🗑",
  "Eat, sleep, empty the trash, repeat!",
  "Was du heute kannst entsorgen, KANNST DU MORGEN NICHT MEHR! 👺",
  "Ai carramba! 👀",
  "Kei plan, bringet eifach de Güsel use.");

// ping
bot.on('/start', msg => {
  return bot.sendMessage(msg.chat.id, `Hallo ${ msg.from.first_name }!`);
});

// strongest security ever
bot.on('/init', msg => {
  done = false;
  if (msg.text == '/init ' + password) {
    chatId = msg.chat.id;
    return bot.sendMessage(msg.chat.id, `Updated!`);
  }
  return bot.sendMessage(msg.chat.id, `Nope!`);
});

// stop the messages
bot.on('/done', msg => {
  done = true;
  return bot.sendMessage(msg.chat.id, `Gracias!! 💏`);
});

// send random reminder message every 5 minutes from 6:00 - 8:00 on Tuesdays
let trashJob = new CronJob("*/3 6-8 * * 2", function() {
  if (!done && chatId != '') {
    bot.sendMessage(chatId, messages[Math.floor(Math.random() * messages.length)]);
  }
}, null, true, 'Europe/Zurich'); 
trashJob.start();

// reset done flag before trashJob starts 
let resetJob = new CronJob("55 5 * * 2", function() {
  done = false;
}, null, true, 'Europe/Zurich'); 
resetJob.start();

bot.connect();
console.log('bot started');
