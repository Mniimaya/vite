// Templates;
const template = document.querySelector(
  `.template-modal--edit-participants`
) as HTMLTemplateElement;

export const createEditParticipants = () => {
  const editParticipantsElement = (
    template.content.cloneNode(true) as HTMLElement
  ).firstElementChild;

  const closeModalButton = editParticipantsElement.querySelector(
    `.vacancy-modal__close`
  );

  closeModalButton.addEventListener(`click`, () => {
    editParticipantsElement.remove();
  });

  document.body.append(editParticipantsElement);
};
