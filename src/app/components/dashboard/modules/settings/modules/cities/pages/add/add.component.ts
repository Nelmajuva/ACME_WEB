import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { IResponse } from '../../../../../../../../interfaces';
import { CitiesService } from '../../../../../../../../services';
import { FormUtil, SweetAlertUtil } from '../../../../../../../../utils';
import { LoadingComponent } from '../../../../../../../shared/loading/loading.component';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, LoadingComponent],
  template: `
    <div class="px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn w-full">
      <div class="sm:flex sm:items-center mb-8">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold">Agregar una nueva ciudad</h1>
        </div>
      </div>
      <form (ngSubmit)="store()" [formGroup]="getForm">
        <div class="space-y-12">
          <div
            class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3"
          >
            <div>
              <h2 class="text-base font-semibold leading-7 text-gray-900">
                Información
              </h2>
              <p class="mt-1 text-sm leading-6 text-gray-600">
                Todos los campos marcados con
                <span class="text-red-600">*</span> son obligatorios.
              </p>
            </div>

            <div
              class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2"
            >
              <div class="sm:col-span-3">
                <label
                  for="name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Nombre <span class="text-red-600">*</span></label
                >
                <div class="mt-2">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    formControlName="name"
                    class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                  @if(validate('name')) {
                  <p
                    class="text-xs text-red-600 mt-1 animate__animated animate__fadeInUp"
                  >
                    El nombre es un campo requerido y no puede tener más de 32
                    dígitos.
                  </p>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button
            [routerLink]="'list'"
            type="button"
            class="text-sm w-24 h-12 font-semibold leading-6 text-gray-900"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="rounded-md bg-blue-600 w-24 h-12 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            @if(!getIsLoading) { Guardar } @else {
            <app-loading [isWhiteIndicator]="true"></app-loading>
            }
          </button>
        </div>
      </form>
    </div>
  `,
  styles: ``,
})
export class AddComponent {
  private isLoading: boolean;
  private readonly router: Router;
  private readonly form: FormGroup;
  private readonly formBuilder: FormBuilder;
  private readonly citiesService: CitiesService;

  constructor() {
    this.isLoading = false;

    this.router = inject(Router);
    this.formBuilder = inject(FormBuilder);
    this.citiesService = inject(CitiesService);

    this.form = this.formBuilder.group({
      name: ['', FormUtil.checkField(32)],
    });
  }


  /**
   * Add new city in database.
   * 
   * @returns - Void
   */
  public store = () => {
    if (this.isLoading) return;

    if (this.form.invalid) {
      FormUtil.dispatchInvalid(this.form);
      SweetAlertUtil.showFormInvalidAlert();
      return;
    }

    this.isLoading = true;
    const data = this.form.value;

    this.citiesService.store(data).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/dashboard/settings/cities/list');

        SweetAlertUtil.showAlert({
          icon: 'success',
          text: 'La nueva ciudad ha sido registrada correctamente.',
          title: '¡Eres genial!',
        });
      },
      error: ({ error }: HttpErrorResponse & { error: IResponse<string> }) => {
        this.isLoading = false;

        if (error.message === 'The name has already been taken.') {
          SweetAlertUtil.showAlert({
            icon: 'error',
            text: 'Lo sentimos, pero la ciudad ya se encuentra registrada en la base de datos.',
            title: '¡Datos ya existentes!',
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
