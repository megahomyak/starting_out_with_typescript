import { Telegraf } from "telegraf";

import * as fs from "fs";

import * as superstruct from "superstruct";

const Config = superstruct.object({
    token: superstruct.string(),
});

const config = superstruct.create(JSON.parse(fs.readFileSync("resources/config.json", "utf-8")), Config);

const bot = new Telegraf(config.token);

bot.on("message", (ctx) => {
    console.log(ctx.text);
});

process.once("SIGTERM", () => {
    bot.stop("SIGTERM");
    process.exit(0);
});

bot.launch();
