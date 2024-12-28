import { reactive } from "vue";

export interface ValidationErrors {
  [key: string]: string;
}

export function useFormValidation() {
  const errors = reactive<ValidationErrors>({});
  const validationRules = useValidationRules();

  const validateField = (field: HTMLInputElement | HTMLTextAreaElement): void => {
    const rulesString = field.dataset.rules;
    const value = field.value.trim();

    delete errors[field.name];

    if (rulesString) {
      const rules = rulesString.split("|");

      for (const rule of rules) {
        const [ruleName, param] = rule.split(":");
        const validationRule = (validationRules as any)[ruleName];

        if (validationRule) {
          const result =
            ruleName === "matches"
              ? validationRule(param, field)(value)
              : typeof param !== "undefined"
              ? validationRule(param)(value)
              : validationRule(value);

          if (result !== true) {
            errors[field.name] = result as string;
            break;
          }
        } else {
          console.warn(`Validation rule "${ruleName}" not found.`);
        }
      }
    }
  };


  const validateForm = (form: HTMLFormElement): boolean => {
    const formFields = form.querySelectorAll(
      "input, textarea"
    ) as NodeListOf<HTMLInputElement | HTMLTextAreaElement>;

    let isValid = true;

    Object.keys(errors).forEach((key) => delete errors[key]);

    formFields.forEach((field) => {
      validateField(field);
      if (errors[field.name]) isValid = false;
    });

    return isValid;
  };

  const clearErrors = () => {
    Object.keys(errors).forEach((key) => delete errors[key]);
  };

  const setErrors = (apiErrors: ValidationErrors): void => {
    Object.keys(apiErrors).forEach((key) => {
      errors[key] = apiErrors[key];
    });
  };

  const handleBlur = (e: FocusEvent): void => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    if ((target.tagName === "INPUT" || target.tagName === "TEXTAREA") && target.dataset.rules) {
      validateField(target); // Validate if it has data-rules
    }

    if ((target.tagName === "INPUT" || target.tagName === "TEXTAREA") && !target.dataset.rules) {
      errors[target.name] = "";
    }
  };

  const handleInput = (e: Event): void => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    if ((target.tagName === "INPUT" || target.tagName === "TEXTAREA") && target.name in errors) {
      delete errors[target.name];
    }
  };

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
    setErrors,
    handleBlur,
    handleInput,
  };
}
