import { initialInputs } from "./initial-inputs";
import { initialCheckboxs } from "./initial-checkboxs";
import { initialRadios } from "./initial-radios";
import { initialSelects } from "./initial-selects";
import { initialTextareas } from "./initial-textareas";

// types
import type { TYPE_BALLONS } from "../../types/ballons";

export const initial = (form: HTMLFormElement, ballons: TYPE_BALLONS[]) => {
  initialInputs(form);
  initialCheckboxs(form);
  initialRadios(form);
  initialSelects(form);
  initialTextareas(form, ballons);
};
