// Templates;
const template = document.querySelector(
  `.template-vacancy-card--salary`
) as HTMLTemplateElement;

// Types;
type SalaryType = {
  isChecked: boolean;
  isGross: boolean;
  min: number | null;
  max: number | null;
};

export const createSalary = (container: HTMLElement, data: SalaryType) => {
  const { isChecked, isGross, min, max } = data;

  if (isChecked) {
    const salaryByAgreementElement = template.content
      .querySelector(`.vacancy-card__details-salary-by-agreement`)
      .cloneNode(true) as HTMLElement;

    container.append(salaryByAgreementElement);
    return;
  }

  if (min && max) {
    const salaryFixedElement = template.content
      .querySelector(`.vacancy-card__details-salary-fixed`)
      .cloneNode(true) as HTMLElement;

    const salaryValueElement = salaryFixedElement.querySelector(
      `.vacancy-card__details-salary-value`
    );
    const salaryTaxesElement = salaryFixedElement.querySelector(
      `.vacancy-card__details-salary-taxes`
    );

    salaryValueElement.textContent = `от ${min} до ${max}`;
    salaryTaxesElement.textContent = isGross ? `до вычета налогов` : `на руки`;

    container.append(salaryFixedElement);
    return;
  }

  if (min && !max) {
    const salaryFixedElement = template.content
      .querySelector(`.vacancy-card__details-salary-fixed`)
      .cloneNode(true) as HTMLElement;

    const salaryValueElement = salaryFixedElement.querySelector(
      `.vacancy-card__details-salary-value`
    );
    const salaryTaxesElement = salaryFixedElement.querySelector(
      `.vacancy-card__details-salary-taxes`
    );

    salaryValueElement.textContent = `от ${min}`;
    salaryTaxesElement.textContent = isGross ? `до вычета налогов` : `на руки`;

    container.append(salaryFixedElement);
    return;
  }

  if (max && !min) {
    const salaryFixedElement = template.content
      .querySelector(`.vacancy-card__details-salary-fixed`)
      .cloneNode(true) as HTMLElement;

    const salaryValueElement = salaryFixedElement.querySelector(
      `.vacancy-card__details-salary-value`
    );
    const salaryTaxesElement = salaryFixedElement.querySelector(
      `.vacancy-card__details-salary-taxes`
    );

    salaryValueElement.textContent = `до ${max}`;
    salaryTaxesElement.textContent = isGross ? `до вычета налогов` : `на руки`;

    container.append(salaryFixedElement);
    return;
  }

  const salaryByAgreementElement = template.content
    .querySelector(`.vacancy-card__details-salary-by-agreement`)
    .cloneNode(true) as HTMLElement;

  container.append(salaryByAgreementElement);
};
