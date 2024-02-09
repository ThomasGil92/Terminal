"use client";
import TypingParagraph from "./components/TypingParagraph";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import { isCommand, findPath } from "@/utils";
import { paths } from "@/utils/paths";
import { IPaths } from "@/utils/@Types";

export default function Home() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);

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
    let inputPaths = inputValue.split(" ")[1].split("/");

    if (isCommand(inputValue)) {
      if (currentPath && currentPath.length) {
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
      }
      const completePath = [...inputPaths];
      const result = findPath(paths, inputPaths);
console.log(result)
      if (result) {
        setCurrentPath([...completePath]);
        //const keys: string[] = Object.keys(path);
        setLines([...lines, `Vous êtes à ${result.name}`]);
      }
    } else {
      setLines([...lines, "Commande inconnue"]);
    }

    setInputValue("");
    //trouverValeur(paths, ["Départ", "École", "PorteEntrée"]);
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
