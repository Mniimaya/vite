import { showMessage } from "../../ts/util.ts";
import { apiPath } from "../../main.js";
class AuthApi {
  async postAuth(formData, cb) {
    return await fetch(`${apiPath}/connect/phone/api/auth.php`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => cb(data))
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
  //nest auth will work only in int-ktir and production, not available in ktir
  // async postAuth(cb) {
  //   fetch(`/api/auth`, {
  //     method: "Get",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => cb(data))
  //     .catch((err) => {
  //       showMessage("Сервер не отвечает");
  //       console.log(err);
  //     });
  // }
}

export const AuthAPI = new AuthApi();
