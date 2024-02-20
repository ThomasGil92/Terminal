import { useEffect, useState } from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import styles from "../page.module.scss";
import { Lines } from "@/utils/@Types";

function TypingParagraph({
  text,
  reference,
}: {
  text: Lines;
  reference: React.MutableRefObject<HTMLElement | null>;
}) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [delay, setDelay] = useState(5);
  useEffect(() => {
    let currentIndex = 1;
    let delay = 5;
    const timer = setInterval(() => {
      // Mise à jour du délai en fonction du caractère courant
      if (currentIndex < text.sentence.length) {
        const currentChar = text.sentence[currentIndex];
        delay = currentChar === "." ? 200 : 5;
      }

      // Mettre à jour le texte affiché
      setDisplayedText(text.sentence.slice(0, currentIndex + 1));
      currentIndex++;

      // Arrêt de l'intervalle lorsque nous avons affiché tout le texte
      if (currentIndex >= text.sentence.length) {
        clearInterval(timer);
      }
    }, delay); // Utilisation du délai actuel

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const scrollY = reference.current!.scrollHeight;
    reference.current?.scrollTo(0, scrollY);
  }, [displayedText]);

  switch (text.tag.name) {
    case "p":
      const cleanHtml = DOMPurify.sanitize(displayedText, {
        ALLOWED_TAGS: ["span", "br"],
        ADD_ATTR: ["class"],
      });
      return (
        <>
          <p
            className={`displayedLine ${text.tag.classes}`}
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          ></p>
        </>
      );
    case "img":
      return (
        <div className='img_container'>
          {" "}
          <Image
            alt={displayedText}
            src={text.tag.img}
            className={`${styles.displayedLine} ${text.tag.classes}`}
            width={300}
            height={300}
          />
        </div>
      );
    case "li":
      return (
        <li className={`displayedLine ${text.tag.classes}`}>{displayedText}</li>
      );
    case "br":
      return (
        <>
          <br />
          <br />
        </>
      );
  }
  //return <p className={styles.displayedLine}>{displayedText}</p>;
}

export default TypingParagraph;
