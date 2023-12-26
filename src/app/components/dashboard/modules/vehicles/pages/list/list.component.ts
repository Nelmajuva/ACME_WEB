import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';

import { IVehicle } from '../../../../../../interfaces';
import { SweetAlertUtil, downloadBlobElement } from '../../../../../../utils';
import { VehiclesService } from '../../../../../../services';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [DatePipe, RouterLink],
  template: `
    <div class="px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn w-full">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold">Vehículos</h1>
          <p class="mt-2 text-base text-gray-700">
            Todos los vehículos que se encuentran registrados.
          </p>
        </div>
        <div
          class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center justify-center gap-2"
        >
          <button
            type="button"
            (click)="getReportOfVehicles()"
            class="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Reporte
          </button>
          <button
            [routerLink]="'add'"
            type="button"
            class="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Agregar vehículo
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
                    Placa
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Marca
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Motor
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Tipo de vehículo
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
                @for (vehicle of getListOfVehicles; track $index) {
                <tr class="divide-x divide-gray-200">
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0"
                  >
                    {{ vehicle.plate }}
                  </td>
                  <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                    {{ vehicle.brand_of_vehicle.name }}
                  </td>
                  <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                    {{ vehicle.motor_of_vehicle.name }}
                  </td>
                  <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                    {{ vehicle.type_of_vehicle.name }}
                  </td>
                  <td
                    class="whitespace-nowrap p-4 text-sm text-gray-500 flex items-center justify-center"
                  >
                    <button
                      type="button"
                      class="rounded-full w-6 h-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 {{
                        vehicle.status
                          ? 'bg-green-400 focus-visible:outline-green-400'
                          : 'bg-red-600 focus-visible:outline-red-600'
                      }}"
                    ></button>
                  </td>
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0"
                  >
                    {{ vehicle.created_at | date : 'dd/MM/yyyy HH:mm' }}
                  </td>
                  <td
                    class="whitespace-nowrap p-4 text-sm text-gray-500 space-x-4"
                  >
                    <button
                      type="button"
                      [routerLink]="'view/' + vehicle.uuid"
                      class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Ver
                    </button>
                    <button
                      type="button"
                      [routerLink]="'edit/' + vehicle.uuid"
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
  `,
  styles: ``,
})
export class ListComponent implements OnInit {
  private listOfVehicles: IVehicle[];

  private readonly vehiclesService: VehiclesService;

  constructor() {
    this.listOfVehicles = [];

    this.vehiclesService = inject(VehiclesService);
  }

  ngOnInit(): void {
    this.index();
  }

  /**
   * Generate report of vehicles.
   *
   * @returns - Void
   */
  public getReportOfVehicles = () => {
    this.vehiclesService.getReportOfVehicles().subscribe({
      next: (res) => {
        downloadBlobElement(res, 'informe_vehiculos_' + new Date().getTime());
      },
      error: () => {
        SweetAlertUtil.showServerErrorAlert();
      },
    });
  };

  /**
   * Get all vehicles in database.
   *
   * @returs - Void
   */
  public index = () => {
    this.vehiclesService.index().subscribe({
      next: (res) => {
        this.listOfVehicles = res.message.data;
      },
      error: () => {
        SweetAlertUtil.showServerErrorAlert();
      },
    });
  };

  public get getListOfVehicles() {
    return this.listOfVehicles;
  }
}
