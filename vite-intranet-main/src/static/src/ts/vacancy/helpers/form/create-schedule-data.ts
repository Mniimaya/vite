interface AdditionalData {
  id_request?: number;
  status?: number;
  sono?: string;
  date_publication?: string | null;
  date_archive?: string | null;
}

export const createScheduleData = (form: HTMLFormElement, additionalData: AdditionalData) => {
  const selectSchedule = form.querySelector(`.vacancy-form-select--schedule`) as HTMLSelectElement;

  return {
    type: Number(selectSchedule.value),
    period: [`to`, `do`],
    id_request: additionalData.id_request
  }
}
