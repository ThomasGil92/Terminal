'use client'
import { useRef } from "react";
import styles from "@/app/page.module.scss";

import TypingParagraph from "@/app/components/TypingParagraph";
import { Lines } from "@/utils/@Types";

const TerminalText = ({lines}:{lines:Lines[]}) => {
    
  const displayedLinesSectionRef = useRef<HTMLElement | null>(null);
  return (
    <section
      className="displayedTextSection"
      ref={displayedLinesSectionRef}
    >
      {lines.length!==0 &&
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
  );
};
export default TerminalText;
