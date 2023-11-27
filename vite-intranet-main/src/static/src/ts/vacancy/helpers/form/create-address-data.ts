interface AdditionalData {
  id_request?: number;
  status?: number;
  sono?: string;
  date_publication?: string | null;
  date_archive?: string | null;
}

export const createAddressData = (form: HTMLFormElement, additionalData: AdditionalData) => {
  const mainAddressContainer = form.querySelector(`.vacancy-form-items--location-main`);
  const additionalAddressContainer = form.querySelector(`.vacancy-form-items--location-additional`);

  const addresses = [...mainAddressContainer.children, ...additionalAddressContainer.children].filter((item) => {
    const statusInput = item.querySelector(`.vacancy-form-input--status`) as HTMLInputElement;

    return Number(statusInput.value) === 0;
  }).map((item) => {
    const regionInput = item.querySelector(`.vacancy-form-input--region`) as HTMLInputElement;
    const addressInput = item.querySelector(`.vacancy-form-input--address`) as HTMLInputElement;
    const metroInput = item.querySelector(`.vacancy-form-input--metro`) as HTMLInputElement;

    return {
      region: regionInput.value,
      address: addressInput.value,
      metro: metroInput.value,
      id_request: additionalData.id_request
    }
  });

  return addresses;
}
