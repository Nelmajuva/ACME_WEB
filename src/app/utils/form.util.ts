import { FormGroup, ValidatorFn, Validators } from '@angular/forms';

export class FormUtil {
  /**
   *  Check email address is valid.
   *
   * @returns ValidatorFn | null
   */
  public static checkEmail = (): ValidatorFn | null => {
    return Validators.compose([Validators.required, Validators.email]);
  };

  /**
   * Checks if the form is valid according to the value assigned in the controller.
   *
   * @param form - Form instance.
   * @param value - Value of controller.
   * @returns boolean.
   */
  public static validate = (form: FormGroup, value: string): boolean => {
    return (
      (form.controls[value].errors && form.controls[value].touched) ?? false
    );
  };

  /**
   * Dispatch all errors in the form.
   *
   * @param form - Form instance.
   */
  public static dispatchInvalid = (form: FormGroup): void => {
    form.markAllAsTouched();
  };
}
