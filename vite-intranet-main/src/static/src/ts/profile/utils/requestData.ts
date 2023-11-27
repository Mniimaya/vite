import {
  typeRequestDocument,
  typeRequestEducations,
  typeRequestWorks,
  typeRequestAchievement,
  typeRequestTransport,
  typeRequestProjects,
  typeRequestProfile,
} from "../maps";

export const requestData = (
  modal: HTMLFormElement,
  typeData: string,
  userId: number,
  cb: Function
) => {
  if (typeData === "service") {
    const wrapper: HTMLElement = document.querySelector(
      ".profile__form-fieldset-template--project"
    );
    const wrappersData = wrapper.querySelectorAll(
      `.profile__form-clone-item:not(.profile__form-clone-item[data-status="empty"])`
    ) as NodeListOf<HTMLElement>;
    const arrayRequest: {}[] = [];
    wrappersData.forEach((wrapper) => {
      const body: any = {};
      const inputsAll: HTMLSelectElement = wrapper.querySelector("select");
      body.project_name = inputsAll.value;
      body.type = "Проект";
      if (inputsAll.dataset.id) {
        body.id = Number(inputsAll.dataset.id);
      }
      const statusData = wrapper.dataset.status;
      if (statusData !== "created") {
        const functionRequest = typeRequestProjects.get(statusData);
        arrayRequest.push(
          functionRequest(body, userId, body.id ? body.id : "")
        );
      }
    });
  }
  const wrappersData = modal.querySelectorAll(
    `.profile__form-clone-item:not(.profile__form-clone-item[data-status="empty"])`
  ) as NodeListOf<HTMLElement>;
  const arrayRequest: {}[] = [];
  wrappersData.forEach((wrapper) => {
    if (wrapper.getAttribute("data-status") !== "created") {
      const body: any = {};
      const inputsAll = wrapper.querySelectorAll("input, select") as NodeListOf<
        HTMLInputElement | HTMLSelectElement
      >;

      inputsAll.forEach((element) => {
        if (typeData === "personal") {
          if (element.name === "visible_year") {
            body[element.name] = JSON.parse(element.value);
          } else if (element.value !== "") {
            body[element.name] = element.value;
          } else {
            body[element.name] = null;
          }
        } else {
          body[element.name] = element.value;
        }
      });
      const statusData: string = wrapper.getAttribute("data-status");
      if (typeData === "documents") {
        const functionRequest = typeRequestDocument.get(statusData);
        arrayRequest.push(
          functionRequest(body, userId, body.id ? body.id : "")
        );
      } else if (typeData === "educations") {
        const functionRequest = typeRequestEducations.get(statusData);
        arrayRequest.push(
          functionRequest(body, userId, body.id ? body.id : "")
        );
      } else if (typeData === "works") {
        const functionRequest = typeRequestWorks.get(statusData);
        arrayRequest.push(
          functionRequest(body, userId, body.id ? body.id : "")
        );
      } else if (
        typeData === "career-achievements" ||
        typeData === "personal-achievements"
      ) {
        const functionRequest = typeRequestAchievement.get(statusData);
        arrayRequest.push(
          functionRequest(body, userId, body.id ? body.id : "")
        );
      } else if (typeData === "transport") {
        const functionRequest = typeRequestTransport.get(statusData);
        arrayRequest.push(
          functionRequest(body, userId, body.id ? body.id : "")
        );
      } else if (typeData === "personal") {
        const functionRequest = typeRequestProfile.get(statusData);
        arrayRequest.push(
          functionRequest(body, userId, body.id ? body.id : "")
        );
      }
    }
  });

  Promise.all([...arrayRequest]).then(() => {
    cb();
  });
};
