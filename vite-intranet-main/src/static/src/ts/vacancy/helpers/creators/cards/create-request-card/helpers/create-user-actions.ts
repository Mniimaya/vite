// Templates;
const template = document.querySelector(
  `.template--request-user-actions`
) as HTMLTemplateElement;

export const createUserActions = (): HTMLElement => {
  const actionsElement = (template.content.cloneNode(true) as HTMLElement)
    .firstElementChild as HTMLElement;

  return actionsElement;
};
