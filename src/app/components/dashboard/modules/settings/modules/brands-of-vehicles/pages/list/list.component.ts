import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';

import { SweetAlertUtil } from '../../../../../../../../utils';
import { IBrandOfVehicle } from '../../../../../../../../interfaces';
import { BrandsOfVehiclesService } from '../../../../../../../../services';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [DatePipe, RouterLink],
  template: `
    <div class="px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn w-full">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold">Marcas de vehículos</h1>
          <p class="mt-2 text-base text-gray-700">
            Todas las marcas de los vehículos registrados en un solo lugar.
          </p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            [routerLink]="'add'"
            type="button"
            class="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Agregar marca de vehículo
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
                    Id
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Nombre
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
                @for (brand of getlistBrandsOfVehicles; track $index) {
                <tr class="divide-x divide-gray-200">
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0"
                  >
                    {{ brand.id }}
                  </td>
                  <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                    {{ brand.name }}
                  </td>
                  <td
                    class="whitespace-nowrap p-4 text-sm text-gray-500 flex items-center justify-center"
                  >
                    <button
                      type="button"
                      class="rounded-full w-6 h-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 {{
                        brand.status
                          ? 'bg-green-400 focus-visible:outline-green-400'
                          : 'bg-red-600 focus-visible:outline-red-600'
                      }}"
                    ></button>
                  </td>
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0"
                  >
                    {{ brand.created_at | date : 'dd/MM/yyyy HH:mm' }}
                  </td>
                  <td
                    class="whitespace-nowrap p-4 text-sm text-gray-500 space-x-4"
                  >
                    <button
                      type="button"
                      (click)="view(brand.id)"
                      class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Ver
                    </button>
                    <button
                      type="button"
                      [routerLink]="'edit/' + brand.id"
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

    @if(getBrandToShow) {
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
                    Información de la marca
                  </h3>
                  <div class="mt-2">
                    <div
                      class="grid max-w-2xl grid-cols-12 md:col-span-2 gap-4"
                    >
                      <div class="sm:col-span-6">
                        <label
                          for="id"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Id</label
                        >
                        <div class="mt-2">
                          <input
                            id="id"
                            type="text"
                            name="id"
                            [value]="getBrandToShow.id"
                            [readOnly]="true"
                            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div class="sm:col-span-6">
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
                            [value]="getBrandToShow.name"
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
                              getBrandToShow.status ? 'Activo' : 'Inactivo'
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
                              getBrandToShow.created_at
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
                              getBrandToShow.updated_at
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
                (click)="setbrandOfVehicleToShow = null"
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
  private listBrandsOfVehicles: IBrandOfVehicle[];
  private brandOfVehicleToShow: IBrandOfVehicle | null;

  private readonly brandsOfVehiclesService: BrandsOfVehiclesService;

  constructor() {
    this.brandOfVehicleToShow = null;
    this.listBrandsOfVehicles = [];

    this.brandsOfVehiclesService = inject(BrandsOfVehiclesService);
  }

  ngOnInit(): void {
    this.index();
  }

  /**
   * Get all brands in database.
   *
   * @returs - Void
   */
  public index = () => {
    this.brandsOfVehiclesService.index().subscribe({
      next: (res) => {
        this.listBrandsOfVehicles = res.message.data;
      },
      error: () => {
        SweetAlertUtil.showServerErrorAlert();
      },
    });
  };

  /**
   * Set brand to show in modal.
   * 
   * @param id - Number
   */
  public view = (id: number) => {
    this.brandOfVehicleToShow = this.listBrandsOfVehicles.find((brand) => brand.id === id) ?? null;
  };

  public get getlistBrandsOfVehicles() {
    return this.listBrandsOfVehicles;
  }

  public set setbrandOfVehicleToShow(value: IBrandOfVehicle | null) {
    this.brandOfVehicleToShow = value;
  }

  public get getBrandToShow() {
    return this.brandOfVehicleToShow;
  }
}
