"use client";
import { useEffect, useState } from "react";
import { paths } from "../../data/paths";
import {
  findPath,
  findPnj,
  isTherePnj,
  isCommand,
  listPathFromCurrentObject,
  makeNewInputPath,
  setLinesWithDelayFromStringArray,
  setLinesWithDelayFromLineObject,
} from "../../utils/index";
import { IPaths, Lines } from "@/utils/@Types";

export function usePathObject(
  cPath: string[] = ["Départ"],
  cObject: IPaths = paths.Départ,
) {
  const [currentPath, setCurrentPath] = useState<string[]>(cPath);
  const [currentObject, setCurrentObject] = useState(cObject);
  const [lines, setLines] = useState<Lines[]>([]);

  useEffect(() => {
    if (cObject.placeIntro) {
      /* cObject.placeIntro.forEach((sentence: string, index: number) => {
        setTimeout(() => {
          setLines((prevLines) => [
            ...prevLines,
            {
              sentence,
              tag: { name: "p" },
            },
          ]);
        }, index * 1000);
      }); */
      setLinesWithDelayFromStringArray(
        [...cObject.placeIntro, `Vous êtes à "${cObject.name}"`,"br"],
        setLines,
      );
    }
  }, []);

  function handleFormSubmit(inputPaths: string[], inputValue: string) {
    let allSentences: Lines[] = [];
    const command = isCommand(inputValue);
    switch (command) {
      case "cd":
        const completePath = [...makeNewInputPath(currentPath, inputPaths)];
        inputPaths = [...makeNewInputPath(currentPath, inputPaths)];
        const result = findPath(paths, inputPaths);
        if (result) {
          let allSentences = [];
          setCurrentPath([...completePath]);
          if (result.placeIntro) {
            setLinesWithDelayFromStringArray(result.placeIntro, setLines);
            /* result.placeIntro.forEach((sentence: string, index: number) => {
              setTimeout(() => {
                setLines((prevLines) => [
                  ...prevLines,
                  {
                    sentence,
                    tag: { name: "p" },
                  },
                ]);
              }, index * 1000);
            }); */
          } else {
            setLines([
              ...lines,
              {
                sentence: `Vous êtes à ${result.name}`,
                tag: { name: "p" },
              },
            ]);
          }

          setCurrentObject({ ...result });
        } else {
          setLines([
            ...lines,
            {
              sentence: `Aucun chemin ne correspond.`,
              tag: { name: "p" },
            },
          ]);
        }
        break;
      case "ls":
        const keysWithObjects = listPathFromCurrentObject(currentObject);
        let isPnj = isTherePnj(currentObject);
        const keys = keysWithObjects.map((key) => {
          return { sentence: key, tag: { name: "li", classes: "list__place" } };
        });
        if (keysWithObjects.length > 0) {
          allSentences.push(
            {
              sentence: `Vous pouvez accéder à:`,
              tag: { name: "p" },
            },
            ...keys,
          );

          if (isPnj) {
            const keys = Object.keys(isPnj).map((key) => {
              return {
                sentence: key,
                tag: { name: "li", classes: "list__pnj" },
              };
            });
            allSentences.push(
              {
                sentence: `Vous pouvez parler avec:`,
                tag: { name: "p" },
              },
              ...keys,
            );
          }
          allSentences.forEach((sentence, index) => {
            setTimeout(() => {
              setLines((prevPhrases) => [...prevPhrases, sentence]);
            }, index * 500);
          });
        } else {
          setLines([
            ...lines,
            {
              sentence: `C'est un cul-de-sac`,
              tag: { name: "p" },
            },
          ]);
        }
        break;
      case "cat":
        const pnj = findPnj(currentObject, inputPaths);

        if (pnj) {
          let dialog = [
            {
              sentence: `${pnj.name}:`,
              tag: { name: "p" },
            },
          ];
          pnj.pre_sentence.forEach((sentence: string) => {
            dialog.push({
              sentence,
              tag: { name: "p" },
            });
          });
          if (pnj.img)
            allSentences.push({
              sentence: `${pnj.name}`,
              tag: { name: "img", classes: "displayedLine_img", img: pnj.img },
            });
          allSentences.push(...dialog);
        }
        pnj !== null
          ? setLinesWithDelayFromLineObject(allSentences, setLines)
          : setLinesWithDelayFromLineObject(
              [
                {
                  sentence: `Aucun personnage ne porte le nom ${inputPaths[0]}`,
                  tag: { name: "p" },
                },
              ],
              setLines,
            );

        break;

      case "help":
        setLinesWithDelayFromStringArray(paths.commands, setLines,"list__help");
        break;

      case false:
        setLines([
          ...lines,
          { sentence: "Commande inconnue", tag: { name: "p" } },
        ]);
        break;
    }
  }

  return {
    currentPath,
    setCurrentPath,
    currentObject,
    setCurrentObject,
    lines,
    handleFormSubmit,
  };
}
