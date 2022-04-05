import axios from "axios";

export const poem = async () => {
  const { data } = await axios.get("https://v1.jinrishici.com/all.json");

  return data.content as string;
};
