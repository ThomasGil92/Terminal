import { findPath, isCommand, makeNewInputPath } from "../../utils";
import { describe, test, it, expect } from "vitest";

import { paths } from "../../utils/paths";

describe("findPath function", () => {
  it("should return an object if we pass in parameter the whole paths object and an Array of keys strings in right order", () => {
    const testPath = ["Départ", "École"];
    expect(findPath(paths, testPath)).toStrictEqual({
      name: "École",
      Entrée: { name: "Entrée", message: "Bienvenue" },
    });
  });
  it("should return undefined if we pass in parameter the whole paths object and an Array of keys string in bad order", () => {
    const testPath = ["Départ", "Entrée"];
    expect(findPath(paths, testPath)).toBe(undefined);
  });
});
describe("makeNewInputPath function", () => {
  const currentPath = ["Départ", "École"];
  it("should return a good path arrays if we pass in parameter the last paths object of keys and new paths object", () => {
    let newInputPath = ["Entrée", ""];
    expect(makeNewInputPath(currentPath, newInputPath)).toStrictEqual([
      "Départ",
      "École",
      "Entrée",
    ]);
  });
  it("should return the second parameter if we pass in parameter the whole paths object and an Array of strings of keys in bad order", () => {
    const newInputPath:[] = [];
    expect(makeNewInputPath(currentPath, newInputPath)).toStrictEqual(
      currentPath,
    );
  });
  it("should return empty array if both currentPath and newInputPath are empty", () => {
    const newInputPath:[] = [];
    const emptyCurrentPath:[]=[]
    expect(makeNewInputPath(emptyCurrentPath, newInputPath)).toStrictEqual([]);
  });
  it("should return a good path arrays if we pass in parameter the last paths object of keys and new paths object with '..' to indicate that we back up in the paths object", () => {
    const backUpKey = [".."];
    const backUpDownKey = ["..","Foret"];
    expect(makeNewInputPath(currentPath, backUpKey)).toStrictEqual(
      ["Départ"],
    );
    expect(makeNewInputPath(currentPath, backUpDownKey)).toStrictEqual(
      ["Départ","Foret"],
    );
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
