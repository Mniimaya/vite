import {
  TYPE_PROFILE_PERSONAL,
  TYPE_PROFILE_EDUCATION,
  TYPE_PROFILE_DOCUMENT,
  TYPE_PROFILE_WORK,
  TYPE_PROFILE_ACHIEVEMENT,
  TYPE_PROFILE_TRANSPORT,
  TYPE_PROFILE_BODY_DATA,
  TYPE_PROFILE_PROJECT,
} from "../TYPES";

export enum Roles {
  "user" = 1,
  "admin" = 2,
  "superAdmin" = 3,
}

export type TYPE_DATA = [TYPE_PROFILE_BODY_DATA, boolean];

export enum mounth {
  "января" = 1,
  "февраля" = 2,
  "марта" = 3,
  "апреля" = 4,
  "мая" = 5,
  "июня" = 6,
  "июля" = 7,
  "августа" = 8,
  "сентября" = 9,
  "октября" = 10,
  "ноября" = 11,
  "декабря" = 12,
}

export type KeyOfTypePersonal = keyof TYPE_PROFILE_PERSONAL;

export type KeyOfTypeEducation = keyof TYPE_PROFILE_EDUCATION;

export type KeyOfTypeDocuments = keyof TYPE_PROFILE_DOCUMENT;

export type KeyOfTypeWorks = keyof TYPE_PROFILE_WORK;

export type KeyOfTypeAchievements = keyof TYPE_PROFILE_ACHIEVEMENT;

export type KeyOfTypeTransorts = keyof TYPE_PROFILE_TRANSPORT;

export type KeyOfTypeProject = keyof TYPE_PROFILE_PROJECT;
