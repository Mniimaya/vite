import BalloonEditor from "./ckeditor.js";

BalloonEditor.create(document.querySelector(".editor"), {
  licenseKey: "",
})
  .then((editor) => {
    window.editor.first = editor;
  })
  .catch((error) => {
    console.error("Oops, something went wrong!");
    console.error(
      "Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:"
    );
    console.warn("Build id: 4t79nnx03led-uxijcfbluev2");
    console.error(error);
  });

BalloonEditor.create(document.querySelector(".editor-admin"), {
  licenseKey: "",
})
  .then((editor) => {
    window.editor.second = editor;
  })
  .catch((error) => {
    console.error("Oops, something went wrong!");
    console.error(
      "Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:"
    );
    console.warn("Build id: 4t79nnx03led-uxijcfbluev2");
    console.error(error);
  });
