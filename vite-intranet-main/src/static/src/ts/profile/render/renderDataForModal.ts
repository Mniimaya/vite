import { TYPE_PFOFILE } from "../../TYPES";
import { createTemplateFormItem } from "../render/createTemplateFormItem";
import {
  KeyOfTypePersonal,
  KeyOfTypeEducation,
  KeyOfTypeWorks,
  KeyOfTypeAchievements,
  mounth,
  KeyOfTypeTransorts,
  KeyOfTypeDocuments,
} from "../types";

import { handlerClearField } from "../handlers/handlerClearField";

// Рендер данных в попап
export const renderDataForModal = (
  modal: HTMLElement,
  profile: TYPE_PFOFILE
) => {
  const form: HTMLFormElement = modal.querySelector("form");
  const wrapperFields: HTMLElement = modal.querySelector(
    ".profile__form-items-wrapper"
  );
  const typeForm: string = form.getAttribute("data-type");
  const inputsForm = [...form.elements].filter((el) => {
    return el.tagName === "INPUT" || el.tagName === "SELECT";
  }) as HTMLInputElement[];
  if (typeForm === "service") {
    inputsForm.forEach((input) => {
      const inputName: string = input.name;
      input.value = profile.service[inputName];
    });
    const wrapperProject: HTMLElement = modal.querySelector(
      ".profile__form-fieldset-template--project"
    );
    const wrapperFields: HTMLElement = modal.querySelector(
      ".profile__form-fieldset-template--project .profile__form-items-wrapper"
    );
    if (!!profile.projects.length) {
      wrapperFields.innerHTML = "";
      profile.projects.forEach(() => {
        createTemplateFormItem(wrapperProject, wrapperFields, true, "created");
      });
      const projectItems: NodeListOf<HTMLHtmlElement> =
        wrapperFields.querySelectorAll(".profile__form-clone-item");
      projectItems.forEach((item, i) => {
        const input = item.querySelector("select");
        input.value = profile.projects[i].project_name;
        input.dataset.id = String(profile.projects[i].id);
      });
    } else {
      wrapperFields.innerHTML = "";
    }

    const wrapper: HTMLElement = modal.querySelector(
      ".profile__form-fieldset-template--departaments"
    );

    const innerWrapper: HTMLElement = wrapper.querySelector(
      ".profile__form-departaments-wrapper"
    );

    const departments: string = profile.service.departments;
    if (departments.includes("Departments:")) {
      let departamentsArray = departments.split("*");
      departamentsArray = departamentsArray.filter(
        (item) => item !== "Departments:" && item !== "-"
      );

      if (departamentsArray.length) {
        departamentsArray.forEach(() => {
          createTemplateFormItem(wrapper, innerWrapper, false);
        });

        wrapper
          .querySelectorAll(".profile__form-clone-item")
          .forEach((item, i) => {
            const input = item.querySelector("input");
            input.value = departamentsArray[i];
          });
      } else {
        wrapper.innerHTML = "";
      }
    }
  } else if (typeForm === "personal") {
    inputsForm.forEach((input) => {
      const inputName = input.name;
      if (inputName === "visible_year") {
        if (
          profile.personal.visibleYear &&
          profile.personal.visibleYear !== null
        ) {
          input.checked = false;
        } else {
          input.checked = true;
        }
      } else {
        input.value =
          `${profile.personal[inputName as KeyOfTypePersonal]}` !== "null"
            ? `${profile.personal[inputName as KeyOfTypePersonal]}`
            : "";
      }
    });
  } else if (typeForm === "documents") {
    if (!!profile.documents.length) {
      wrapperFields.innerHTML = "";
      profile.documents.forEach(() => {
        createTemplateFormItem(modal, wrapperFields);
      });
      form
        .querySelectorAll(".profile__form-clone-item")
        .forEach((wrapper, i) => {
          const inputs = [
            ...wrapper.querySelectorAll("input, select"),
          ] as HTMLInputElement[];
          inputs.forEach((input) => {
            const inputName = input.name;
            if (
              profile.documents[i][inputName as KeyOfTypeDocuments] === null
            ) {
              let fieldset: HTMLElement = input.closest(
                ".profile__form-division_code"
              );
              fieldset.innerHTML = "";
            } else {
              input.value = `${
                profile.documents[i][inputName as KeyOfTypeDocuments]
              }`;
            }
          });
        });
    } else {
      wrapperFields.innerHTML = "";
      createTemplateFormItem(modal, wrapperFields, false, "empty");
    }
  } else if (typeForm === "educations") {
    if (!!profile.educations.length) {
      wrapperFields.innerHTML = "";
      profile.educations.forEach((element) => {
        createTemplateFormItem(modal, wrapperFields);
        form
          .querySelectorAll(".profile__form-clone-item")
          .forEach((wrapper, i) => {
            const inputs = [
              ...wrapper.querySelectorAll("input, select"),
            ] as HTMLInputElement[];
            inputs.forEach((input) => {
              const inputName = input.name;
              if (inputName === "date_off_issue") {
                const dateValue = profile.educations[i][
                  inputName as KeyOfTypeEducation
                ] as string;
                input.value = dateValue.slice(0, -6);
              } else {
                input.value = `${
                  profile.educations[i][inputName as KeyOfTypeEducation]
                }`;
              }
            });
          });
      });
    } else {
      wrapperFields.innerHTML = "";
      createTemplateFormItem(modal, wrapperFields, false, "empty");
    }
  } else if (typeForm === "works") {
    if (!!profile.works.length) {
      wrapperFields.innerHTML = "";
      profile.works.forEach(() => {
        createTemplateFormItem(modal, wrapperFields);
        form
          .querySelectorAll(".profile__form-clone-item")
          .forEach((wrapper, i) => {
            const inputs = [
              ...wrapper.querySelectorAll("input"),
            ] as HTMLInputElement[];
            inputs.forEach((input) => {
              const inputName = input.name;
              input.value = `${profile.works[i][inputName as KeyOfTypeWorks]}`;
            });
          });
      });
    } else {
      wrapperFields.innerHTML = "";
      createTemplateFormItem(modal, wrapperFields, false, "empty");
    }
  } else if (typeForm === "career-achievements") {
    const careerList = profile.achievements.filter(
      (item) => item.kind === "Career"
    );

    if (!!careerList.length) {
      wrapperFields.innerHTML = "";

      careerList.forEach(() => {
        createTemplateFormItem(modal, wrapperFields, true, "created");
      });

      form
        .querySelectorAll(".profile__form-clone-item")
        .forEach((wrapper, i) => {
          const inputs = [
            ...wrapper.querySelectorAll("input, select"),
          ] as HTMLInputElement[];
          inputs.forEach((input) => {
            const inputName = input.name;
            input.value = `${
              careerList[i][inputName as KeyOfTypeAchievements]
            }`;
          });
        });
    } else {
      wrapperFields.innerHTML = "";
      createTemplateFormItem(modal, wrapperFields, false, "empty");
    }
  } else if (typeForm === "personal-achievements") {
    const personalList = profile.achievements.filter(
      (item) => item.kind === "Personal"
    );

    if (!!personalList.length) {
      wrapperFields.innerHTML = "";

      personalList.forEach(() => {
        createTemplateFormItem(modal, wrapperFields, true, "created");
      });

      form
        .querySelectorAll(".profile__form-clone-item")
        .forEach((wrapper, i) => {
          const inputs = [
            ...wrapper.querySelectorAll("input, select"),
          ] as HTMLInputElement[];
          inputs.forEach((input) => {
            const inputName = input.name;
            input.value = `${
              personalList[i][inputName as KeyOfTypeAchievements]
            }`;
          });
        });
    } else {
      wrapperFields.innerHTML = "";
      createTemplateFormItem(modal, wrapperFields, false, "empty");
    }
  } else if (typeForm === "transport") {
    if (!!profile.transports.length) {
      wrapperFields.innerHTML = "";
      profile.transports.forEach(() => {
        createTemplateFormItem(modal, wrapperFields);
      });
      form
        .querySelectorAll(".profile__form-clone-item")
        .forEach((wrapper, i) => {
          const inputs = [
            ...wrapper.querySelectorAll("input, select"),
          ] as HTMLInputElement[];
          inputs.forEach((input) => {
            const inputName = input.name;

            input.value = `${
              profile.transports[i][inputName as KeyOfTypeTransorts]
            }`;
          });
        });
    } else {
      wrapperFields.innerHTML = "";
      createTemplateFormItem(modal, wrapperFields, false, "empty");
    }
  }

  modal
    .querySelectorAll(".profile__clear-wrapper")
    .forEach((wrapper: HTMLElement) => handlerClearField(wrapper));
};
