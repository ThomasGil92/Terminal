import {
  findPath,
  findPnj,
  isCommand,
  isTherePnj,
  listPathFromCurrentObject,
  makeNewInputPath,
} from "../../utils";
import { describe, test, it, expect } from "vitest";

import { paths } from "../../data/paths";

describe("findPath function", () => {
  it("should return an object if we pass in parameter the whole paths object and an Array of keys strings in right order", () => {
    const testPath = ["Départ", "École"];
    expect(findPath(paths, testPath)).toStrictEqual(paths.Départ.École);
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
    const newInputPath: [] = [];
    expect(makeNewInputPath(currentPath, newInputPath)).toStrictEqual(
      currentPath,
    );
  });
  it("should return empty array if both currentPath and newInputPath are empty", () => {
    const newInputPath: [] = [];
    const emptyCurrentPath: [] = [];
    expect(makeNewInputPath(emptyCurrentPath, newInputPath)).toStrictEqual([]);
  });
  it("should return a good path arrays if we pass in parameter the last paths object of keys and new paths object with '..' to indicate that we back up in the paths object", () => {
    const backUpKey = [".."];
    const backUpDownKey = ["..", "Foret"];
    expect(makeNewInputPath(currentPath, backUpKey)).toStrictEqual(["Départ"]);
    expect(makeNewInputPath(currentPath, backUpDownKey)).toStrictEqual([
      "Départ",
      "Foret",
    ]);
  });
});
describe("isCommand function", () => {
  it("should return true if the first splitted string is a known command", () => {
    const KNOWN_COMMANDS = ["cd", "ls", "cat"];
    KNOWN_COMMANDS.forEach((command) => {
      expect(isCommand(command)).toBeTruthy();
    });
  });
  it("should return false if the first splitted string is not known command", () => {
    const inputValue = "f Départ/École";
    expect(isCommand(inputValue)).toBeFalsy();
  });
});
describe("listPathFromCurrentObject", () => {
  it("should render keys of object which are in the current object", () => {
    expect(listPathFromCurrentObject(paths.Départ)).toStrictEqual([
      "École",
      "Foret",
    ]);
  });
});
describe("findPnj", () => {
  it("should return  a pnj object", () => {
    expect(findPnj(paths.Départ, ["Hiboux"])).toStrictEqual(paths.Départ.pnj.Hiboux);
  });
  it("should return null if pnj is not found", () => {
    expect(findPnj(paths.Départ, ["Magicien"])).toBeNull();
  });
});
describe("isTherePnj", () => {
  it("should verify and list all pnj object at the past", () => {
    expect(isTherePnj(paths.Départ)).toStrictEqual(paths.Départ.pnj);
  });
});
