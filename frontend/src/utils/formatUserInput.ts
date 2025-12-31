// expected input format: login - minutes - seconds - 24 hour time - task - station - manager
// example: rooty 25m 14s 19:55 Each Transfer In dz-P-A3122 donty

import { type FormattedMiss } from "../types/FormattedMiss";

const formatUserInput = (unformattedInput: string | null) => {
  let formattedInput: string[] = [];
  if (unformattedInput) {
    formattedInput = unformattedInput
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
      // consistency: removes any whitespace amount, adds a single space
      .replaceAll("each transfer in", "each-transfer-in")
      .replaceAll("stow to prime", "stow-to-prime")
      .split(" ");
  }

  const formattedMisses: FormattedMiss[] = [];
  const segmentsSize = 7;

  if (formattedInput.length > 0) {
    for (let i = 0; i < formattedInput.length; i += segmentsSize) {
      const segment = formattedInput.slice(i, i + segmentsSize);
      if (segment[5])
        // required to fix: Uncaught TypeError: can't access property "replace", segment[5] is undefined
        formattedMisses.push({
          login: segment[0],
          missTime: segment[3],
          station: segment[5].replace("dz-p-a", ""),
        });
    }
  }

  return formattedMisses;
};

export default formatUserInput;
