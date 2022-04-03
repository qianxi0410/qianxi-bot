import { Client, createClient } from "oicq";
import { Plugin } from "./type.d";

export class Bot {
  private client: Client | undefined;

  constructor(
    public login_type: "qrcode" | "password" = "password",
    public account: number,
    public password?: string
  ) {}

  public start() {
    this.client = createClient(this.account);

    if (this.login_type === "password" && this.password) {
      this.client.login(this.password);
    } else {
      this.client.login();
    }

    this.load();
  }

  public stop() {
    if (this.client) {
      this.client.logout();
      return;
    }

    console.log("请先登录");
  }

  private use(plugin: Plugin) {
    plugin(this.client!);
  }

  private async load() {
    const plugins = await import("./plugins");

    for (const p of Object.values(plugins)) {
      if (typeof p === "function") {
        this.use(p);
      }
    }
  }
}
