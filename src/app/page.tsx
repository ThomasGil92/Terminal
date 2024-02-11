"use client";
import TypingParagraph from "./components/TypingParagraph";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import {
  isCommand,
  findPath,
  makeNewInputPath,
  listPathFromCurrentObject,
  findPnj,
} from "@/utils";
import { paths } from "@/utils/paths";
import { IPaths } from "@/utils/@Types";
import { usePathObject } from "@/domain/useCases/usePathsObject";

export default function Home() {
  const [lines, setLines] = useState<string[]>([]);
  const { currentPath, setCurrentPath, currentObject, setCurrentObject } =
    usePathObject<string[], IPaths>(["Départ"], paths.Départ);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const displayedLinesSectionRef = useRef<HTMLElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const input = inputRef.current;

    if (input) {
      input.select();
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleTerminalinput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputValue);
    let inputPaths = inputValue.split(" ")[1]?.split("/");

    const command = isCommand(inputValue);
    switch (command) {
      case "cd":
        const completePath = [...makeNewInputPath(currentPath, inputPaths)];
        inputPaths = [...makeNewInputPath(currentPath, inputPaths)];
        const result = findPath(paths, inputPaths);
        if (result) {
          setCurrentPath([...completePath]);
          //const keys: string[] = Object.keys(path);
          setLines([...lines, `Vous êtes à ${result.name}`]);
          setCurrentObject({ ...result });
        } else {
          setLines([...lines, `Aucun chemin ne correspond.`]);
        }
        setInputValue("");
        break;
      case "ls":
        const keysWithObjects = listPathFromCurrentObject(currentObject);
        keysWithObjects.length > 0
          ? setLines([
              ...lines,
              `Vous pouvez accéder à ${keysWithObjects
                .map((objectKey) => {
                  return `${objectKey}/ `;
                })
                .join("& ")}`,
            ])
          : setLines([...lines, `C'est un cul-de-sac`]);
        setInputValue("");
        break;
      case "cat":
        const pnj = findPnj(currentObject, inputPaths);
        pnj !== null
          ? setLines([...lines, `${pnj.name}:`, `- ${pnj.pre_sentence}`])
          : setLines([
              ...lines,
              `Aucun personnage ne porte le nom ${inputPaths[0]}`,
            ]);

        setInputValue("");
        break;

      case false:
        setLines([...lines, "Commande inconnue"]);
        setInputValue("");
        break;
      default:
        setInputValue("");
        return;
    }
  };
  return (
    <main className={styles.main}>
      <section
        className={styles.displayedTextSection}
        ref={displayedLinesSectionRef}
      >
        {lines.length &&
          lines.map((line, id) => {
            return (
              <TypingParagraph
                key={id}
                text={line}
                reference={displayedLinesSectionRef}
              />
            );
          })}
      </section>
      <p style={{ color: "white" }}>{JSON.stringify(currentPath)}</p>
      <form
        id='form_element'
        className={styles.main_form}
        onSubmit={handleTerminalinput}
      >
        ${" "}
        <input
          id='input'
          ref={inputRef}
          type='text'
          className={styles.main_input}
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>
    </main>
  );
}
