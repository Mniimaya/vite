// Helpers;
import { createMainData } from "./create-main-data";
import { createAddressData } from "./create-address-data";
import { createScheduleData } from "./create-schedule-data";
import { createParticipantData } from "./create-participant-data";

// Api;
import { VacancyAPI } from "../../../../js/API/vacancyApi";

// Types;
import type { TYPE_BALLONS } from "../../types/ballons";

interface AdditionalData {
  id_request?: number;
  status?: number;
  sono?: any;
  date_publication?: string | null;
  date_archive?: string | null;
}

export const sendForm = async (
  form: HTMLFormElement,
  ballons: TYPE_BALLONS[],
  additionalData: AdditionalData
) => {
  const mainData = await createMainData(form, ballons, additionalData);

  return VacancyAPI.postVacancy(mainData).then(async (data) => {
    const { id } = data;

    const addressData = createAddressData(form, { id_request: Number(id) });
    const scheduleData = createScheduleData(form, { id_request: Number(id) });
    const participantData = createParticipantData(form, {
      id_request: Number(id),
    });

    const promisesAddress = addressData.map((data) =>
      VacancyAPI.postAddress(data)
    );
    const promisesParticipant = participantData.map((data) =>
      VacancyAPI.postParticipant(data)
    );

    await Promise.all([
      ...promisesAddress,
      VacancyAPI.postSchedule(scheduleData),
      ...promisesParticipant,
    ]);
  });
};
