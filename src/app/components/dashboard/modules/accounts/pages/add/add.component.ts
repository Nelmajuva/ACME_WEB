import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { switchMap } from 'rxjs';

import { FormUtil, SweetAlertUtil } from '../../../../../../utils';
import { ICity, IResponse, ITypeOfAccount } from '../../../../../../interfaces';
import { LoadingComponent } from '../../../../../shared/loading/loading.component';
import {
  AccountsService,
  CitiesService,
  TypesOfAccountsService,
} from '../../../../../../services';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, LoadingComponent],
  template: `
    <div class="px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn w-full">
      <div class="sm:flex sm:items-center mb-8">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold">Agregar un nuevo cliente</h1>
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
                  for="type_of_account"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Tipo de cuenta <span class="text-red-600">*</span></label
                >
                <div class="mt-2">
                  <select
                    id="type_of_account"
                    name="type_of_account"
                    formControlName="type_of_account_id"
                    class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    @for(typeOfAccount of getListTypesOfAccounts; track $index)
                    {
                    <option [value]="typeOfAccount.id">
                      {{ typeOfAccount.name }}
                    </option>
                    }
                  </select>
                  @if(validate('type_of_account_id')) {
                  <p
                    class="text-xs text-red-600 mt-1 animate__animated animate__fadeInUp"
                  >
                    El tipo de cuenta es un campo requerido.
                  </p>
                  }
                </div>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="city"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Ciudad <span class="text-red-600">*</span></label
                >
                <div class="mt-2">
                  <select
                    id="city"
                    name="city"
                    formControlName="city_id"
                    class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    @for(city of getListOfCities; track $index) {
                    <option [value]="city.id">
                      {{ city.name }}
                    </option>
                    }
                  </select>
                  @if(validate('city_id')) {
                  <p
                    class="text-xs text-red-600 mt-1 animate__animated animate__fadeInUp"
                  >
                    La ciudad es un campo requerido.
                  </p>
                  }
                </div>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="document"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Número de documento <span class="text-red-600">*</span></label
                >
                <div class="mt-2">
                  <input
                    id="document"
                    type="number"
                    name="name"
                    formControlName="document"
                    class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                  @if(validate('document')) {
                  <p
                    class="text-xs text-red-600 mt-1 animate__animated animate__fadeInUp"
                  >
                    El número de documento es un campo requerido y no puede
                    tener más de 12 dígitos.
                  </p>
                  }
                </div>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="first_name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Primer nombre <span class="text-red-600">*</span></label
                >
                <div class="mt-2">
                  <input
                    id="first_name"
                    type="text"
                    name="name"
                    formControlName="first_name"
                    class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                  @if(validate('first_name')) {
                  <p
                    class="text-xs text-red-600 mt-1 animate__animated animate__fadeInUp"
                  >
                    El primer nombre es un campo requerido y no puede tener más
                    de 32 dígitos.
                  </p>
                  }
                </div>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="second_name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Segundo nombre</label
                >
                <div class="mt-2">
                  <input
                    id="second_name"
                    type="text"
                    name="name"
                    formControlName="second_name"
                    class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="surnames"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Apellidos <span class="text-red-600">*</span></label
                >
                <div class="mt-2">
                  <input
                    id="surnames"
                    type="text"
                    name="name"
                    formControlName="surnames"
                    class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                  @if(validate('surnames')) {
                  <p
                    class="text-xs text-red-600 mt-1 animate__animated animate__fadeInUp"
                  >
                    El apellido es un campo requerido y no puede tener más de 48
                    dígitos.
                  </p>
                  }
                </div>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="phone_number"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Número de celular <span class="text-red-600">*</span></label
                >
                <div class="mt-2">
                  <input
                    id="phone_number"
                    type="number"
                    name="name"
                    formControlName="phone_number"
                    class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                  @if(validate('phone_number')) {
                  <p
                    class="text-xs text-red-600 mt-1 animate__animated animate__fadeInUp"
                  >
                    El número de celular es un campo requerido y no puede tener
                    más de 16 dígitos.
                  </p>
                  }
                </div>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="address"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Dirección <span class="text-red-600">*</span></label
                >
                <div class="mt-2">
                  <input
                    id="address"
                    type="text"
                    name="name"
                    formControlName="address"
                    class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                  @if(validate('address')) {
                  <p
                    class="text-xs text-red-600 mt-1 animate__animated animate__fadeInUp"
                  >
                    La dirección es un campo requerido y no puede tener más de
                    64 dígitos.
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
export class AddComponent implements OnInit {
  private isLoading: boolean;
  private listOfCities: ICity[];
  private listTypesOfAccounts: ITypeOfAccount[];

  private readonly router: Router;
  private readonly form: FormGroup;
  private readonly formBuilder: FormBuilder;
  private readonly citiesService: CitiesService;
  private readonly accountsService: AccountsService;
  private readonly typesOfAccountsService: TypesOfAccountsService;

  constructor() {
    this.isLoading = false;
    this.listOfCities = [];
    this.listTypesOfAccounts = [];

    this.router = inject(Router);
    this.formBuilder = inject(FormBuilder);
    this.citiesService = inject(CitiesService);
    this.accountsService = inject(AccountsService);
    this.typesOfAccountsService = inject(TypesOfAccountsService);

    this.form = this.formBuilder.group({
      type_of_account_id: ['', FormUtil.checkField()],
      city_id: ['', FormUtil.checkField()],
      document: ['', FormUtil.checkField(12)],
      first_name: ['', FormUtil.checkField(32)],
      second_name: ['', FormUtil.checkField(32, false)],
      surnames: ['', FormUtil.checkField(48)],
      phone_number: ['', FormUtil.checkField(16)],
      address: ['', FormUtil.checkField(64)],
    });
  }

  ngOnInit(): void {
    this.citiesService
      .index()
      .pipe(
        switchMap((res) => {
          this.listOfCities = res.message.data;

          return this.typesOfAccountsService.index();
        })
      )
      .subscribe((res) => (this.listTypesOfAccounts = res.message.data));
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

    this.accountsService.store(data).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/dashboard/accounts');

        SweetAlertUtil.showAlert({
          icon: 'success',
          text: 'El nuevo cliente ha sido registrado correctamente.',
          title: '¡Eres genial!',
        });
      },
      error: ({ error }: HttpErrorResponse & { error: IResponse<string> }) => {
        this.isLoading = false;

        if (['The document has already been taken.'].includes(error.message)) {
          SweetAlertUtil.showAlert({
            icon: 'error',
            text: 'Lo sentimos, pero el cliente ya se encuentra registrado en la base de datos.',
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

  public get getListOfCities() {
    return this.listOfCities;
  }

  public get getListTypesOfAccounts() {
    return this.listTypesOfAccounts;
  }
}
