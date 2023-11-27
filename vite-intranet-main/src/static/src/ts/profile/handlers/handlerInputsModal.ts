export const handlerInputsModalPersonal = () => {
  const inputVisibleYear: HTMLInputElement = document.querySelector(
    'input[data-name="visible_year"]'
  );
  inputVisibleYear.addEventListener("change", (evt) => {
    const input = evt.target as HTMLInputElement;
    if (input.checked) {
      input.value = "false";
    } else {
      input.value = "true";
    }
  });
};
