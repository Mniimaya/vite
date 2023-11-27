// Helpers;
import { redirectTo } from "../../../../redirect-to";
import { VacancyPage, Mode } from "../../../../../const";

// Templates;
const template = document.querySelector(
  `.template--draft-hr-actions`
) as HTMLTemplateElement;

export const createHrActions = (
  container: HTMLElement,
  data: { id: number }
) => {
  const hrActionsElement = (template.content.cloneNode(true) as HTMLElement)
    .firstElementChild;

  const editButton = hrActionsElement.querySelector(`.vacancy-button--edit`);
  const deleteButton = hrActionsElement.querySelector(
    `.vacancy-button--delete`
  );

  editButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    redirectTo(
      `/service/vacancy/${VacancyPage.FORM}?mode=${Mode.EDIT}&id=${data.id}`
    );
  });

  deleteButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    console.log(`TODO: Сделать изменение статуса на 0`);
  });

  container.append(hrActionsElement);
};
