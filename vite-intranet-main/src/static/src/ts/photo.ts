const photoButton = document.querySelectorAll(`.draft__button`);
const photoContainer = document.querySelector(`.photo `);

photoButton.forEach((btn) => {
  btn.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    const photoImage = document.querySelector(`.photo__image`) as HTMLImageElement;

    photoContainer.classList.remove(`photo__nodisplay`);
    photoImage.src = (evt.target as HTMLButtonElement).dataset.src;
  });
});

photoContainer.addEventListener(`click`, () => {
  photoContainer.classList.add(`photo__nodisplay`);
});
