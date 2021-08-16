import { v4 as uuidv4 } from "uuid";
import type { ItemProp } from "./types";

export const blurOnKey: svelte.JSX.KeyboardEventHandler<HTMLInputElement> = (event) => {
  const { code } = event;
  if (code === "Enter" || code === "Escape" || code === "Tab") {
    event.currentTarget.blur();
  }
};

export function getGuid(): string {
  return uuidv4();
}

export function sortOnName(array: ItemProp[]) {
  array.sort((el1, el2) => el1.name.toLowerCase().localeCompare(el2.name.toLowerCase()));
  return array;
}
