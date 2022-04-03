import { expect, test } from "vitest";
import { welcome } from "../src/index";

test("welcome should be hello world", () => {
  expect(welcome).toBe("hello world");
});
