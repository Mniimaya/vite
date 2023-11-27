import { redirectTo } from "../redirect-to";
import { TAB_NAME, VacancyPage, VACANCY_ADMINISTRATOR_ROLE } from "../../const";

const tabsData = [
  {
    title: `Все заявки`,
    className: `tab--vacancy vacancy-navigation__button--all-requests`,
  },
  {
    title: `Мои заявки`,
    className: `tab--vacancy vacancy-navigation__button--my-requests`,
  },
  {
    title: `Отклики`,
    className: `tab--vacancy vacancy-navigation__button--my-responses`,
  },
  {
    title: `База резюме`,
    className: `tab--vacancy vacancy-navigation__button--resume-database`,
  },
  {
    title: `Черновики`,
    className: `tab--vacancy vacancy-navigation__button--drafts`,
  },
  {
    title: `Архив`,
    className: `tab--vacancy vacancy-navigation__button--archive`,
  },
  {
    title: `Истекшие заявки`,
    className: `tab--vacancy vacancy-navigation__button--expired`,
  }
];

export const initialTabs = async (
  tabContainer: HTMLElement,
  activeTabName: string | null = null,
  administratorRole = 2
) => {
  const userTabsData = tabsData.filter(
    ({ title }) => title === TAB_NAME.MY_REQUESTS || title === TAB_NAME.DRAFTS
  );
  const hrTabsData = tabsData;

  if (VACANCY_ADMINISTRATOR_ROLE[administratorRole] === `USER`) {
    userTabsData.forEach((data) => {
      const tabElement = document.createElement(`button`);

      tabElement.textContent = data.title;
      tabElement.className = `tab vacancy-navigation__button ${data.className}`;

      if (activeTabName === data.title) {
        tabElement.classList.add(`tab--actual`);
      }

      tabContainer.append(tabElement);
    });

    // Elements;
    const requestsTab = tabContainer.querySelector(
      `.vacancy-navigation__button--my-requests`
    );

    const draftsTab = tabContainer.querySelector(
      `.vacancy-navigation__button--drafts`
    );

    // Events;
    requestsTab.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      redirectTo(`/service/vacancy/${VacancyPage.REQUESTS}`);
    });

    draftsTab.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      redirectTo(`/service/vacancy/${VacancyPage.DRAFTS}`);
    });
  } else if (
    VACANCY_ADMINISTRATOR_ROLE[administratorRole] === `HR` ||
    VACANCY_ADMINISTRATOR_ROLE[administratorRole] === `SUPER_USER`
  ) {
    hrTabsData.forEach((data) => {
      const tabElement = document.createElement(`button`);

      tabElement.textContent = data.title;
      tabElement.className = `tab vacancy-navigation__button ${data.className}`;

      if (activeTabName === data.title) {
        tabElement.classList.add(`tab--actual`);
      }

      tabContainer.append(tabElement);
    });

    // Elements;
    const allRequestTab = tabContainer.querySelector(
      `.vacancy-navigation__button--all-requests`
    );
    const requestsTab = tabContainer.querySelector(
      `.vacancy-navigation__button--my-requests`
    );
    const responsesTab = tabContainer.querySelector(
      `.vacancy-navigation__button--my-responses`
    );
    const resumeDataBaseTab = tabContainer.querySelector(
      `.vacancy-navigation__button--resume-database`
    );
    const draftsTab = tabContainer.querySelector(
      `.vacancy-navigation__button--drafts`
    );
    const archiveTab = tabContainer.querySelector(
      `.vacancy-navigation__button--archive`
    );
    const expiredTab = tabContainer.querySelector(`.vacancy-navigation__button--expired`);

    // Events;
    allRequestTab.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      redirectTo(`/service/vacancy/${VacancyPage.ALL_REQUESTS}`);
    });

    requestsTab.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      redirectTo(`/service/vacancy/${VacancyPage.REQUESTS}`);
    });

    responsesTab.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      redirectTo(`/service/vacancy/${VacancyPage.REPLIES}`);
    });

    draftsTab.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      redirectTo(`/service/vacancy/${VacancyPage.DRAFTS}`);
    });

    resumeDataBaseTab.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      redirectTo(`/service/vacancy/${VacancyPage.RESUME_DATABASE}`);
    });

    archiveTab.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      redirectTo(`/service/vacancy/${VacancyPage.ARHCIVE}`);
    });

    expiredTab.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      redirectTo(`/service/vacancy/${VacancyPage.EXPIRED}`);
    })
  }
};
