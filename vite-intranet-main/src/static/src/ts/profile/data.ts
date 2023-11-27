import {
  TYPE_PROFILE_SRVICE,
  TYPE_PROFILE_AVATAR,
  TYPE_PROFILE_PERSONAL,
  TYPE_PROFILE_PROJECT,
  TYPE_PROFILE_EDUCATION,
  TYPE_PROFILE_DOCUMENT,
  TYPE_PROFILE_WORK,
  TYPE_PROFILE_ACHIEVEMENT,
  TYPE_PROFILE_TRANSPORT,
  TYPE_PROFILE_BODY_DATA,
  TYPE_PFOFILE,
} from "../TYPES";

import { TYPE_DATA } from "./types";

import { renderServiceData } from "./render/renderServiceData";
import { renderAvatar } from "./render/renderAvatar";
import { renderPersonalData } from "./render/renderPersonal";
import { renderDocumentsData } from "./render/renderDocuments";
import { renderEducationsData } from "./render/renderEducations";
import { renderWorksData } from "./render/renderWorks";
import { renderAchievementsData } from "./render/renderAchievements";
import { renderTransportData } from "./render/renderTransport";
import { renderProjects } from "./render/renderProjects";
import { showLoader, hiddenLoader } from "../util";
import { maskTel } from "./profile-validation";

import { handlerHiddenData } from "./handlers/handlersVisibleData";
import { handlerAvatar } from "./handlers/handlerAvatar";
import { handlerModals } from "./handlers/handlerModals";
import { handlerAdditionsFormItems } from "./handlers/handlerAdditionsFormItems";
import { handlerFormModals } from "./handlers/handlerFormModals";
import { editDataButtonsElement } from "./profile";
import { handlerInputsModalPersonal } from "./handlers/handlerInputsModal";

export let currentProfile: TYPE_PFOFILE;
export let profileId: number;

export async function getData(status: string = "") {
  if (status === "primary") {
    showLoader();
  }

  const serviceData: TYPE_PROFILE_SRVICE = JSON.parse(
    sessionStorage.getItem("auth")
  );
  const userSamaccountname = serviceData.samaccountname;

  await fetch(`/api/profiles/${userSamaccountname}`, {
    method: `GET`,
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      handlerData(data, status);
    })
    .catch((err) => {
      console.log(err);
    });
}
const handlerData = (data: TYPE_DATA, status: string) => {
  const serviceData: TYPE_PROFILE_SRVICE = JSON.parse(
    sessionStorage.getItem("auth")
  );

  let bodyData: TYPE_PROFILE_BODY_DATA = data[0];

  const userId: number = bodyData.id;
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
    service: serviceData,
    personal: personalData,
    projects: projectsData,
    documents: documentsData,
    educations: educationsData,
    works: worksData,
    achievements: achievementsData,
    transports: transportData,
  };

  currentProfile = profile;
  profileId = userId;

  if (status === "primary") {
    handlerHiddenData(profileId, getData);
    handlerAvatar(profileId, getData);

    maskTel('input[data-name="mobile"]');
    handlerAdditionsFormItems();
    handlerInputsModalPersonal();
    handlerFormModals(profileId, getData);
  }
  handlerModals(editDataButtonsElement, currentProfile);
  renderAvatar(avatarsData);
  renderServiceData(serviceData);
  renderProjects(projectsData);
  renderPersonalData(personalData);
  renderDocumentsData(documentsData);
  renderEducationsData(educationsData);
  renderWorksData(worksData);
  renderAchievementsData(achievementsData);
  renderTransportData(transportData);
  if (status === "primary") {
    setTimeout(() => {
      hiddenLoader();
    }, 1000);
  }
};

// update, created, new, removed
