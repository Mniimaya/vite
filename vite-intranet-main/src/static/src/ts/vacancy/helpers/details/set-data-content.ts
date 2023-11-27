// Helpers;
import { VACANCY_HELPERS_HIDDEN } from "../../const";

type ContentType = {
  functional: string;
  wishes: string;
  advantages: string;
  offering: string;
};

export const setDataContent = (container: HTMLElement, data: ContentType) => {
  const { functional, wishes, advantages, offering } = data;

  // Containers;
  const functionalContainer = container.querySelector(
    `.vacancy-details__functional`
  );
  const wishesContainer = container.querySelector(`.vacancy-details__wishes`);
  const advantagesContainer = container.querySelector(
    `.vacancy-details__advantages`
  );
  const offeringContainer = container.querySelector(
    `.vacancy-details__offering`
  );

  // Elements;
  const functionalContent = container.querySelector(
    `.vacancy-details__functional-content`
  );
  const wishesContent = container.querySelector(
    `.vacancy-details__wishes-content`
  );
  const advantagesContent = container.querySelector(
    `.vacancy-details__advantages-content`
  );
  const offeringContent = container.querySelector(
    `.vacancy-details__offering-content`
  );

  // Logic;
  if (functional.length === 0) {
    functionalContainer.classList.add(VACANCY_HELPERS_HIDDEN);
  } else {
    functionalContent.innerHTML = functional;
  }

  if (wishes.length === 0) {
    wishesContainer.classList.add(VACANCY_HELPERS_HIDDEN);
  } else {
    wishesContent.innerHTML = wishes;
  }

  if (advantages.length === 0) {
    advantagesContainer.classList.add(VACANCY_HELPERS_HIDDEN);
  } else {
    advantagesContent.innerHTML = advantages;
  }

  if (offering.length === 0) {
    offeringContainer.classList.add(VACANCY_HELPERS_HIDDEN);
  } else {
    offeringContent.innerHTML = offering;
  }
};
