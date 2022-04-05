import { Client, OnlineStatus } from "oicq";
import { Plugin } from "../../type";
import { config } from "./config";
import { poem } from "./poem";

export const info: Plugin = (client: Client) => {
  client.on("system.online", async () => {
    client.setNickname("千禧bot");
    client.setOnlineStatus(OnlineStatus.Online);
    client.setSignature(await poem());
  });

  client.on("system.offline", () => {
    const f = client.pickFriend(config.owner);
    f.sendMsg("千禧bot下线了");
  });
};
