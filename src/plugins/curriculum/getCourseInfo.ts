import axios from "axios";
import puppeteer from "puppeteer";
import { config } from "./config";
import { day, tomorrow, weekly } from "./utils";

/**
 * 获取个人西工大课表信息
 * @param msg 触发参数
 * @returns 课表信息
 */
export const getCourseInfo = async (msg: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://uis.nwpu.edu.cn/cas/login");

  await page.type("#username", config.student_id);
  await page.type("#password", config.password);

  await Promise.all([
    page.waitForNavigation(),
    page.click("input[type=submit]"),
  ]);

  await page.goto("https://graduate-schedule.nwpu.edu.cn/ui/#/courseTable");

  const token = await page.evaluate(() => localStorage.getItem("token"));

  // 获取本周周数
  const { data } = await axios.get(
    "https://graduate-schedule.nwpu.edu.cn/api/semester/currentWeek",
    {
      headers: {
        "X-Id-Token": token!,
      },
    }
  );

  const [id, week] = [
    data.data.value.semesterId as number,
    data.data.value.weekOfSemester as number,
  ];

  // 获取本周课表
  const { data: res } = await axios.get(
    `https://graduate-schedule.nwpu.edu.cn/api/courseTable/${id}/${week}`,
    {
      headers: {
        "X-Id-Token": token!,
        Accept: "application/json, text/plain, */*",
      },
    }
  );

  const courseMap = res.data.courseMap as Record<string, any[]>;

  await page.close();

  // 优化信息格式返回
  switch (msg) {
    case "#今日课表":
      return day(courseMap);
    case "#明日课表":
      return tomorrow(courseMap);
    case "#本周课表":
      return weekly(courseMap);
    default:
      return "啊？请输入正确的查询课表命令！";
  }
};
