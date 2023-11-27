import { TYPE_PROFILE_AVATAR } from "../../TYPES";
import { apiPath } from "../../../main";

//Рендер аватара
export const renderAvatar = (avatars: TYPE_PROFILE_AVATAR[]) => {
  const avatarWrapper: HTMLElement = document.querySelector(
    ".profile-data__photo"
  );
  const avatarImg: HTMLImageElement =
    avatarWrapper.querySelector(".profile__avatar");
  if (!!avatars.length) {
    avatarWrapper.setAttribute("data-avatar", "true");
    avatarImg.src = `${apiPath}${avatars[0].avatar_src}`;
    avatarWrapper.dataset.id = `${avatars[0].id}`;
  } else {
    avatarWrapper.dataset.avatar = "false";
    avatarWrapper.dataset.id = "";
  }
};
