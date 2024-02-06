import { useEffect, useState } from "react";
import styles from "../page.module.css";

function TypingParagraph({
  text,
  reference,
}: {
  text: string;
  reference: React.MutableRefObject<HTMLElement | null>;
}) {
  const [displayedText, setDisplayedText] = useState<string>("");

  useEffect(() => {
    let currentIndex = 1;
    setDisplayedText(text.slice(0, 0));
    const timer = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const scrollY = reference.current!.scrollHeight;
    reference.current?.scrollTo(0, scrollY);
  }, [displayedText]);

  return <p className={styles.displayedLine}>{displayedText}</p>;
}

export default TypingParagraph;
