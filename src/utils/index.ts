import { Dispatch, SetStateAction } from "react";
import { IPaths, Lines } from "./@Types";

//TODO: pour remonter, trouver un chemin avec le nombre de ../../ pour laisser 2éléments dans le tableau des chemin
export const findPath = <T, K extends keyof T>(
  objet: T,
  chemin: string[],
): T[K] | undefined => {
  //Get the first key of the path in the object
  const propriete = chemin.shift();
  //if there is no more propriete in the chemin array or there is an empty string (case of / at the end of prompt)
  if (chemin.length === 0 || (chemin.length === 1 && chemin[0] === "")) {
    //return of the found object

    if ((objet as any)[propriete!] === undefined) return undefined;
    return (objet as any)[propriete!];
  } else {
    //we launch the findPath again
    return findPath((objet as any)[propriete!], chemin);
  }
};

export function listPathFromCurrentObject(currentObject: IPaths) {
  const keysWithObjects: string[] = [];

  for (const key in currentObject) {
    if (
      typeof currentObject[key] === "object" &&
      currentObject[key] !== null &&
      key !== "pnj" &&
      key !== "placeIntro" &&
      key !== "placeText"
    ) {
      keysWithObjects.push(key);
    }
  }
  return keysWithObjects;
}

export const findPnj = (currentObject: IPaths, inputPaths: string[]) => {
  const pnj = currentObject.pnj[inputPaths[0]];
  if (pnj) {
    return pnj;
  }
  return null;
};
export const isTherePnj = (currentObject: IPaths) => {
  const pnj = currentObject.pnj;
  if (pnj) return pnj;
  return null;
};

export const makeNewInputPath = (
  currentPath: string[],
  inputPaths: string[],
) => {
  if (currentPath.length) {
    let newPath = [...currentPath];
    inputPaths.forEach((path) => {
      if (path === "..") {
        inputPaths.slice(1);
        newPath.pop();
      }
      if (path === "") {
        inputPaths.slice(1);
      }
      if (path !== "" && path !== "..") {
        newPath.push(path);
      }
    });
    inputPaths = [...newPath];
    return inputPaths;
  }
  return inputPaths;
};

export const isCommand = (inputCommand: string): boolean | string => {
  const command = inputCommand.split(" ")[0];

  switch (command) {
    case "cd":
      return "cd";
    case "ls":
      return "ls";
    case "cat":
      return "cat";
    case "help":
      return "help";
    default:
      return false;
  }
};

export const setLinesWithDelayFromStringArray = (
  array: string[],
  setLines: Dispatch<SetStateAction<Lines[]>>,
  classes?: string,
) => {
  array.forEach((sentence: string, index: number) => {
    setTimeout(() => {
      setLines((prevLines) => [
        ...prevLines,
        {
          sentence,
          tag: { name: sentence === "br" ? "br" : "p", classes },
        },
      ]);
    }, index * 1000);
  });
};
export const setLinesWithDelayFromLineObject = (
  lines: Lines[],
  setLines: Dispatch<SetStateAction<Lines[]>>,
) => {
  lines.forEach((line: Lines, index: number) => {
    setTimeout(() => {
      setLines((prevLines) => [...prevLines, line]);
    }, index * 1000);
  });
};
