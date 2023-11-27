import { TYPE_ADDRESS } from "../../../types/address";
import { addLocation } from "../../form/add-location";

export const createLocation = (
  data: TYPE_ADDRESS[],
  [mainContainer, additionalContainer]: [HTMLElement, HTMLElement]
) => {
  const mainData = data.slice(0, 1)[0];
  const additionalData = data.slice(1);

  // Elements;
  const mainRegionInput = mainContainer.querySelector(
    `.vacancy-form-input--region`
  ) as HTMLInputElement;
  const mainAddressInput = mainContainer.querySelector(
    `.vacancy-form-input--address`
  ) as HTMLInputElement;
  const mainMetroInput = mainContainer.querySelector(
    `.vacancy-form-input--metro`
  ) as HTMLInputElement;
  const mainStatusInput = mainContainer.querySelector(
    `.vacancy-form-input--status`
  ) as HTMLInputElement;
  const mainIdRequestInput = mainContainer.querySelector(
    `.vacancy-form-input--id-request`
  ) as HTMLInputElement;
  const mainIdAddressInput = mainContainer.querySelector(
    `.vacancy-form-input--id-address`
  ) as HTMLInputElement;

  // Inputs;
  mainRegionInput.value = mainData.region || ``;
  mainAddressInput.value = mainData.address || ``;
  mainMetroInput.value = mainData.metro || ``;
  mainStatusInput.value = `${mainData.status}` || `0`;
  mainIdRequestInput.value = `${mainData.id_request}` || ``;
  mainIdAddressInput.value = `${mainData.id}` || ``;

  // Add Location to Form Data;
  additionalData.forEach((item) => addLocation(additionalContainer, item));
};
