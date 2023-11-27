import { TYPE_PROFILE_PROJECT } from "../../TYPES";

// Рендер проектов
export const renderProjects = (projectsData: TYPE_PROFILE_PROJECT[]) => {
  const serviceListProjects = document.querySelector(".profile__project-name");
  if (projectsData.length) {
    serviceListProjects.parentElement.style.display = "block";
    let projectArray: string[] = [];
    projectsData.forEach((project: TYPE_PROFILE_PROJECT) => {
      projectArray.push(project.project_name);
    });

    const projectString: string = projectArray.join(", ");
    serviceListProjects.textContent = projectString;
  } else {
    serviceListProjects.parentElement.style.display = "none";
  }
};
