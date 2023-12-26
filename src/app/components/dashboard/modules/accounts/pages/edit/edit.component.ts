import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Subscription, switchMap } from 'rxjs';

import { FormUtil, SweetAlertUtil } from '../../../../../../utils';
import { ICity, ITypeOfAccount } from '../../../../../../interfaces';
import { LoadingComponent } from '../../../../../shared/loading/loading.component';
import {
  AccountsService,
  CitiesService,
  TypesOfAccountsService,
} from '../../../../../../services';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, LoadingComponent],
  template: `
    <div class="px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn w-full">
      <div class="sm:flex sm:items-center mb-8">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold">Editar cliente</h1>
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
                  for="type_of_account"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Tipo de cuenta</label
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
                  >Ciudad</label
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
                  >Número de documento</label
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
                  >Primer nombre</label
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
                  surnames
                  for="surnames"
                  surnames
                  for="surnames"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Apellidos</label
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
                  >Número de celular</label
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
                  >Dirección</label
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
  private uuid: string | null;
  private isLoading: boolean;
  private listOfCities: ICity[];
  private listTypesOfAccounts: ITypeOfAccount[];

  private readonly router: Router;
  private readonly form: FormGroup;
  private readonly formBuilder: FormBuilder;
  private readonly citiesService: CitiesService;
  private readonly activatedRoute: ActivatedRoute;
  private readonly accountsService: AccountsService;
  private readonly listOfSubscriptions$: Subscription[];
  private readonly typesOfAccountsService: TypesOfAccountsService;

  constructor() {
    this.uuid = null;
    this.isLoading = false;

    this.listOfCities = [];
    this.listTypesOfAccounts = [];
    this.listOfSubscriptions$ = [];

    this.router = inject(Router);
    this.formBuilder = inject(FormBuilder);
    this.citiesService = inject(CitiesService);
    this.activatedRoute = inject(ActivatedRoute);
    this.accountsService = inject(AccountsService);
    this.typesOfAccountsService = inject(TypesOfAccountsService);

    this.form = this.formBuilder.group({
      status: [1],
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
    this.getUUID();
    this.getResources();
  }

  ngOnDestroy(): void {
    this.listOfSubscriptions$.forEach((sub$) => sub$.unsubscribe());
  }

  private getResources = () => {
    this.citiesService
      .index()
      .pipe(
        switchMap((res) => {
          this.listOfCities = res.message.data;

          return this.typesOfAccountsService.index();
        })
      )
      .subscribe((res) => (this.listTypesOfAccounts = res.message.data));
  };

  /**
   * Get uuid in URL.
   *
   * @returns - Void
   */
  private getUUID = () => {
    this.activatedRoute.params.subscribe(({ uuid }) => {
      this.uuid = uuid;
      if (!this.uuid) return;
      this.show();
    });
  };

  /**
   * Get account in the database.
   *
   * @returns - Void
   */
  private show = () => {
    if (!this.uuid) return;
    this.accountsService.show(this.uuid).subscribe({
      next: (res) => {
        if (res.message === null) {
          this.router.navigateByUrl('/dashboard/accounts');
          return;
        }

        const data = res.message;

        this.form.setValue({
          type_of_account_id: data.type_of_account.id,
          city_id: data.city.id,
          document: data.document,
          first_name: data.first_name,
          second_name: data.second_name,
          surnames: data.surnames,
          phone_number: data.phone_number,
          address: data.address,
          status: data.status,
        });
      },
      error: () => {
        SweetAlertUtil.showServerErrorAlert();
      },
    });
  };

  /**
   * Update the account in the database.
   *
   * @returns - Void
   */
  public update = () => {
    if (this.isLoading || !this.uuid) return;

    if (this.form.invalid) {
      FormUtil.dispatchInvalid(this.form);
      SweetAlertUtil.showFormInvalidAlert();
      return;
    }

    this.isLoading = true;
    const data = this.form.value;

    this.accountsService.update(this.uuid, data).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/dashboard/accounts/list');

        SweetAlertUtil.showAlert({
          icon: 'success',
          text: 'La cuenta ha sido actualizada correctamente.',
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

  public get getListOfCities() {
    return this.listOfCities;
  }

  public get getListTypesOfAccounts() {
    return this.listTypesOfAccounts;
  }
}
