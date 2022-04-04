export const weekly = (map: Record<string, any[]>) => {
  let res = "";

  for (const [key, value] of Object.entries(map)) {
    // 跳过空日程
    if (value.length === 0) {
      continue;
    }

    if (!["1", "2", "3", "4", "5", "6", "7"].includes(key)) {
      continue;
    }

    res += `星期${key}课表：\n`;

    for (const item of value) {
      res += `${item.name}/${item.roomString}/${item.timeString}\n`;
    }
  }

  return res;
};

const getDayOfWeek = () => {
  const arr = [7, 1, 2, 3, 4, 5, 6];
  return arr[new Date().getDay()];
};

export const day = (map: Record<string, any[]>) => {
  const day = getDayOfWeek();

  const dayCourse = map[day.toString()];

  if (!dayCourse.length) {
    return "啊哈，今天没课哦！可以小小摆烂！";
  }

  let res = "今天的课表：\n";
  for (const item of dayCourse) {
    res += `${item.name}/${item.roomString}/${item.timeString}\n`;
  }

  return res;
};

export const tomorrow = (map: Record<string, any[]>) => {
  const day = getDayOfWeek() === 7 ? 1 : getDayOfWeek() + 1;

  const dayCourse = map[day.toString()];

  if (!dayCourse.length) {
    return "啊哈，明天没课哦！可以小小摆烂！";
  }

  let res = "明天的课表：\n";
  for (const item of dayCourse) {
    res += `${item.name}/${item.roomString}/${item.timeString}\n`;
  }

  return res;
};
