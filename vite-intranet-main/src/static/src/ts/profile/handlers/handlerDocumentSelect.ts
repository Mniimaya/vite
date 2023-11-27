export const handlerDocumentSelect = (select: HTMLSelectElement) => {
  const patent = select.closest(".profile__form-clone-item");
  const label: HTMLElement = patent.querySelector(
    ".profile__form-division_code"
  );
  if (select.value !== "Паспорт" && select.value !== "placeholder") {
    label.innerHTML = "";
    // label.querySelector("input").classList.remove("validation");
  } else {
    label.innerHTML = `
      <span class="profile__form-title">Код подразделения <b>*</b></span>
        <div class="profile__clear-wrapper">
          <input maxlength="255" type="text" class="input" data-name="division_code"
          name="division_code" required>
  
      `;
    label.querySelector("input").classList.add("validation");
  }
};
