"use client";
import styles from "@/app/page.module.scss";
import { useEffect, useRef, useState } from "react";

const TerminalForm = ({
  handleFormSubmit,
}: {
  handleFormSubmit: (inputPaths: string[], inputValue: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    let inputPaths = inputValue.split(" ")[1]?.split("/");

    handleFormSubmit(inputPaths, inputValue);
    setInputValue("");
  };
  return (
    <>
      <form
        id='form_element'
        data-testid='form'
        className="main__form"
        onSubmit={handleTerminalinput}
      >
        ${" "}
        <input
          id='input'
          data-testid='input'
          ref={inputRef}
          type='text'
          className="main__form__input"
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>
    </>
  );
};

export default TerminalForm;
