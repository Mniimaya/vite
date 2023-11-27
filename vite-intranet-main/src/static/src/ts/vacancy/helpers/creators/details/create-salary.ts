const template = document.querySelector(
  `.template-vacancy-details--salary`
) as HTMLTemplateElement;

type SalaryType = {
  isChecked: boolean;
  isGross: boolean;
  min: number;
  max: number;
};

export const createSalary = (container: HTMLElement, data: SalaryType) => {
  const { isChecked, isGross, min, max } = data;

  if (isChecked) {
    const salaryByAgreementElement = template.content
      .querySelector(`.vacancy-details__salary-by-agreement`)
      .cloneNode(true) as HTMLElement;

    container.append(salaryByAgreementElement);
    return;
  }

  if (min && max) {
    const salaryMinToMaxElement = template.content
      .querySelector(`.vacancy-details__salary-min-to-max`)
      .cloneNode(true) as HTMLElement;
    const salaryFromValue = salaryMinToMaxElement.querySelector(
      `.vacancy-details__salary-from-value`
    );
    const salaryToValue = salaryMinToMaxElement.querySelector(
      `.vacancy-details__salary-to-value`
    );
    const salaryTaxesElement = salaryMinToMaxElement.querySelector(
      `.vacancy-details__salary-taxes`
    );

    salaryFromValue.textContent = `${min}`;
    salaryToValue.textContent = `${max}`;
    salaryTaxesElement.textContent = isGross ? `до вычета налогов` : `на руки`;

    container.append(salaryMinToMaxElement);
    return;
  }

  if (min && !max) {
    const salaryMinElement = template.content
      .querySelector(`.vacancy-details__salary-min`)
      .cloneNode(true) as HTMLElement;
    const salaryFromValue = salaryMinElement.querySelector(
      `.vacancy-details__salary-from-value`
    );
    const salaryTaxesElement = salaryMinElement.querySelector(
      `.vacancy-details__salary-taxes`
    );

    salaryFromValue.textContent = `${min}`;
    salaryTaxesElement.textContent = isGross ? `до вычета налогов` : `на руки`;

    container.append(salaryMinElement);
    return;
  }

  if (max && !min) {
    const salaryMaxElement = template.content
      .querySelector(`.vacancy-details__salary-max`)
      .cloneNode(true) as HTMLElement;
    const salaryToValue = salaryMaxElement.querySelector(
      `.vacancy-details__salary-to-value`
    );
    const salaryTaxesElement = salaryMaxElement.querySelector(
      `.vacancy-details__salary-taxes`
    );

    salaryToValue.textContent = `${max}`;
    salaryTaxesElement.textContent = isGross ? `до вычета налогов` : `на руки`;

    container.append(salaryToValue);
    return;
  }

  const salaryByAgreementElement = template.content
    .querySelector(`.vacancy-details__salary-by-agreement`)
    .cloneNode(true) as HTMLElement;

  container.append(salaryByAgreementElement);
};
