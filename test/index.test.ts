import { expect, test } from "vitest";

const welcome = "hello world";

test("welcome should be hello world", () => {
  expect(welcome).toBe("hello world");
});
