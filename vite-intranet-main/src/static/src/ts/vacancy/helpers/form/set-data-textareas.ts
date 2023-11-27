// Types;
import { TYPE_BALLONS } from "../../types/ballons";

type TYPE_DATA = {
  functional: string;
  wishes: string;
  advantages: string;
  offering: string;
};

export const setDataTextareas = (ballons: TYPE_BALLONS[], data: TYPE_DATA) => {
  ballons.forEach((ballon) => {
    ballon.then((editor) => {
      editor.setData(data[editor.customName as keyof TYPE_DATA] || ``);
    });
  });
};
