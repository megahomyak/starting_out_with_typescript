import TelegramBot from "node-telegram-bot-api";

import * as fs from "fs";

import * as s from "superstruct";

const Config = s.object({
    token: s.string(),
});

const config = s.create(JSON.parse(fs.readFileSync("resources/config.json", "utf-8")), Config);

const bot = new TelegramBot(config.token);

bot.on("message", (message) => {
    console.log(message.text);
});

process.on("SIGTERM", () => {
    (async function() {
        await bot.stopPolling();
        console.log("AAAAAAAAAAAAAAAAAAAAAa");
        console.log(bot.isPolling());
        console.log("BBBBBBBBBBBBBBBBB");
    }()).then(() => process.exit(0));
});

bot.startPolling();
