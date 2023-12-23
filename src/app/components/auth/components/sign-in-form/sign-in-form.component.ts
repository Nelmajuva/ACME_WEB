import {
  Validators,
  FormBuilder,
  UntypedFormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { HttpResponseBase } from '@angular/common/http';

import { Store } from '@ngrx/store';

import { AuthService } from '../../../../services';
import { SweetAlertUtil } from '../../../../utils';
import { IAppState } from '../../../../interfaces';
import { setUser } from '../../+state/auth.actions';
import { FormUtil } from '../../../../utils/form.util';
import { LoadingComponent } from '../../../shared/loading/loading.component';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingComponent],
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
          <p
            class="text-xs text-red-600 mt-1 animate__animated animate__fadeInUp"
          >
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
          <p
            class="text-xs text-red-600 mt-1 animate__animated animate__fadeInUp"
          >
            La contraseña es un campo requerido y debe ser válido.
          </p>
          }
        </div>
      </div>
      <button
        type="submit"
        class="rounded-md bg-blue-50 px-3.5 w-full h-12 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-100"
      >
        @if(getIsLoading) {
        <app-loading></app-loading>
        } @else { Ingresar }
      </button>
    </form>
  `,
  styles: ``,
})
export class SignInFormComponent {
  private isLoading: boolean;
  private readonly form: UntypedFormGroup;
  private readonly store: Store<IAppState>;
  private readonly authService: AuthService;
  private readonly formBuilder: FormBuilder;
  private readonly router: Router;

  constructor() {
    this.isLoading = false;

    this.router = inject(Router);
    this.store = inject(Store<IAppState>);
    this.authService = inject(AuthService);
    this.formBuilder = inject(FormBuilder);

    this.form = this.formBuilder.group({
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

    this.authService.signInWithEmailAndPassword(dataToSignIn).subscribe({
      next: (res) => {
        this.isLoading = false;

        const user = res.message.user;
        this.store.dispatch(setUser({ value: user }));

        const token = res.message.access_token;
        sessionStorage.setItem('token_access', token);

        this.router.navigateByUrl('/dashboard');
      },
      error: (err: HttpResponseBase) => {
        this.isLoading = false;

        if (err.status === 401) {
          SweetAlertUtil.showAlert({
            icon: 'error',
            text: 'Lo sentimos, pero las credenciales ingresadas no son correctas.',
            title: '¡Datos incorrectos!',
          });

          return;
        }

        SweetAlertUtil.showServerErrorAlert();
      },
    });
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

  public get getIsLoading() {
    return this.isLoading;
  }
}
