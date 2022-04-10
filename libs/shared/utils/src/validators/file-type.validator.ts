import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export function fileTypeValidator(type: 'csv'): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    if (file) {
      const extension = file.name.split('.')[1].toLowerCase();
      return type !== extension ? { requiredFileType: true } : null;
    }
    return null;
  }
}
