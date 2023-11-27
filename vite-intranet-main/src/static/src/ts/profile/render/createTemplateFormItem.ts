import { addInputValidate } from "../profile-validation";
import { handlerClearField } from "../handlers/handlerClearField";
import { handlerRemoveFormItem } from "../handlers/handlerRemoveFormItem";
import { handlerDocumentSelect } from "../handlers/handlerDocumentSelect";
import { handlerUpdateCreatedData } from "../handlers/handlerUpdateCreatedData";

// Рендерит шаблон поля в нужный родитель
const renderFormItem = (
  item: HTMLElement,
  wrapper: HTMLElement,
  status: string | undefined = undefined
) => {
  wrapper.appendChild(item);

  wrapper.scrollIntoView({ block: "end", behavior: "smooth" });
  if (status !== undefined) {
    const wrapperItem: HTMLElement = wrapper.querySelector(
      '.profile__form-clone-item[data-status="new"]'
    );
    const inputs: NodeListOf<HTMLInputElement | HTMLSelectElement> =
      wrapperItem.querySelectorAll(".validation");
    addInputValidate(inputs);
  }
  handlerClearField(item);

  if (wrapper.closest("#personal-documents")) {
    const selects = wrapper.querySelectorAll("select");
    selects.forEach((select) =>
      select.addEventListener("change", (e) => {
        const currentSelect = e.target as HTMLSelectElement;
        handlerDocumentSelect(currentSelect);
      })
    );
  }
};

// Создание нового поля формы данных
export const createTemplateFormItem = (
  modal: HTMLElement,
  wrapper: HTMLElement,
  isButtonRemove = true,
  isStatus = "created"
) => {
  const template: HTMLTemplateElement = modal.querySelector(".main-template");
  const templateClone = template.content.cloneNode(true) as HTMLElement;
  const buttonRemoveItem: HTMLButtonElement = templateClone.querySelector(
    ".profile__form-button-delete"
  );

  templateClone
    .querySelector(".profile__form-clone-item")
    .setAttribute("data-status", `${isStatus}`);
  templateClone
    .querySelectorAll(".profile__clear-wrapper")
    .forEach((item: HTMLElement) => handlerClearField(item));
  renderFormItem(
    templateClone,
    wrapper,
    isStatus === "new" ? "new" : undefined
  );

  if (isStatus === "empty") {
    handlerUpdateCreatedData(modal, "empty");
  }

  if (buttonRemoveItem) {
    if (isButtonRemove) {
      handlerRemoveFormItem(buttonRemoveItem);
    } else {
      buttonRemoveItem.remove();
    }
  }
};
