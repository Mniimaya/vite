import { handlerAddClass } from "./utils/addValidationClass";

// Маска телефона
export const maskTel = (selector: string, masked = "+7 (___) ___-__-__") => {
  const elems = document.querySelectorAll(selector);

  function mask(event: any) {
    const keyCode = event.keyCode;
    const template = masked,
      def = template.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
    let i = 0,
      newValue = template.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
    i = newValue.indexOf("_");
    if (i !== -1) {
      newValue = newValue.slice(0, i);
    }
    let reg: any = template
      .substr(0, this.value.length)
      .replace(/_+/g, function (a) {
        return "\\d{1," + a.length + "}";
      })
      .replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (
      !reg.test(this.value) ||
      this.value.length < 5 ||
      (keyCode > 47 && keyCode < 58)
    ) {
      this.value = newValue;
    }
    if (event.type === "blur" && this.value.length < 5) {
      this.value = "";
    }
  }

  for (const elem of elems) {
    elem.addEventListener("input", mask);
    elem.addEventListener("focus", mask);
    elem.addEventListener("blur", mask);
  }
};

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const validationDate = (date: string) => {
  console.log(date);

  if (date) {
    const inputDate = new Date(date);
    const currentDate = new Date();
    if (inputDate < currentDate) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

// Валидация сервисных данных
const validationServiceData = (
  form: HTMLFormElement | HTMLElement,
  inputElement: HTMLInputElement | HTMLSelectElement | undefined = undefined
): boolean => {
  let validateValue: boolean[] = [false];
  const projectWrapper = form.querySelector(
    ".profile__form-fieldset-template--project"
  );
  const projectsValidationItems = projectWrapper.querySelectorAll(
    `.profile__form-clone-item:not(.profile__form-clone-item[data-status="empty"])`
  );

  projectsValidationItems.forEach((wrapper) => {
    const selectProject = wrapper.querySelector("select");
    if (selectProject.value === "placeholder") {
      selectProject.classList.add("invalid");
    } else {
      selectProject.classList.add("invalid");
    }
  });

  const invalidInput = form.querySelectorAll("ivalid");

  if (invalidInput.length) {
    validateValue[0] = false;
  } else {
    validateValue[0] = true;
  }

  return validateValue[0];
};

// Валидация персональных данных
const validatePersonalData = (
  form: HTMLFormElement | HTMLElement,
  inputElement: HTMLInputElement | HTMLSelectElement | undefined = undefined
): boolean => {
  let validateValue: boolean[] = [false];
  function instructions(input: HTMLInputElement | HTMLSelectElement) {
    if (input.name === "birthday") {
      if (!validationDate(input.value)) {
        input.classList.add("invalid");
      } else {
        input.classList.remove("invalid");
      }
    } else if (input.name === "mobile") {
      if (
        (input.value.length > 4 && input.value.length < 18) ||
        (input.value.length > 4 && input.value.length > 18)
      ) {
        input.classList.add("invalid");
      } else if (
        input.value.length === 4 ||
        input.value.length === 0 ||
        input.value.length === 18
      ) {
        input.classList.remove("invalid");
      }
    } else if (input.name === "email" && input.value !== "") {
      if (!EMAIL_REGEXP.test(input.value)) {
        input.classList.add("invalid");
      } else {
        input.classList.remove("invalid");
      }
    } else if (
      !input.value &&
      input.name !== "email" &&
      input.name !== "mobile"
    ) {
      input.classList.add("invalid");
    } else {
      input.classList.remove("invalid");
    }
  }
  const inputs = [
    ...form.querySelectorAll(".validation"),
  ] as HTMLInputElement[];
  if (inputElement === undefined) {
    inputs.forEach((input) => {
      instructions(input);
    });

    const validationInputs = inputs.filter((el) =>
      el.classList.contains("invalid")
    );

    if (!validationInputs.length) {
      validateValue[0] = true;
    }
  } else {
    instructions(inputElement);
  }

  return validateValue[0];
};

// Валидация документов
const validateDocumentsData = (
  form: HTMLFormElement | HTMLElement,
  inputElement: HTMLInputElement | HTMLSelectElement | undefined = undefined
): boolean => {
  let validateValue: boolean[] = [false];
  function instructions(input: HTMLInputElement | HTMLSelectElement) {
    if (input.name === "name" && input.value === "placeholder") {
      input.classList.add("invalid");
    } else if (input.name === "date_off_issue") {
      if (!validationDate(input.value)) {
        input.classList.add("invalid");
      } else {
        input.classList.remove("invalid");
      }
    } else if (!input.value) {
      input.classList.add("invalid");
    } else {
      input.classList.remove("invalid");
    }
  }
  const wrappers = [
    ...form.querySelectorAll(
      `.profile__form-clone-item:not(.profile__form-clone-item[data-status="empty"])`
    ),
  ] as HTMLElement[];

  if (inputElement === undefined) {
    wrappers.forEach((wrapper) => {
      const inputs = [
        ...wrapper.querySelectorAll(".validation"),
      ] as HTMLInputElement[];
      inputs.forEach((input) => {
        instructions(input);
      });
    });

    const validationInputs = [
      ...form.querySelectorAll(
        `.profile__form-clone-item:not(.profile__form-clone-item[data-status="empty"]) .validation`
      ),
    ].filter((el) => el.classList.contains("invalid")) as
      | HTMLInputElement[]
      | HTMLSelectElement[];

    if (!validationInputs.length) {
      validateValue[0] = true;
    }
  } else {
    instructions(inputElement);
  }

  return validateValue[0];
};

// Валидация образования
const validateEducationData = (
  form: HTMLFormElement | HTMLElement,
  inputElement: HTMLInputElement | HTMLSelectElement | undefined = undefined
): boolean => {
  let validateValue: boolean[] = [false];
  function instructions(input: HTMLInputElement | HTMLSelectElement) {
    if (
      (input.name === "date_off_issue" && input.value.length < 4) ||
      (input.name === "date_off_issue" && input.value.length > 4)
    ) {
      input.classList.add("invalid");
    } else if (input.name === "degree" && input.value === "placeholder") {
      input.classList.add("invalid");
    } else if (!input.value) {
      input.classList.add("invalid");
    } else {
      input.classList.remove("invalid");
    }
  }
  const wrappers = [
    ...form.querySelectorAll(
      `.profile__form-clone-item:not(.profile__form-clone-item[data-status="empty"])`
    ),
  ] as HTMLElement[];

  if (inputElement === undefined) {
    wrappers.forEach((wrapper) => {
      const inputs = [
        ...wrapper.querySelectorAll(".validation"),
      ] as HTMLInputElement[];
      inputs.forEach((input) => {
        instructions(input);
      });
    });

    const validationInputs = [
      ...form.querySelectorAll(
        `.profile__form-clone-item:not(.profile__form-clone-item[data-status="empty"]) .validation`
      ),
    ].filter((el) => el.classList.contains("invalid")) as
      | HTMLInputElement[]
      | HTMLSelectElement[];

    if (!validationInputs.length) {
      validateValue[0] = true;
    }
  } else {
    instructions(inputElement);
  }

  return validateValue[0];
};

// Валидация работы
const validateWorksData = (
  form: HTMLFormElement | HTMLElement,
  inputElement: HTMLInputElement | HTMLSelectElement | undefined = undefined
): boolean => {
  let validateValue: boolean[] = [false];
  function instructions(input: HTMLInputElement | HTMLSelectElement) {
    if (input.name === "date_start" && !input.value) {
      input.nextElementSibling.textContent = "Укажите дату начала";
    } else if (input.name === "date_end" && !input.value) {
      input.nextElementSibling.textContent = "Укажите дату окончания";
    }
    if (!input.value) {
      input.classList.add("invalid");
    } else {
      input.classList.remove("invalid");
    }
  }
  const inputsWrapper: NodeListOf<HTMLElement> = form.querySelectorAll(
    ".profile__form-clone-item"
  );

  inputsWrapper.forEach((wrapper) => {
    const dateStart = wrapper.querySelector(
      'input[name="date_start"]'
    ) as HTMLInputElement;
    const dateEnd = wrapper.querySelector(
      'input[name="date_end"]'
    ) as HTMLInputElement;
    const dateStartValue: string[] = dateStart.value.split("-");
    const dateStartNumber = dateStartValue.map((item: string) => +item) as [
      number,
      number,
      number
    ];
    const dateEndValue = dateEnd.value.split("-");
    const dateEndNumber = dateEndValue.map((item: string) => +item) as [
      number,
      number,
      number
    ];
    const newDateStart = new Date(...dateStartNumber).getTime();
    const newDateEnd = new Date(...dateEndNumber).getTime();
    if (newDateStart > newDateEnd) {
      dateStart.classList.add("invalid");
      dateStart.nextElementSibling.textContent =
        "Дата начала не может быть позже даты окончания";
      dateEnd.classList.add("invalid");
      dateEnd.nextElementSibling.textContent =
        "Дата окончания не может быть ранее даты начала";
    } else if (!dateStart.value) {
      dateStart.classList.add("invalid");
    } else if (!dateEnd.value) {
      dateEnd.classList.add("invalid");
    } else {
      dateStart.classList.remove("invalid");
      dateStart.nextElementSibling.textContent = "";
      dateEnd.classList.remove("invalid");
      dateEnd.nextElementSibling.textContent = "";
    }
    if (inputElement === undefined) {
      wrapper
        .querySelectorAll('.validation:not(input[type="date"])')
        .forEach((input: HTMLInputElement) => {
          instructions(input);
        });
    } else {
      instructions(inputElement);
    }
  });

  const wrappers = [
    ...form.querySelectorAll(
      `.profile__form-clone-item:not(.profile__form-clone-item[data-status="empty"])`
    ),
  ] as HTMLElement[];

  if (inputElement === undefined) {
    wrappers.forEach((wrapper) => {
      const inputs = [
        ...wrapper.querySelectorAll(".validation"),
      ] as HTMLInputElement[];
      inputs.forEach((input) => {
        instructions(input);
      });
    });

    const validationInputs = [
      ...form.querySelectorAll(
        `.profile__form-clone-item:not(.profile__form-clone-item[data-status="empty"]) .validation`
      ),
    ].filter((el) => el.classList.contains("invalid")) as
      | HTMLInputElement[]
      | HTMLSelectElement[];

    if (!validationInputs.length) {
      validateValue[0] = true;
    }
  } else {
    instructions(inputElement);
  }

  return validateValue[0];
};

// Валидация достижений
const validateAchievementsData = (
  form: HTMLFormElement | HTMLElement,
  inputElement: HTMLInputElement | HTMLSelectElement | undefined = undefined
): boolean => {
  let validateValue: boolean[] = [false];
  function instructions(input: HTMLInputElement | HTMLSelectElement) {
    if (input.name === "type" && input.value === "placeholder") {
      input.classList.add("invalid");
    } else if (
      (input.name === "year" && input.value.length < 4) ||
      (input.name === "year" && input.value.length > 4)
    ) {
      input.classList.add("invalid");
    } else if (!input.value) {
      input.classList.add("invalid");
    } else {
      input.classList.remove("invalid");
    }
  }
  const wrappers = [
    ...form.querySelectorAll(
      `.profile__form-clone-item:not(.profile__form-clone-item[data-status="empty"])`
    ),
  ] as HTMLElement[];

  if (inputElement === undefined) {
    wrappers.forEach((wrapper) => {
      const inputs = [
        ...wrapper.querySelectorAll(".validation"),
      ] as HTMLInputElement[];
      inputs.forEach((input) => {
        instructions(input);
      });
    });

    const validationInputs = [
      ...form.querySelectorAll(
        `.profile__form-clone-item:not(.profile__form-clone-item[data-status="empty"]) .validation`
      ),
    ].filter((el) => el.classList.contains("invalid")) as
      | HTMLInputElement[]
      | HTMLSelectElement[];

    if (!validationInputs.length) {
      validateValue[0] = true;
    }
  } else {
    instructions(inputElement);
  }

  return validateValue[0];
};

// Валидация транспорта
const validateTransportData = (
  form: HTMLFormElement | HTMLElement,
  inputElement: HTMLInputElement | HTMLSelectElement | undefined = undefined
): boolean => {
  let validateValue: boolean[] = [false];
  function instructions(input: HTMLInputElement | HTMLSelectElement) {
    if (input.name === "type" && input.value === "placeholder") {
      input.classList.add("invalid");
    } else if (!input.value) {
      input.classList.add("invalid");
    } else {
      input.classList.remove("invalid");
    }
  }
  const wrappers = [
    ...form.querySelectorAll(
      `.profile__form-clone-item:not(.profile__form-clone-item[data-status="empty"])`
    ),
  ] as HTMLElement[];

  if (inputElement === undefined) {
    wrappers.forEach((wrapper) => {
      const inputs = [
        ...wrapper.querySelectorAll(".validation"),
      ] as HTMLInputElement[];
      inputs.forEach((input) => {
        instructions(input);
      });
    });

    const validationInputs = [
      ...form.querySelectorAll(
        `.profile__form-clone-item:not(.profile__form-clone-item[data-status="empty"]) .validation`
      ),
    ].filter((el) => el.classList.contains("invalid")) as
      | HTMLInputElement[]
      | HTMLSelectElement[];

    if (!validationInputs.length) {
      validateValue[0] = true;
    }
  } else {
    instructions(inputElement);
  }

  return validateValue[0];
};

// Основная функция распределяющая валидацию
export const handlerValidation = (
  form: HTMLFormElement | HTMLElement,
  elementValidation:
    | HTMLInputElement
    | HTMLSelectElement
    | undefined = undefined
): boolean => {
  const typeData = form.dataset.type;
  let validateValue: boolean;
  if (typeData === "service") {
    validateValue = validationServiceData(
      form,
      elementValidation !== undefined ? elementValidation : undefined
    );
  } else if (typeData === "personal") {
    validateValue = validatePersonalData(
      form,
      elementValidation !== undefined ? elementValidation : undefined
    );
  } else if (typeData === "documents") {
    validateValue = validateDocumentsData(
      form,
      elementValidation !== undefined ? elementValidation : undefined
    );
  } else if (typeData === "educations") {
    validateValue = validateEducationData(
      form,
      elementValidation !== undefined ? elementValidation : undefined
    );
  } else if (typeData === "works") {
    validateValue = validateWorksData(
      form,
      elementValidation !== undefined ? elementValidation : undefined
    );
  } else if (
    typeData === "career-achievements" ||
    typeData === "personal-achievements"
  ) {
    validateValue = validateAchievementsData(
      form,
      elementValidation !== undefined ? elementValidation : undefined
    );
  } else if (typeData === "transport") {
    validateValue = validateTransportData(
      form,
      elementValidation !== undefined ? elementValidation : undefined
    );
  } else {
    validateValue = false;
  }

  if (elementValidation === undefined) {
    return validateValue;
  }
};

// Добавляет обработчики событий на ипнпуты которые нужно валидировать
export const addInputValidate = (
  elements: NodeListOf<HTMLInputElement | HTMLSelectElement>
) => {
  elements.forEach((element) => {
    element.addEventListener("change", addClassValidate);
  });

  elements.forEach((element) => {
    element.addEventListener("change", handlerCallValidation);
  });
};

// Удаляет обработчики событий которые нужно валидировать
export const removeInputValidate = (
  elements: NodeListOf<HTMLInputElement | HTMLSelectElement>
) => {
  elements.forEach((element) => {
    element.removeEventListener("change", addClassValidate);
  });

  elements.forEach((element) => {
    element.removeEventListener("change", handlerCallValidation);
  });
};

// Добавояет класс по котрому нужно валидировать инпуты
const addClassValidate = (evt: Event) => {
  const eventInput = evt.target as HTMLInputElement | HTMLSelectElement;
  eventInput.classList.add("validation");
};

// Вызывает валидацию инпута при событии change
const handlerCallValidation = (evt: Event) => {
  const eventInput = evt.target as HTMLInputElement | HTMLSelectElement;
  const parentInput: HTMLFormElement = eventInput.closest(".profile__form");
  handlerValidation(parentInput, eventInput);
};

// Обработчик добавления класса валидации в модальное окно персональных данных
export const handlerAddValidationPersonal = (modal: HTMLElement) => {
  modal
    .querySelector('input[name="mobile"]')
    .addEventListener("change", handlerAddClass);
  modal
    .querySelector('input[name="email"]')
    .addEventListener("change", handlerAddClass);
  modal
    .querySelector('input[name="birthday"]')
    .addEventListener("change", handlerAddClass);
};
