import { TYPE_AUTH_DATA } from "../types/auth-data";

export const getAuth = async (delay: number = 300) => {
  return new Promise((res) => {
    setTimeout(() => {
      const authData: TYPE_AUTH_DATA = JSON.parse(
        sessionStorage.getItem(`auth`)
      );
      res(authData);
    }, delay);
  });
};
