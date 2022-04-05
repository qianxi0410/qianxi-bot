import { Client } from "oicq";
import { Plugin } from "./../../type.d";
import { config } from "./config";
import { getCourseInfo } from "./getCourseInfo";

export const curriculum: Plugin = (client: Client) => {
  client.on("message.private.friend", (event) => {
    if (
      event.from_id === config.owner &&
      ["#今日课表", "#明日课表", "#本周课表"].includes(event.raw_message)
    ) {
      getCourseInfo(event.raw_message).then((courseInfo) => {
        event.reply(courseInfo, false);
      });
    }
  });
};
