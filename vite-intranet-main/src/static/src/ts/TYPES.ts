import { TYPE_SONO } from "./types/common";

export type TYPE_ALERT = {
  alert_service: string;
  alert_theme: string;
  alert_body: string;
  alert_date: string;
  alert_is_view: number;
};

export type TYPE_SEARCH = {
  multiple?: boolean;
  search?: string;
  company?: string;
  sono?: string;
  samaccountname?: string;
  sn?: string;
  givenname?: string;
  telephonenumber?: string;
  jpegphoto?: string;
  departments?: string;
};
export type TYPE_NOTIFICATION = {
  account_number: string;
  body: string;
  chats_id: number;
  date_time: string;
  full_name: string;
  id: number;
  type: number;
};
export type TYPE_PHOTOS = {
  id: number;
  news: string;
  photo: string;
  photos: string;
  step: string;
  status?: boolean;
};

export type TYPE_NEW = {
  sono?: string;
  title?: string;
  description?: string;
  userlogin?: string;
};

export type KeyOfTypeNew = keyof TYPE_NEW;

export type TYPE_BODY_NEWS = {
  count: number;
  rows: TYPE_NEWS[];
};

type TYPE_IS_LIKED = {
  news_user: string;
};

export type TYPE_NEWS = {
  id: string;
  sono: TYPE_SONO;
  createdAt: string;
  title: string;
  description: string;
  avatar: string;
  status: string;
  quality: number;
  comment?: string;
  pdf?: string;
  video?: string;
  admin: TYPE_PHOTOS[];
  views: number;
  userlogin: string;
  likes: number;
  images: TYPE_PHOTOS[] | string;
  is_liked: TYPE_IS_LIKED[];
};

export type TYPE_MODER_NEW = {
  title?: string;
  description?: string;
  status?: number;
  comment?: string;
};

export type KeyOfTypeModerNew = keyof TYPE_MODER_NEW;

export type TYPE_LIKES = {
  id: number;
  news_id: string;
  news_like: string;
  news_user: string;
};

export type TYPE_REQUEST = {
  administrator_role?: number;
  administrator_status?: number;
  administrator_date_request?: string;
  administrator_comments?: string;
  administrator_service?: number;
  administrator_company?: string;
  administrator_samaccountname?: string;
  administrator_department?: string;
  administrator_title?: string;
  administrator_telephone_number?: string;
  administrator_mobile_number?: string;
  administrator_cn?: string;
  administrator_author_samaccountname?: string;
  administrator_author_cn?: string;
  administrator_author_company?: string;
  administrator_author_department?: string;
  administrator_author_mail?: string;
  administrator_author_title?: string;
  administrator_author_telephone_number?: string;
  administrator_date_start?: string;
  administrator_date_end?: string;
  administrator_id?: number;
  administrator_reject?: string;
  administrator_mail?: string;
  administrator_visible_sono?: string;
  administrator_sono_list?: TYPE_SONO[];
};

export type TYPE_TRIP = {
  comments?: string;
  date: string;
  dates: string;
  freedate: string;
  hot: string;
  hotel: string;
  house: string;
  id: string;
  info: string;
  login: string;
  mail: string;
  name: string;
  newdata: string;
  number: number;
  numberfirst: string;
  numbersecond: string;
  part: string;
  reject: string;
  room: string;
  sono: TYPE_SONO;
  status: string;
  super: string;
  tel: string;
  why: string;
  work: string;
};

export type TYPE_REVIEW = {
  review_title: string;
  review_admin: string;
  account_number: string;
  date: string;
  review_body: string;
  review_id: number;
  status: number;
  full_name: string;
};

export type TYPE_COMMENT = {
  review_comment: string;
  review_notification: string;
};

export type TYPE_PARTICIPANTS = {
  id: number;
  chats_id: number;
  account_number: string;
  full_name: string;
  status: boolean;
  last_visit: string;
  unread_messages: number;
  createdAt: string;
  updatedAt: string;
};

