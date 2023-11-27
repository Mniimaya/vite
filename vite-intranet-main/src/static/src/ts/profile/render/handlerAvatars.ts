const handlerAvatar = (status: boolean) => {
  const photoWrapper: HTMLElement = document.querySelector(
    ".profile-data__photo"
  );
  if (status) {
  } else {
    photoWrapper.style.backgroundImage = `url('/assets/profile/no-avatar.png')`;
    photoWrapper.querySelector(".profile-data__photo-remove").remove();
    photoWrapper.querySelector(".profile__avatar-form").remove();
  }
};
