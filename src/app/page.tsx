"use client";
import TypingParagraph from "./components/TypingParagraph";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import { isCommand, findPath } from "@/utils";
import { paths } from "@/utils/paths";

export default function Home() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentPlace, setCurrentPlace] = useState("Départ");
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
    //setLines([...lines, inputValue]);
    setInputValue("");
    //console.log(isCommand(inputValue))
    const inputPaths = inputValue.split(" ")[1].split("/");
    
    if (isCommand(inputValue)) {
      const path = findPath(paths, inputPaths);
      console.log(path)
      if(path){
      //const keys: string[] = Object.keys(path);
      setLines([
        ...lines,
        `Vous êtes à ${path.name}`,
      ]);
      }
      
    } else {
      setLines([...lines, "Commande inconnue"]);
    }
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
