import { TYPE_PARTICIPANT } from "../../../types/participant";
import { addParticipant } from "../../form/add-participant";

export const createParticipants = (
  data: TYPE_PARTICIPANT[],
  [mainContainer, additionalContainer]: [HTMLElement, HTMLElement]
) => {
  // Get Main data;
  const applicantIndex = data.findIndex(({ role }) => Number(role) === 1);
  const applicantData = data.splice(applicantIndex, 1)[0];

  // Main inputs;
  const mainRoleSelects = mainContainer.querySelectorAll(
    `.vacancy-form-select--role`
  ) as NodeListOf<HTMLSelectElement>;
  const mainFullnameInputs = mainContainer.querySelectorAll(
    `.vacancy-form-input--fullname`
  ) as NodeListOf<HTMLInputElement>;
  const mainIsViewCheckboxs = mainContainer.querySelectorAll(
    `.vacancy-form-checkbox--is-view`
  ) as NodeListOf<HTMLInputElement>;
  const mainIsInterviewCheckboxs = mainContainer.querySelectorAll(
    `.vacancy-form-checkbox--is-interview`
  ) as NodeListOf<HTMLInputElement>;
  const mainAccountNumberInputs = mainContainer.querySelectorAll(
    `.vacancy-form-input--account-number`
  ) as NodeListOf<HTMLInputElement>;
  const mainPositionInputs = mainContainer.querySelectorAll(
    `.vacancy-form-input--position`
  ) as NodeListOf<HTMLInputElement>;
  const mainAvatarSrcInputs = mainContainer.querySelectorAll(
    `.vacancy-form-input--avatar-src`
  ) as NodeListOf<HTMLInputElement>;
  const mainIsApproveInputs = mainContainer.querySelectorAll(
    `.vacancy-form-input--is-approve`
  ) as NodeListOf<HTMLInputElement>;
  const mainStatusInputs = mainContainer.querySelectorAll(
    `.vacancy-form-input--status`
  ) as NodeListOf<HTMLInputElement>;
  const mainIdInput = mainContainer.querySelectorAll(
    `.vacancy-form-input--id`
  ) as NodeListOf<HTMLInputElement>;
  const mainIdRequestInput = mainContainer.querySelectorAll(
    `.vacancy-form-input--id-request`
  ) as NodeListOf<HTMLInputElement>;

  // Data for Main Participants;
  [applicantData].forEach((data, index) => {
    // Main roles;
    mainRoleSelects[index].value = `${data.role}`;
    mainFullnameInputs[index].value = data.full_name;
    mainIsViewCheckboxs[index].checked = Boolean(data.is_view);
    mainIsInterviewCheckboxs[index].checked = Boolean(data.is_interview);
    // Hidden roles;
    mainAccountNumberInputs[index].value = data.account_number;
    mainPositionInputs[index].value = data.position;
    mainAvatarSrcInputs[index].value = data.avatar_src;
    mainIsApproveInputs[index].value = `${data.is_approve}`;
    mainStatusInputs[index].value = `${data.status}`;
    mainIdInput[index].value = `${data.id}`;
    mainIdRequestInput[index].value = `${data.id_request}`;
  });
  // Add to additional;
  data.forEach((item) => addParticipant(additionalContainer, item));
};
