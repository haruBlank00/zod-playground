import { expect, it } from "vitest";
import { toString } from "./01.number";

it("Shoud throw a runtime error when called with not a number", () => {
  expect(() => toString("123")).toThrowError("Expeced number, received string");
});

it("Should return a string when called with a number", () => {
  expect(toString(1)).toBeTypeOf("string");
});
