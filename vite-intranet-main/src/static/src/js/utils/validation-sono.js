//валидация SONO
export const validSono = () => {
  // Поиск всех input-элементов в DOM, которые привязаны к datalist с помощью атрибута list.
  const inputs = document.querySelectorAll("input[list]");
  function handlerInput() {
    let optionFound = false,
      datalist = this.list;
    // Определение, существует ли option с текущим значением input.
    for (let j = 0; j < datalist.options.length; j++) {
      if (this.value == datalist.options[j].value) {
        optionFound = true;
        break;
      }
    }
    // используйте функцию setCustomValidity API проверки ограничений валидации
    // чтобы обеспечить ответ пользователю, если нужное значение в datalist отсутствует
    if (optionFound) {
      this.setCustomValidity("");
    } else {
      this.setCustomValidity("Пожалуйста укажите СОНО в формате n7000");
    }
  }
  for (let i = 0; i < inputs.length; i++) {
    // Когда значение input изменяется…
    inputs[i].removeEventListener("change", handlerInput);

    inputs[i].addEventListener("change", handlerInput);
  }
};
