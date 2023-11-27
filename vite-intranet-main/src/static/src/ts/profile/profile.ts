import { getData } from "./data";

export const editDataButtonsElement = [
  ...document.querySelectorAll(".profile-edit-button"),
] as HTMLButtonElement[];

// Инициализация всех данных
const initData = () => {
  getData("primary");
};

initData();
