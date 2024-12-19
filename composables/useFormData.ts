const useFormData = <T extends Record<string, string>>(form: HTMLFormElement): T => {
    const formData = {} as T;
  
    Array.from(form.elements).forEach((element) => {
      if ("name" in element && element.name) {
        const inputElement = element as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        if (inputElement.type === "checkbox" || inputElement.type === "radio") {
          // Include value only if checked
          if ((inputElement as HTMLInputElement).checked) {
            (formData as Record<string, string>)[inputElement.name] = inputElement.value;
          }
        } else {
          (formData as Record<string, string>)[inputElement.name] = inputElement.value;
        }
      }
    });
  
    return formData;
};

export default useFormData;