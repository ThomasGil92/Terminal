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
import local from "next/font/local";

export function usePathObject(
  cPath: string[] = ["Départ"],
  cObject: IPaths = paths.Départ,
) {
  if (typeof window !== "undefined" && window.localStorage.getItem("cPath")) {
    cPath = JSON.parse(localStorage.getItem("cPath")!);
  }
  if (typeof window !== "undefined" && window.localStorage.getItem("cObject")) {
    cObject = JSON.parse(localStorage.getItem("cObject")!);
  }
  const [currentPath, setCurrentPath] = useState<string[]>(cPath);
  const [currentObject, setCurrentObject] = useState(cObject);
  const [lines, setLines] = useState<Lines[]>([]);

  useEffect(() => {
    if (currentObject.placeIntro) {
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
      setLinesWithDelayFromStringArray([...cObject.placeIntro, "br"], setLines);
    } else {
      setLinesWithDelayFromStringArray(
        [`Vous êtes à "${cObject.name}"`, "br"],
        setLines,
      );
    }
  }, []);

  function handleFormSubmit(inputPaths: string[], inputValue: string) {
    let allSentences: Lines[] = [];
    const command = isCommand(inputValue);
    switch (command) {
      case "cd":
        console.log(inputValue);
        const completePath = [...makeNewInputPath(currentPath, inputPaths)];
        inputPaths = [...makeNewInputPath(currentPath, inputPaths)];
        const result = findPath(paths, inputPaths);
        if (result) {
          if (result.placeIntro) {
            setLinesWithDelayFromStringArray(
              [`$ ${inputValue}`, ...result.placeIntro,"br"],
              setLines,
            );
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
                sentence: `$ ${inputValue}`,
                tag: { name: "p" },
              },
              {
                sentence: `Vous êtes à ${result.name}`,
                tag: { name: "p" },
              },
            ]);
          }

          setCurrentObject({ ...result });
          setCurrentPath([...completePath]);
          localStorage.clear();
          localStorage.setItem("cObject", JSON.stringify({ ...result }));
          localStorage.setItem("cPath", JSON.stringify([...completePath]));
        } else {
          setLines([
            ...lines,
            {
              sentence: `$ ${inputValue}`,
              tag: { name: "p" },
            },
            {
              sentence: `Aucun chemin ne correspond.`,
              tag: { name: "p" },
            },
            {
              sentence: `br`,
              tag: { name: "br" },
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
              sentence: `$ ${inputValue}`,
              tag: { name: "p" },
            },
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
              sentence: `$ ${inputValue}`,
              tag: { name: "p" },
            },
            {
              sentence: `C'est un cul-de-sac`,
              tag: { name: "p" },
            },
            {
              sentence: `br`,
              tag: { name: "br" },
            },
          ]);
        }
        break;
      case "cat":
        const pnj = findPnj(currentObject, inputPaths);

        if (pnj) {
          let dialog = [
            {
              sentence: `$ ${inputValue}`,
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
                  sentence: `$ ${inputValue}`,
                  tag: { name: "p" },
                },
                {
                  sentence: `Aucun personnage ne porte le nom ${inputPaths[0]}`,
                  tag: { name: "p" },
                },
              ],
              setLines,
            );

        break;

      case "help":
        setLinesWithDelayFromStringArray(
          [`$ ${inputValue}`, ...paths.commands],
          setLines,
          "list__help",
        );
        break;

      case false:
        setLines([
          ...lines,
          {
            sentence: `$ ${inputValue}`,
            tag: { name: "p" },
          },
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
