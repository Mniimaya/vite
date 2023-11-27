import { showMessage } from "../util";

type TYPE_FILE = {
  type: string;
  size: number;
};
type TYPE_IMAGES = "jpeg" | "jpg" | "png" | "webp";
type TYPE_PDF = "pdf";
type TYPE_VIDEO = "mp4";
type TYPE_ALLOW_EXTENSION = TYPE_IMAGES | TYPE_VIDEO | TYPE_PDF;

export const validateFile = (
  input: HTMLInputElement,
  types: TYPE_ALLOW_EXTENSION[],
  amount: number,
  maxsize: number = 18000000
) => {
  if (input.files.length > amount) {
    input.value = "";
    showMessage("Превышено максимальное количество 8 фотографий");
    return false;
  }
  if (input.files.length) {
    for (let i = 0; i < input.files.length; i++) {
      const validType = types.some(
        (type) =>
          type.toLowerCase() ===
          input.files[i].type.replace(/(.*)\//g, "").toLowerCase()
      );
      if (input.files[i].size > maxsize) {
        input.value = "";
        showMessage("Превышен максимальный размер файла 18мб");
        return false;
      }
      if (!validType) {
        input.value = "";
        showMessage("Допустимый формат для размещения jpg, png, webp");
        input.value = "";
        return false;
      }
    }
  }
  return true;
};
