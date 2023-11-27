import { ProfileAPI } from "../../js/API/profileApi";

export const typeRequestDocument = new Map([
  ["update", ProfileAPI.updateDocument],

  ["new", ProfileAPI.postCreateDocument],

  ["removed", ProfileAPI.deleteDocument],
]);

export const typeRequestEducations = new Map([
  ["update", ProfileAPI.updateEducation],

  ["new", ProfileAPI.postCreateEducations],

  ["removed", ProfileAPI.deleteEducation],
]);

export const typeRequestWorks = new Map([
  ["update", ProfileAPI.updateWork],

  ["new", ProfileAPI.postCreateWork],

  ["removed", ProfileAPI.deleteWork],
]);

export const typeRequestAchievement = new Map([
  ["update", ProfileAPI.updateAchievement],

  ["new", ProfileAPI.postCreateAchievement],

  ["removed", ProfileAPI.deleteAchievement],
]);

export const typeRequestTransport = new Map([
  ["update", ProfileAPI.updateTransport],

  ["new", ProfileAPI.postCreateTransport],

  ["removed", ProfileAPI.deleteTransport],
]);

export const typeRequestProjects = new Map([
  ["update", ProfileAPI.updateProject],

  ["new", ProfileAPI.postCreateProject],

  ["removed", ProfileAPI.deleteProject],
]);

export const typeRequestVisible = new Map([
  ["personal", ProfileAPI.updateProfile],
  ["personal-documents", ProfileAPI.updateStatusVisibleDocuments],
  ["education", ProfileAPI.updateStatusVisibleEducation],
  ["job", ProfileAPI.updateStatusVisibleWorks],
  ["career-achievements", ProfileAPI.updateStatusVisibleAchievements],
  ["personal-achievements", ProfileAPI.updateStatusVisibleAchievements],
  ["transport", ProfileAPI.updateStatusVisibleTransports],
]);

export const typeRequestProfile = new Map([
  ["update", ProfileAPI.updateProfile],
]);
