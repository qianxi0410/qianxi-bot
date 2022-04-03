import { Bot } from "./bot";
import { config } from "./config";

const { user_info } = config;

const bot = new Bot("password", user_info.qq, user_info.password);

bot.start();
