import {
  TYPE_PROFILE_SRVICE,
  TYPE_REQUEST,
  TYPE_SEARCH,
  TYPE_PROFILE_PERSONAL,
  TYPE_PROFILE_AVATAR,
  TYPE_PROFILE_DOCUMENT,
  TYPE_PROFILE_WORK,
  TYPE_PROFILE_ACHIEVEMENT,
  TYPE_PROFILE_TRANSPORT,
  TYPE_PROFILE_EDUCATION,
  TYPE_PROFILE_PROJECT,
  TYPE_PFOFILE,
} from "../TYPES";
import { renderServiceData } from "./render/renderServiceData";
import { renderAvatar } from "./render/renderAvatar";
import { renderPersonalData } from "./render/renderPersonal";
import { renderDocumentsData } from "./render/renderDocuments";
import { renderEducationsData } from "./render/renderEducations";
import { renderWorksData } from "./render/renderWorks";
import { renderAchievementsData } from "./render/renderAchievements";
import { renderTransportData } from "./render/renderTransport";
import { renderProjects } from "./render/renderProjects";
import { AdministratorAPI } from "../../js/API/administratorApi";
import { PhoneAPI } from "../../js/API/phoneApi";
import { SERVICES_TYPES_ENUM } from "../ENUMS";
import { showLoader, hiddenLoader } from "../util";
import { handlerAddUpdateButtons } from "./render/renderButtonUpdate";
import { handlerAddVisibleButtons } from "./render/renderButtonVisible";
import { ProfileAPI } from "../../js/API/profileApi";
import { handlerHiddenData } from "./handlers/handlersVisibleData";
import { handlerAvatar } from "./handlers/handlerAvatar";
import { handlerModals } from "./handlers/handlerModals";
import { handlerAdditionsFormItems } from "./handlers/handlerAdditionsFormItems";
import { handlerFormModals } from "./handlers/handlerFormModals";
import { handlerInputsModalPersonal } from "./handlers/handlerInputsModal";
import { handlerValidation, maskTel } from "./profile-validation";

const urlParam = new URLSearchParams(window.location.search);
const profileId = urlParam.getAll("id")[0];
const serviceData: TYPE_PROFILE_SRVICE = JSON.parse(
  sessionStorage.getItem("auth")
);
const userId = serviceData.samaccountname;

export let currentProfile: TYPE_PFOFILE;
export let profileIdNumber: number;
let serviceDataForModal: TYPE_PROFILE_SRVICE;
let currentRole: string;

const getBodyData = async (status: string = "") => {
  if (status === "primary") {
    showLoader();
  }

  await fetch(`/api/profiles/${profileId}`, {
    method: `GET`,
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      renderBodyData(data, status);
    })
    .catch((err) => {
      console.log(err);
    });
};

const clearAvatarInput = () => {
  document.querySelector(".profile__avatar-form").remove();
  document.querySelector(".profile-data__photo-remove").remove();
  const photoWrapper: HTMLElement = document.querySelector(
    ".profile-data__photo"
  );
  photoWrapper.dataset.role = "user";
};

const renderBodyData = (data: any, status: string) => {
  const bodyData = data[0];
  const personalData: TYPE_PROFILE_PERSONAL = {
    avatar: bodyData.avatars,
    birthday: bodyData.birthday,
    birthplace: bodyData.birthplace,
    email: bodyData.email,
    mobile: bodyData.mobile,
    visibleYear: bodyData.visible_year,
    visible: bodyData.visible,
  };
  const avatarsData: TYPE_PROFILE_AVATAR[] = bodyData.avatars;
  const projectsData: TYPE_PROFILE_PROJECT[] = bodyData.projects;
  const documentsData: TYPE_PROFILE_DOCUMENT[] = bodyData.documents;
  const educationsData: TYPE_PROFILE_EDUCATION[] = bodyData.educations;
  const worksData: TYPE_PROFILE_WORK[] = bodyData.works;
  const achievementsData: TYPE_PROFILE_ACHIEVEMENT[] = bodyData.achievements;
  const transportData: TYPE_PROFILE_TRANSPORT[] = bodyData.transports;

  let profile: TYPE_PFOFILE = {
    service: serviceDataForModal,
    personal: personalData,
    projects: projectsData,
    documents: documentsData,
    educations: educationsData,
    works: worksData,
    achievements: achievementsData,
    transports: transportData,
  };

  currentProfile = profile;
  profileIdNumber = bodyData.id;

  if (status === "primary") {
    if (currentRole === "admin") {
      handlerAvatar(profileIdNumber, getBodyData);
    }

    maskTel('input[data-name="mobile"]');
    handlerAdditionsFormItems();
    handlerInputsModalPersonal();
    handlerFormModals(profileIdNumber, getBodyData);
  }
  const editDataButtonsElement = [
    ...document.querySelectorAll(".profile-edit-button"),
  ] as HTMLButtonElement[];
  handlerModals(editDataButtonsElement, currentProfile);
  renderAvatar(avatarsData);
  renderProjects(projectsData);
  renderPersonalData(personalData, currentRole);
  renderDocumentsData(documentsData, currentRole);
  renderEducationsData(educationsData, currentRole);
  renderWorksData(worksData, currentRole);
  renderAchievementsData(achievementsData, currentRole);
  renderTransportData(transportData, currentRole);
  if (status === "primary") {
    setTimeout(() => {
      hiddenLoader();
    }, 1000);
  }
};

const renderData = (data: TYPE_PROFILE_SRVICE[]) => {
  serviceDataForModal = data[0];
  renderServiceData(serviceDataForModal);
  getBodyData("primary");
};

const getServiceData = () => {
  const data = new FormData();
  data.append("search", profileId);
  PhoneAPI.postUsers(data, renderData);
  handlerVisibleData();
};

const handlerVisibleData = () => {
  ProfileAPI.getIdProfile(profileId, test);
};

const test = (id: string) => {
  const idNumber = +id;
  handlerHiddenData(idNumber, getBodyData);
};

const handlerRole = (dataRole: TYPE_REQUEST[]) => {
  if (dataRole.length) {
    handlerAddUpdateButtons();
    handlerAddVisibleButtons();
    currentRole = "admin";
  } else {
    currentRole = "user";
    clearAvatarInput();
  }

  getServiceData();
};

const getRole = () => {
  AdministratorAPI.getRolesByService(
    userId,
    SERVICES_TYPES_ENUM.profile,
    handlerRole
  );
};

getRole();
