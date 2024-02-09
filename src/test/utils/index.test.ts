import { findPath, isCommand } from "../../utils";
import { describe, test, it, expect } from "vitest";

import { paths } from "../../utils/paths";

describe("findPath function", () => {
  it("should return a path if we pass in parameter the whole paths object and an Array of strings of keys in right order", () => {
    const testPath = ["Départ", "École"];
    expect(findPath(paths, testPath)).toStrictEqual({
      name: "École",
      Entrée: { name: "Entrée", message: "Bienvenue" },
    });
  });
  it("should return undefined if we pass in parameter the whole paths object and an Array of strings of keys in bad order", () => {
    const testPath = ["Départ", "Entrée"];
    expect(findPath(paths, testPath)).toBe(undefined);
  });
 
  
});
describe("isCommand function", () => {
  it("should return true if the first splitted string is 'cd'", () => {
    const inputValue = "cd Départ/École";
    expect(isCommand(inputValue)).toBeTruthy();
  });
  it("should return false if the first splitted string is not 'cd'", () => {
    const inputValue = "f Départ/École";
    expect(isCommand(inputValue)).toBeFalsy();
  });
});
