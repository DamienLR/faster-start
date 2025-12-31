import { useState } from "react";
import { Button, TextInput } from "@mantine/core";
import formatUserInput from "../../utils/formatUserInput";
import MissesTables from "../Tables";
import { type FormattedMiss } from "../../types/FormattedMiss";

const Form = () => {
  const [formValue, setFormValue] = useState<string>("");
  const [formattedMisses, setFormattedMisses] = useState<FormattedMiss[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormattedMisses(formatUserInput(formValue));
    setFormValue("");
  };

  const handleClick = () => {
    setFormattedMisses(formatUserInput(formValue));
    setFormValue("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput
          placeholder="Paste data here..."
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <Button onClick={handleClick}>Format</Button>
      </form>
      <MissesTables formattedMisses={formattedMisses} />
    </div>
  );
};

export default Form;
