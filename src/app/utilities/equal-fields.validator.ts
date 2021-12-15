import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';


export const equalFieldsValidator = (...fields: string[]): any => {
  return (group: FormGroup): ValidationErrors | null => {
    const areEquals = fields
      .map(fieldName => group.get(fieldName))
      .filter(Boolean)
      .every((control, i, array) => control?.value === array[0]?.value);

    return areEquals ? null : { equalFields: true };
  };
};
