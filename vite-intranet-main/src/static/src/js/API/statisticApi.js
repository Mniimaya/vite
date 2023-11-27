import { showMessage } from "../../ts/util.ts";
import { apiPath } from "../../main.js";

class StatisticApi {
  async postStatistic() {
    await fetch(`/api/statistic`, {
      method: "POST",
      credentials: "include",
    }).catch((err) => {
      showMessage("Сервер не отвечает");
      console.log(err);
    });
  }
  async getStatistic(cbf, cbs) {
    await fetch(`/api/statistic`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        cbf(data);
        cbs(data);
      })
      .catch((err) => {
        showMessage("Сервер не отвечает");
        console.log(err);
      });
  }
}

export const StatisticAPI = new StatisticApi();
