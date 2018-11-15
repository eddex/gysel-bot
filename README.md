# gysel-bot
A Telegram bot that reminds my flatmates to throw away the trash by sending reminder messages on Tuesdays from 6am to 8am every 3 minutes.

## info
1. create file `telegram_token.secret` in root folder and paste your telegram bot token in it
2. create file `password.secret` in root folder and write a random password in it
3. start bot `node src/main.js`
4. in Telegram use `/init <PASSWORD>` to authorize. The bot will only send messages to the autorized chat. There can only be 1 authorized chat at a time, run the command again in another chat to change the authorized chat.
5. when the bot starts sending messages, stop it with `/done`

