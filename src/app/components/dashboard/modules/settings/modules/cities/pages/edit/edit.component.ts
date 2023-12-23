import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Subscription } from 'rxjs';

import { CitiesService } from '../../../../../../../../services';
import { FormUtil, SweetAlertUtil } from '../../../../../../../../utils';
import { LoadingComponent } from '../../../../../../../shared/loading/loading.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, LoadingComponent],
  template: `
    <div class="px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn w-full">
      <div class="sm:flex sm:items-center mb-8">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold">Editar ciudad</h1>
        </div>
      </div>
      <form (ngSubmit)="update()" [formGroup]="getForm">
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
                  >Nombre</label
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
              <div class="sm:col-span-3">
                <label
                  for="status"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Estado</label
                >
                <div class="mt-2">
                  <select
                    id="status"
                    name="status"
                    autocomplete="status"
                    formControlName="status"
                    class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option [value]="0">Inactivo</option>
                    <option [value]="1">Activo</option>
                  </select>
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
            @if(!getIsLoading) { Editar } @else {
            <app-loading [isWhiteIndicator]="true"></app-loading>
            }
          </button>
        </div>
      </form>
    </div>
  `,
  styles: ``,
})
export class EditComponent implements OnInit, OnDestroy {
  private id: number | null;
  private isLoading: boolean;

  private readonly router: Router;
  private readonly form: FormGroup;
  private readonly formBuilder: FormBuilder;
  private readonly citiesService: CitiesService;
  private readonly activatedRoute: ActivatedRoute;
  private readonly listOfSubscriptions$: Subscription[];

  constructor() {
    this.id = null;
    this.isLoading = false;

    this.listOfSubscriptions$ = [];

    this.router = inject(Router);
    this.formBuilder = inject(FormBuilder);
    this.citiesService = inject(CitiesService);
    this.activatedRoute = inject(ActivatedRoute);

    this.form = this.formBuilder.group({
      name: ['', FormUtil.checkField(32)],
      status: [1],
    });
  }

  ngOnInit(): void {
    this.getId();
  }

  ngOnDestroy(): void {
    this.listOfSubscriptions$.forEach((sub$) => sub$.unsubscribe());
  }

  /**
   * Get id in URL.
   *
   * @returns - Void
   */
  private getId = () => {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.id = id;
      if (!this.id) return;
      this.show();
    });
  };

  /**
   * Get city in the database.
   *
   * @returns - Void
   */
  private show = () => {
    if (!this.id) return;
    this.citiesService.show(this.id).subscribe({
      next: (res) => {
        if (res.message === null) {
          this.router.navigateByUrl('/dashboard/settings/cities');
          return;
        }

        const data = res.message;

        this.form.setValue({
          name: data.name,
          status: data.status,
        });
      },
      error: () => {
        SweetAlertUtil.showServerErrorAlert();
      },
    });
  };

  /**
   * Update the city in the database.
   *
   * @returns - Void
   */
  public update = () => {
    if (this.isLoading || !this.id) return;

    if (this.form.invalid) {
      FormUtil.dispatchInvalid(this.form);
      SweetAlertUtil.showFormInvalidAlert();
      return;
    }

    this.isLoading = true;
    const data = this.form.value;

    this.citiesService.update(this.id, data).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/dashboard/settings/cities/list');

        SweetAlertUtil.showAlert({
          icon: 'success',
          text: 'La ciudad ha sido actualizada correctamente.',
          title: '¡Eres genial!',
        });
      },
      error: () => {
        this.isLoading = false;

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
