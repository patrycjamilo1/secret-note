function useValidationRules(){
    const rules = {
        required: (value: string) => (!!value && value.trim() !== "") || "This field is required.",
        email: (value: string) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email address.",
        minLength: (min: number) => (value: string) =>
            value.length >= min || `Must be at least ${min} characters.`,
        matches: (fieldName: string, input: HTMLInputElement) => (value: string) => {
            const form = input.closest("form"); // Find the closest form
            if (!form) {
              return "Unable to validate matching fields.";
            }
            const targetInput = form.querySelector<HTMLInputElement>(
              `input[name="${fieldName}"]`
            );
            if (!targetInput) {
              return `Field to match (${fieldName}) not found.`;
            }
            return value === targetInput.value || "Fields do not match.";
        },
        minLowercase: (min: number) => (value: string) =>
            (value.match(/[a-z]/g) || []).length >= min ||
            `Password must contain at least ${min} lowercase letter(s).`,
        minUppercase: (min: number) => (value: string) =>
            (value.match(/[A-Z]/g) || []).length >= min ||
            `Password must contain at least ${min} uppercase letter(s).`,
        minNumbers: (min: number) => (value: string) =>
            (value.match(/[0-9]/g) || []).length >= min ||
            `Password must contain at least ${min} number(s).`,
        minSymbols: (min: number) => (value: string) =>
            (value.match(/[^a-zA-Z0-9]/g) || []).length >= min ||
            `Password must contain at least ${min} special character(s).`,
    };
    return rules;
}

export default useValidationRules;