/* 插件类型 */
export interface Plugin {
  (client: Client): void;
}
