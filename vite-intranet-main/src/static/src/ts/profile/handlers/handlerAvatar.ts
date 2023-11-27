import { ProfileAPI } from "../../../js/API/profileApi";

// Обработчик события на изменение аватара
export const handlerAvatar = (profileId: number, requestFunction: Function) => {
  const avatarForm: HTMLFormElement = document.querySelector(
    ".profile__avatar-form"
  );
  const inputAvatar: HTMLInputElement = avatarForm.querySelector(
    ".profile__input-avatar"
  );

  const buttonDeleteAvatar: HTMLButtonElement = document.querySelector(
    ".profile-data__photo-remove"
  );
  inputAvatar.addEventListener("change", (evt) => {
    const input = evt.target as HTMLInputElement;
    const parent: HTMLElement = input.closest(".profile-data__photo");
    const statusAvatar: string = parent.dataset.avatar;
    const idAvatar: string = parent.dataset.id;
    const data = new FormData(avatarForm);
    if (statusAvatar === "false" || idAvatar === "") {
      ProfileAPI.postCreateAvatar(data, profileId, requestFunction);
    } else if (statusAvatar === "true" && idAvatar) {
      ProfileAPI.updateAvatar(data, profileId, idAvatar, requestFunction);
    }
  });

  buttonDeleteAvatar.addEventListener("click", (evt) => {
    const button = evt.target as HTMLButtonElement;
    const avatarWrapper = button.previousElementSibling as HTMLElement;
    const avatarId: string = avatarWrapper.dataset.id;
    ProfileAPI.deleteAvatar(profileId, avatarId, requestFunction);
  });
};
