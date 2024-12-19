import { reactive } from "vue";

export interface ValidationErrors {
  [key: string]: string;
}

export function useFormValidation() {
    const errors = reactive<ValidationErrors>({});
    const validationRules = useValidationRules();

    const validateField = (input: HTMLInputElement): void => {
        const rulesString = input.dataset.rules;
        const value = input.value.trim();

        delete errors[input.name];

        if (rulesString) {
        const rules = rulesString.split("|");

        for (const rule of rules) {
            const [ruleName, param] = rule.split(":");
            const validationRule = (validationRules as any)[ruleName];

            if (validationRule) {
                const result =
                    ruleName === "matches"
                    ? validationRule(param, input)(value)
                    : typeof param !== "undefined"
                    ? validationRule(param)(value)
                    : validationRule(value);

            if (result !== true) {
                errors[input.name] = result as string; // Set the first error
                break;
            }
            } else {
            console.warn(`Validation rule "${ruleName}" not found.`);
            }
        }
        }
    };

    const validateForm = (form: HTMLFormElement): boolean => {
        const formInputs = form.querySelectorAll<HTMLInputElement>("input");
        let isValid = true;

        Object.keys(errors).forEach((key) => delete errors[key]);

        formInputs.forEach((input) => {
            validateField(input);
            if (errors[input.name]) isValid = false;
        });

        return isValid;
    };

    const clearErrors = () => {
        Object.keys(errors).forEach((key) => delete errors[key]);
    };

    const setErrors = (apiErrors: ValidationErrors): void => {
        Object.keys(apiErrors).forEach((key) => {
          errors[key] = apiErrors[key]; // Populate errors with API errors
        });
      };

    const handleBlur = (e: FocusEvent): void => {
        const target = e.target as HTMLInputElement;
        if (target.tagName === "INPUT" && target.dataset.rules) {
            validateField(target); // Validate the field
        }
        if(target.tagName === "INPUT" && !target.dataset.rules) {
            errors[target.name] = '';
        }
    };

    const handleInput = (e: Event): void => {
        const target = e.target as HTMLInputElement;
        if (target.tagName === "INPUT" && target.name in errors) {
        delete errors[target.name]; // Clear the error for this field
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
