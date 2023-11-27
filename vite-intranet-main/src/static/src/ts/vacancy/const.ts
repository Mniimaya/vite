export const VACANCY_HELPERS_HIDDEN = `vacancy-helpers-hidden`;
export const VACANCY_HELPERS_ERROR = `vacancy-helpers-error`;

export const DEFAULT_BALLOONS_DATA = {
  functional: ``,
  wishes: ``,
  advantages: ``,
  offering: `<ul><li>Дружный коллектив, интересные задачи и возможность быть услышанным;</li><li>Приобретение навыков работы в большой, разветвлённой и сложноподчинённой структуре, задействованной в сфере ИТ;</li><li>Оформление в соответствии с ТК РФ;</li><li>Полностью официальная заработная плата по результатам собеседования;</li><li>Основной отпуск 28 календарных дней + дополнительный оплачиваемый отпуск от 5 до 10 дней;</li><li>Материальная помощь к отпуску;</li><li>Медицинское обслуживание в ведомственной поликлинике ФНС России для сотрудников и членов их семей;</li><li>Скидка на питание в столовых, расположенных на территории;</li><li>Возможность отдыха с семьей по льготным ценам в оздоровительных учреждениях ФНС России, детские летние оздоровительные лагеря;</li></ul>`,
};

export const ERROR_PAGE = `/error/404.html`;
export const WORK_PAGE = `/section/work.html`;

export enum ROLE_TO_TEXT {
  "Заявитель" = 1,
  "Согласуюший руководитель" = 2,
  "HR" = 3,
  "HR по позиции" = 4,
  "Наблюдатель" = 5,
}

export const Mode = {
  DEFAULT: `default`,
  VIEW: `view`,
  EDIT: `edit`,
  HR: `hr`,
  MODAL: `modal`,
  DRAFT: `draft`,
  ARCHIVE: `archive`,
  VACANCY: `vacancy`,
};

export const DEBOUNCE_DELAY = 350;

export const VACANCY_LOCAL_STORAGE_NAME = `vacancy-form`;

export enum ParticipantStatus {
  ACTIVE = 0,
  INACTIVE = 1,
}

export enum LocationStatus {
  ACTIVE = 0,
  INACTIVE = 1,
}

export enum ExperienceToText {
  "Нет опыта" = 0,
  "От 1 до 3 лет" = 1,
  "От 3 до 5 лет" = 2,
  "Более 5 лет" = 3,
}

export enum EducationToText {
  "Среднее" = 0,
  "Среднее специальное" = 1,
  "Высшее" = 2,
}

export const SalaryType = {
  NET: 0,
  GROSS: 1,
};

export const SalaryShow = {
  SHOW: 0,
  HIDE: 1,
};

export enum ScheduleType {
  "Полный день" = 0,
  "Сменный 5/2" = 1,
  "Сменный 2/2" = 2,
}

export const DetailsMode = {
  PREVIEW: `preview`,
  VACANCY: `vacancy`,
};

export const UserRole = {
  APPLICANT: 1,
  DIRECTOR: 2,
  HR: 3,
  WATCHER: 4,
};

export const UserApprove = {
  UNDECIDED: 0,
  NOT_REQUIRED: 1,
  PARTICIPATE: 2,
  APPROVE: 3,
  REJECT: 4,
};

export const VacancyStatus = {
  REQUEST: 1,
  VACANCY: 2,
  DRAFT: 3,
  ARCHIVE: 4,
  EXPIRED: 5,
};

export const VacancyPage = {
  ALL_REQUESTS: `0005-all-requests.html`,
  FORM: `0005-form.html`,
  REQUESTS: `0005-requests.html`,
  DRAFTS: `0005-drafts.html`,
  ARHCIVE: `0005-archive.html`,
  PREVIEW: `0005-preview.html`,
  DETAILS: `0005-details.html`,
  EXPIRED: `0005-expired.html`,
  REPLIES: `0005-replies.html`,
  RESUME_DATABASE: `0005-resume-database.html`,
};

export enum VACANCY_ADMINISTRATOR_ROLE {
  "USER" = 2,
  "HR" = 3,
  "SUPER_USER" = 4,
}

export const VACANCY_SERVICE_NUMBER = 5;

export const TAB_NAME = {
  ALL_REQUESTS: `Все заявки`,
  MY_REQUESTS: `Мои заявки`,
  RESPONSES: `Отклики`,
  RESUME_DATABASE: `База резюме`,
  DRAFTS: `Черновики`,
  ARCHIVE: `Архив`,
  EXPIRED: `Истекшие заявки`,
};

export enum VacancyCard {
  VACANCY = `vacancy`,
  REQUEST = `request`,
  REPLY = `reply`,
  RESUME_DATABASE = `resume_database`,
  DRAFT = `draft`,
  ARCHIVE = `archive`,
  EXPIRED = `expired`,
}
