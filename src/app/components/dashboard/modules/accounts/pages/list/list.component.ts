import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';

import { SweetAlertUtil } from '../../../../../../utils';
import { AccountsService } from '../../../../../../services';
import { IAccount } from '../../../../../../interfaces';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [DatePipe, RouterLink],
  template: `
    <div class="px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn w-full">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold">Cuentas</h1>
          <p class="mt-2 text-base text-gray-700">
            Registro de todos los clientes de la plataforma registrados en la
            base de datos.
          </p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            [routerLink]="'add'"
            type="button"
            class="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Agregar cliente
          </button>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr class="divide-x divide-gray-200">
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Número de documento
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Primer nombre
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Segundo nombre
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Apellidos
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Tipo de cliente
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Ciudad
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Estado
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Fecha creación
                  </th>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
                  >
                    Ajustes
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                @for (account of getListOfAccounts; track $index) {
                <tr class="divide-x divide-gray-200">
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0"
                  >
                    {{ account.document }}
                  </td>
                  <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                    {{ account.first_name }}
                  </td>
                  <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                    {{ account.second_name }}
                  </td>
                  <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                    {{ account.surnames }}
                  </td>
                  <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                    {{ account.type_of_account.name }}
                  </td>
                  <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                    {{ account.city.name }}
                  </td>
                  <td
                    class="whitespace-nowrap p-4 text-sm text-gray-500 flex items-center justify-center"
                  >
                    <button
                      type="button"
                      class="rounded-full w-6 h-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 {{
                        account.status
                          ? 'bg-green-400 focus-visible:outline-green-400'
                          : 'bg-red-600 focus-visible:outline-red-600'
                      }}"
                    ></button>
                  </td>
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0"
                  >
                    {{ account.created_at | date : 'dd/MM/yyyy HH:mm' }}
                  </td>
                  <td
                    class="whitespace-nowrap p-4 text-sm text-gray-500 space-x-4"
                  >
                    <button
                      type="button"
                      (click)="view(account.uuid)"
                      class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Ver
                    </button>
                    <button
                      type="button"
                      [routerLink]="'edit/' + account.uuid"
                      class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    @if(getAccountToShow) {
    <div
      class="absolute z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                >
                  <i class="text-sm text-blue-600 fa-solid fa-info"></i>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    class="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Información del cliente
                  </h3>
                  <div class="mt-2">
                    <div
                      class="grid max-w-2xl grid-cols-12 md:col-span-2 gap-4"
                    >
                      <div class="sm:col-span-12">
                        <label
                          for="uuid"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >UUID</label
                        >
                        <div class="mt-2">
                          <input
                            id="uuid"
                            type="text"
                            name="uuid"
                            [value]="getAccountToShow.uuid"
                            [readOnly]="true"
                            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="type_of_account"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Tipo de cuenta</label
                        >
                        <div class="mt-2">
                          <input
                            id="type_of_account"
                            type="text"
                            name="type_of_account"
                            [value]="getAccountToShow.type_of_account.name"
                            [readOnly]="true"
                            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="city"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Ciudad</label
                        >
                        <div class="mt-2">
                          <input
                            id="city"
                            type="text"
                            name="city"
                            [value]="getAccountToShow.city.name"
                            [readOnly]="true"
                            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="document"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Número de documento</label
                        >
                        <div class="mt-2">
                          <input
                            id="document"
                            type="text"
                            name="document"
                            [value]="getAccountToShow.document"
                            [readOnly]="true"
                            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="first_name"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Primer nombre</label
                        >
                        <div class="mt-2">
                          <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            [value]="getAccountToShow.first_name"
                            [readOnly]="true"
                            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="second_name"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Segundo nombre</label
                        >
                        <div class="mt-2">
                          <input
                            id="second_name"
                            type="text"
                            name="second_name"
                            [value]="getAccountToShow.second_name"
                            [readOnly]="true"
                            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="surnames"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Apellidos</label
                        >
                        <div class="mt-2">
                          <input
                            id="surnames"
                            type="text"
                            name="surnames"
                            [value]="getAccountToShow.surnames"
                            [readOnly]="true"
                            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="address"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Dirección</label
                        >
                        <div class="mt-2">
                          <input
                            id="address"
                            type="text"
                            name="address"
                            [value]="getAccountToShow.address"
                            [readOnly]="true"
                            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="phone_number"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Número celular</label
                        >
                        <div class="mt-2">
                          <input
                            id="phone_number"
                            type="text"
                            name="phone_number"
                            [value]="getAccountToShow.phone_number"
                            [readOnly]="true"
                            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="name"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Estado</label
                        >
                        <div class="mt-2">
                          <input
                            id="name"
                            type="text"
                            name="name"
                            [value]="
                              getAccountToShow.status ? 'Activo' : 'Inactivo'
                            "
                            [readOnly]="true"
                            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="name"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Fecha de creación</label
                        >
                        <div class="mt-2">
                          <input
                            id="name"
                            type="text"
                            name="name"
                            [value]="
                              getAccountToShow.created_at
                                | date : 'dd/MM/yyyy HH:mm'
                            "
                            [readOnly]="true"
                            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
                        <label
                          for="name"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Fecha de actualización</label
                        >
                        <div class="mt-2">
                          <input
                            id="name"
                            type="text"
                            name="name"
                            [value]="
                              getAccountToShow.updated_at
                                | date : 'dd/MM/yyyy HH:mm'
                            "
                            [readOnly]="true"
                            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
            >
              <button
                type="button"
                (click)="setAccountToShow = null"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    }
  `,
  styles: ``,
})
export class ListComponent implements OnInit {
  private listOfAccounts: IAccount[];
  private accountToShow: IAccount | null;

  private readonly accountsService: AccountsService;

  constructor() {
    this.accountToShow = null;
    this.listOfAccounts = [];

    this.accountsService = inject(AccountsService);
  }

  ngOnInit(): void {
    this.index();
  }

  /**
   * Get all accounts in database.
   *
   * @returs - Void
   */
  public index = () => {
    this.accountsService.index().subscribe({
      next: (res) => {
        this.listOfAccounts = res.message.data;
      },
      error: () => {
        SweetAlertUtil.showServerErrorAlert();
      },
    });
  };

  /**
   * Set account to show in modal.
   *
   * @param uuid - String
   */
  public view = (uuid: string) => {
    this.accountToShow =
      this.listOfAccounts.find((account) => account.uuid === uuid) ?? null;
  };

  public get getListOfAccounts() {
    return this.listOfAccounts;
  }

  public set setAccountToShow(value: any | null) {
    this.accountToShow = value;
  }

  public get getAccountToShow() {
    return this.accountToShow;
  }
}
