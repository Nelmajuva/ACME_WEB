import { Component, inject } from '@angular/core';
import {
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { AuthService } from '../../../../services';
import { SweetAlertUtil } from '../../../../utils';
import { FormUtil } from '../../../../utils/form.util';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form
      (ngSubmit)="signInWithEmailAndPassword()"
      [formGroup]="getForm"
      autocomplete="off"
      class="w-full"
    >
      <div class="mb-2">
        <label
          for="email"
          class="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
          >Correo electrónico</label
        >
        <div class="mt-1">
          <input
            id="email"
            type="email"
            name="email"
            formControlName="email"
            class="outline-none block w-full rounded-full border-0 px-4 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder="admin@transportesacme.com.co"
          />
          @if(validate('email')) {
          <p class="text-xs text-red-600 mt-1 animate__animated animate__fadeInUp">
            El correo electrónico es un campo requerido y debe ser válido.
          </p>
          }
        </div>
      </div>
      <div class="mb-8">
        <label
          for="password"
          class="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
          >Contraseña</label
        >
        <div class="mt-1">
          <input
            id="password"
            type="password"
            name="password"
            formControlName="password"
            class="outline-none block w-full rounded-full border-0 px-4 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder="*********"
          />
          @if(validate('password')) {
          <p class="text-xs text-red-600 mt-1 animate__animated animate__fadeInUp">
            La contraseña es un campo requerido y debe ser válido.
          </p>
          }
        </div>
      </div>
      <button
        type="submit"
        class="rounded-md bg-blue-50 px-3.5 w-full h-12 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-100"
      >
        Ingresar
      </button>
    </form>
  `,
  styles: ``,
})
export class SignInFormComponent {
  private isLoading: boolean;
  private readonly form: UntypedFormGroup;

  constructor() {
    this.isLoading = false;

    const formBuilder = inject(UntypedFormBuilder);
    this.form = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  /**
   * Send all data input and try sign in.
   *
   * @returns - Void
   */
  public signInWithEmailAndPassword = () => {
    if (this.isLoading) return;

    if (this.form.invalid) {
      FormUtil.dispatchInvalid(this.form);
      SweetAlertUtil.showFormInvalidAlert();
      return;
    }

    this.isLoading = true;
    const dataToSignIn = this.form.value;

    const authService = inject(AuthService);
    authService.signInWithEmailAndPassword(dataToSignIn).subscribe(console.log);
  };

  /**
   * Check field status in the form.
   *
   * @param value - String
   * @returns - Void
   */
  public validate = (value: string) => FormUtil.validate(this.form, value);

  public get getForm() {
    return this.form;
  }
}
