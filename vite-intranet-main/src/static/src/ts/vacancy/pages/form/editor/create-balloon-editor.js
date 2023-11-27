import BalloonEditor from "../../../../../js/libraries/ckeditor.js";

export const createBalloonEditor = async (element) => {
  try {
    const editor = await BalloonEditor.create(element);
    editor.customName = element.dataset.name;
    return editor;
  } catch (error) {
    console.error(`CKEditor error: ${error}`);
  }
};
