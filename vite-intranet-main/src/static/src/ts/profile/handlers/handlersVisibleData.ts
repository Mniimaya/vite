import { typeRequestVisible } from "../maps";

export const handlerRequestVisibleData = (
  evt: Event,
  profileId: number,
  requestFunction: Function
) => {
  const button = evt.target as HTMLButtonElement;
  const parent: HTMLElement = button.closest(".profile-data__container");
  const category: string = parent.dataset.category;
  const currentStatus = button.dataset.status;
  const body: any = {};
  if (currentStatus === "visible") {
    body.visible = false;
    button.dataset.status = "hidden";
  } else if (currentStatus === "hidden") {
    body.visible = true;
    button.dataset.status = "visible";
  }

  if (category === "personal") {
    const status: string = button.dataset.visibleYear;
    body.visible_year = Boolean(status);
  } else if (category === "career-achievements") {
    body.kind = "Career";
    body.profile_id = profileId;
  } else if (category === "personal-achievements") {
    body.kind = "Personal";
    body.profile_id = profileId;
  } else if (category === "job") {
    body.profile_id = profileId;
  }

  const functionRequest = typeRequestVisible.get(category);
  functionRequest(body, profileId, requestFunction);
};

// Обработчик скрытия информации
export const handlerHiddenData = (
  profileId: number,
  requestFunction: Function
) => {
  const handlerVisibleButtons: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".profile-visible-button");
  handlerVisibleButtons.forEach((button) => {
    button.addEventListener("click", (evt) => {
      handlerRequestVisibleData(evt, profileId, requestFunction);
    });
  });
};
