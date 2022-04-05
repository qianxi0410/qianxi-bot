import { Client, OnlineStatus } from "oicq";
import { Plugin } from "../../type";
import { poem } from "./poem";

export const info: Plugin = (client: Client) => {
  client.on("system.online", async () => {
    client.setNickname("千禧bot");
    client.setOnlineStatus(OnlineStatus.Online);
    client.setSignature(await poem());
  });

  client.on("system.offline.network", () => {
    const f = client.pickFriend(894871277);
    f.sendMsg("千禧bot下线了");
  });
};
