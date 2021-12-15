import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class RegistrationErrorStateMatcher implements ErrorStateMatcher{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null)
  :any  {
    const invalidControl = control?.invalid;
    const invalidParent = control?.parent?.hasError('equalFields')
    const userActions = control!.dirty || control!.touched || form!.submitted;

    return (invalidControl || invalidParent) && userActions;

  }
}
