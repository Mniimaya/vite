// Template;
const template = document.querySelector(
  `.template-modal--approve-sheet`
) as HTMLTemplateElement;

export const createApproveSheet = () => {
  const approveSheetElement = (template.content.cloneNode(true) as HTMLElement)
    .firstElementChild;

  const closeModalButton = approveSheetElement.querySelector(
    `.vacancy-modal__close`
  );

  closeModalButton.addEventListener(`click`, () => {
    approveSheetElement.remove();
  });

  document.body.append(approveSheetElement);
};
