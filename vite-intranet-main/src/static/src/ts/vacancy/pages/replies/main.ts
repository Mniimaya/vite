// helpers;
import { initialTabs } from "../../helpers/initial/initial-tabs";
import { getAdministratorRole } from "../../helpers/get-administrator-role";
import { getAuth } from "../../helpers/get-auth";
// types
import { TYPE_AUTH_DATA } from "../../types/auth-data";
import { VACANCY_HELPERS_HIDDEN } from "../../const";

import { createCard } from "../../helpers/creators/cards/create-card";
import { VacancyCard } from "../../const";

const { samaccountname } = (await getAuth()) as TYPE_AUTH_DATA;

const tabContainer = document.querySelector(
  `.tab-section__wrapper`
) as HTMLElement;

const administratorRole = await getAdministratorRole(samaccountname);

initialTabs(tabContainer, `Отклики`, administratorRole);

// TODO: DELETE MOCK;
const mocksRelplies = [
  {
    id: 1,
    date_response: `10.09.2023`,
    avatar_src: `https://service-ktir.dpc.tax.nalog.ru/photos/n7700-01-173.jpg`,
    full_name: `Сидоров Иван Иванович`,
    date_of_birth: `1993-10-07T08:10:27.144Z`,
    vacancy_name: `Backend-разработчик`,
    vacancy_link: `/service/vacancy/0005-details.html?id=1`,
    priority_address: `г. Москва, Походный проезд, 3с1`,
    cover_letter: `Добрый день! Резюме во вложении. И вы можете его прочитать, если хотите или не хотите`,
  },

  {
    id: 2,
    date_response: `2023-10-10T08:10:27.144Z`,
    avatar_src: `https://service-ktir.dpc.tax.nalog.ru/photos/n7700-01-173.jpg`,
    full_name: `Иванов Иван Иванович`,
    date_of_birth: `1987-08-07T08:10:27.144Z`,
    vacancy_name: `Frontend-разработчик`,
    vacancy_link: `/service/vacancy/0005-details.html?id=1`,
    priority_address: `г. Москва, Походный проезд, 3с1`,
    cover_letter: `Здравствуйте, пожалуйста, посмотрите резюме во вложении`,
  },
];

const vacancyListContainer = document.querySelector(
  `.vacancy-list--replies`
) as HTMLElement;
const emptyContainer = document.querySelector(`.vacancy-empty-container`);
const errorContainer = document.querySelector(`.vacancy-error-container`);

// TODO: DELETE MOCK;
Promise.resolve(mocksRelplies).then((data) => {
  if (data.length === 0) {
    vacancyListContainer.classList.add(VACANCY_HELPERS_HIDDEN);
    errorContainer.classList.add(VACANCY_HELPERS_HIDDEN);
    emptyContainer.classList.remove(VACANCY_HELPERS_HIDDEN);
    return;
  }

  vacancyListContainer.classList.remove(VACANCY_HELPERS_HIDDEN);
  errorContainer.classList.add(VACANCY_HELPERS_HIDDEN);
  emptyContainer.classList.add(VACANCY_HELPERS_HIDDEN);

  data
    .sort((a, b) => Number(a.id) - Number(b.id))
    .forEach((item) => {
      const card = createCard(VacancyCard.REPLY, item, administratorRole);
      const liElement = document.createElement(`li`);

      liElement.className = `vacancy-list__item`;
      liElement.append(card);

      vacancyListContainer.append(liElement);
    });
});