export type TYPE_CHAT_PARTICIPANT = {
  account_number: string;
  chats_id: number;
  full_name: string;
  id: number;
  last_visit: string;
  status: number;
};
export type TYPE_CHAT_MESSAGES = {
  id: number;
  chats_id: number;
  account_number: string;
  full_name: string;
  body: string;
  status: boolean;
  link: null | string;
  createdAt: string;
  updatedAt: string;
};

export type TYPE_CHAT_INFO = {
  id?: number;
  notification_author?: string;
  notification_fullname?: string;
  notification_theme?: string;
  last_message?: string;
  status?: boolean;
  notification_service?: null;
  participants?: TYPE_PARTICIPANTS[];
  messages?: TYPE_CHAT_MESSAGES[];
};

export type TYPE_CHAT = {
  last_message: string;
  notification_theme: string;
  id: number;
  notification_service?: string;
  notification_author: string;
  participants: TYPE_CHAT_PARTICIPANT[];
  messages: TYPE_CHAT_MESSAGES[];
  quality: TYPE_CHAT_MESSAGES[];
};

export type TYPE_PROFILE_SRVICE = {
  departaments: string;
  [cn: string]: string;
  company: string;
  department: string;
  departments: string;
  givenname: string;
  jpegphoto: string;
  mail: string;
  manager: string;
  objectsid: string;
  rang: string;
  samaccountname: string;
  sn: string;
  sono: string;
  telephonenumber: string;
  title: string;
  whenchanged: string;
};

export type TYPE_PROFILE_AVATAR = {
  id: number;
  profile_id: number;
  avatar_src: string;
  status: boolean;
};

export type TYPE_PROFILE_PERSONAL = {
  avatar: TYPE_PROFILE_AVATAR[];
  birthday: string;
  birthplace: string;
  email: string;
  mobile: string;
  visibleYear: boolean;
  visible: boolean;
};

export type TYPE_PROFILE_PROJECT = {
  project_name: string;
  id: number;
  type: string;
};

export type TYPE_PROFILE_EDUCATION = {
  university: string;
  degree: string;
  date_off_issue: string;
  faculty: string;
  specialization: string;
  status: boolean;
  visible: boolean;
};

export type TYPE_PROFILE_DOCUMENT = {
  name: string;
  serial: string;
  number: string;
  date_off_issue: string;
  issued_by: string;
  division_code: string | null;
  id: number;
  status: boolean;
  visible: boolean;
};

export type TYPE_PROFILE_WORK = {
  company: string;
  department: string;
  responsibility: string;
  title: string;
  date_start: string;
  date_end: string;
  status: boolean;
  visible: boolean;
};

export type TYPE_PROFILE_ACHIEVEMENT = {
  type: string;
  year: string;
  description: string;
  kind: string;
  status: boolean;
  visible: boolean;
};

export type TYPE_PROFILE_TRANSPORT = {
  type: string;
  number: string;
  brand: string;
  model: string;
  status: boolean;
  visible: boolean;
};

export type TYPE_PROFILE_BODY_DATA = {
  avatars: TYPE_PROFILE_AVATAR[];
  id: number;
  birthplace: string;
  birthday: string;
  email: string;
  mobile: string;
  personalEmail: string;
  personalMobile: string;
  telephonenumber: string;
  mail: string;
  company: string;
  department: string;
  title: string;
  manager: string;
  visible_year: boolean;
  visible: boolean;
  projects: TYPE_PROFILE_PROJECT[];
  documents: TYPE_PROFILE_DOCUMENT[];
  educations: TYPE_PROFILE_EDUCATION[];
  works: TYPE_PROFILE_WORK[];
  achievements: TYPE_PROFILE_ACHIEVEMENT[];
  transports: TYPE_PROFILE_TRANSPORT[];
};

export type TYPE_PFOFILE = {
  service?: TYPE_PROFILE_SRVICE;
  personal: TYPE_PROFILE_PERSONAL;
  projects: TYPE_PROFILE_PROJECT[];
  documents: TYPE_PROFILE_DOCUMENT[];
  educations: TYPE_PROFILE_EDUCATION[];
  works: TYPE_PROFILE_WORK[];
  achievements: TYPE_PROFILE_ACHIEVEMENT[];
  transports: TYPE_PROFILE_TRANSPORT[];
};

export type TYPE_VISIBLE = {
  visible: boolean;
};
