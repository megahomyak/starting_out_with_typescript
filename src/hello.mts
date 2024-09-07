import TelegramBot from "node-telegram-bot-api";

import * as fs from "fs";

import * as s from "superstruct";

const Config = s.object({
    token: s.string(),
});

const config = s.create(JSON.parse(fs.readFileSync("config.json", "utf-8")), Config);

const bot = new TelegramBot(config.token);

bot.on("message", (message) => {
    console.log(message.text);
});

bot.startPolling();
