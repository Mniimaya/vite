interface AdditionalData {
  id_request?: number;
  status?: number;
  sono?: string;
  date_publication?: string | null;
  date_archive?: string | null;
}

export const createParticipantData = (
  form: HTMLFormElement,
  additionalData: AdditionalData
) => {
  const mainParticipantsItemsContainer = form.querySelector(
    `.vacancy-form-items--participants-main`
  );
  const additionalParticipantsItemsContainer = form.querySelector(
    `.vacancy-form-items--participants-additional`
  );

  const participants = [
    ...mainParticipantsItemsContainer.children,
    ...additionalParticipantsItemsContainer.children,
  ]
    .filter((item) => {
      const statusInput = item.querySelector(
        `.vacancy-form-input--status`
      ) as HTMLInputElement;

      return Number(statusInput.value) === 0;
    })
    .map((item) => {
      const roleSelect = item.querySelector(
        `.vacancy-form-select--role`
      ) as HTMLSelectElement;
      const fullnameInput = item.querySelector(
        `.vacancy-form-input--fullname`
      ) as HTMLInputElement;
      const isViewCheckbox = item.querySelector(
        `.vacancy-form-checkbox--is-view`
      ) as HTMLInputElement;
      const isInterviewCheckbox = item.querySelector(
        `.vacancy-form-checkbox--is-interview`
      ) as HTMLInputElement;
      const accountNumberInput = item.querySelector(
        `.vacancy-form-input--account-number`
      ) as HTMLInputElement;
      const avatarSrcInput = item.querySelector(
        `.vacancy-form-input--avatar-src`
      ) as HTMLInputElement;
      const positionInput = item.querySelector(
        `.vacancy-form-input--position`
      ) as HTMLInputElement;
      const approveInput = item.querySelector(
        `.vacancy-form-input--is-approve`
      ) as HTMLInputElement;

      return {
        full_name: fullnameInput.value,
        role: Number(roleSelect.value),
        is_view: Number(isViewCheckbox.checked),
        is_interview: Number(isInterviewCheckbox.checked),
        is_approve: Number(approveInput.value),
        account_number: accountNumberInput.value,
        avatar_src: avatarSrcInput.value,
        position: positionInput.value,
        id_request: additionalData.id_request,
      };
    });

  return participants;
};
