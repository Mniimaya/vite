// Helpers;
import { redirectTo } from "../../../../redirect-to";
import { VacancyPage } from "../../../../../const";
import { VacancyStatus } from "../../../../../const";
import { Mode } from "../../../../../const";

// Api;
import { VacancyAPI } from "../../../../../../../js/API/vacancyApi";

// Templates;
const template = document.querySelector(
  `.template--vacancy-card--hr-actions`
) as HTMLTemplateElement;

export const createHrActions = (
  container: HTMLElement,
  data: { id: number }
) => {
  const hrActionsElement = (template.content.cloneNode(true) as HTMLElement)
    .firstElementChild;

  const editButton = hrActionsElement.querySelector(
    `.vacancy-request-button--edit`
  );
  const archiveButton = hrActionsElement.querySelector(
    `.vacancy-request-button--delete`
  );

  editButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    redirectTo(
      `/service/vacancy/${VacancyPage.FORM}?mode=${Mode.EDIT}&id=${data.id}`
    );
  });

  archiveButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    VacancyAPI.patchVacancy(data.id, { status: VacancyStatus.ARCHIVE }).then(
      () => location.reload()
    );
  });

  container.append(hrActionsElement);
};
