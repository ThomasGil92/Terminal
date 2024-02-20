'use client'
import { usePathObject } from "../useCases/usePathsObject";
import TerminalForm from "./TerminalForm";
import TerminalText from "./TerminalText";
import styles from "@/app/page.module.scss";

const TerminalPresenter = () => {
  const { handleFormSubmit,lines } = usePathObject();
  return (
    <main className="main">
      <TerminalText lines={lines}/>
      <TerminalForm handleFormSubmit ={handleFormSubmit}/>
    </main>
  );
};

export default TerminalPresenter;
