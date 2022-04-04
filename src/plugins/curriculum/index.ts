import { Client } from "oicq";
import { Plugin } from "./../../type.d";
import { getCourseInfo } from "./getCourseInfo";

export const curriculum: Plugin = (client: Client) => {
  client.on("message", (message) => {
    if (
      message.message_type === "private" &&
      ["#今日课表", "#明日课表", "#本周课表"].includes(message.raw_message)
    ) {
      getCourseInfo(message.raw_message).then((courseInfo) => {
        message.reply(courseInfo, false);
      });
    }
  });
};
