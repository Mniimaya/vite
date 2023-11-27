export const clearContainer = (container: HTMLElement): undefined | void => {
  if (container.children.length === 0) {
    return;
  }

  Array.from(container.children).forEach((child) => child.remove());

  container.innerHTML = ``;
};
