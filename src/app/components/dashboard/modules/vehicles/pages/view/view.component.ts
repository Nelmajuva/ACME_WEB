import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { IVehicle } from '../../../../../../interfaces';
import { VehiclesService } from '../../../../../../services';
import { SweetAlertUtil } from '../../../../../../utils';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterLink, NgIf],
  template: `<div class="animate__animated animate__fadeIn w-full">
    <div class="w-full flex items-end justify-end mb-4">
      <button
        type="button"
        [routerLink]="'/dashboard/vehicles'"
        class="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Atrás
      </button>
    </div>
    <p class="text-xl mb-2 font-semibold">Información del vehículo</p>
    <div class="grid grid-cols-12 gap-4">
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Placa</label
        >
        <div class="mt-2">
          <input
            id="plate"
            type="text"
            name="plate"
            [value]="getVehicleToShow?.plate"
            [readOnly]="true"
            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Color</label
        >
        <div class="mt-2">
          <div
            class="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 h-[36px]"
            style="background-color: {{ getVehicleToShow?.color }};"
          ></div>
        </div>
      </div>
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Motor de vehículo</label
        >
        <div class="mt-2">
          <input
            id="plate"
            type="text"
            name="plate"
            [value]="getVehicleToShow?.motor_of_vehicle?.name"
            [readOnly]="true"
            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Tipo de vehículo</label
        >
        <div class="mt-2">
          <input
            id="plate"
            type="text"
            name="plate"
            [value]="getVehicleToShow?.type_of_vehicle?.name"
            [readOnly]="true"
            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Estado</label
        >
        <div class="mt-2">
          <input
            id="plate"
            type="text"
            name="plate"
            [value]="getVehicleToShow?.status ? 'Activo' : 'Inactivo'"
            [readOnly]="true"
            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
    <p class="text-xl mt-6 mb-2 font-semibold">Información del conductor</p>
    <div
      *ngIf="getVehicleToShow && getVehicleToShow.driver"
      class="grid grid-cols-12 gap-4"
    >
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Número de documento</label
        >
        <div class="mt-2">
          <input
            id="plate"
            type="text"
            name="plate"
            [value]="getVehicleToShow.driver.document"
            [readOnly]="true"
            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Primer nombre</label
        >
        <div class="mt-2">
          <input
            id="plate"
            type="text"
            name="plate"
            [value]="getVehicleToShow.driver.first_name"
            [readOnly]="true"
            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Segundo nombre</label
        >
        <div class="mt-2">
          <input
            id="plate"
            type="text"
            name="plate"
            [value]="getVehicleToShow.driver.second_name"
            [readOnly]="true"
            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Apellidos</label
        >
        <div class="mt-2">
          <input
            id="plate"
            type="text"
            name="plate"
            [value]="getVehicleToShow.driver.surnames"
            [readOnly]="true"
            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Dirección</label
        >
        <div class="mt-2">
          <input
            id="plate"
            type="text"
            name="plate"
            [value]="getVehicleToShow.driver.address"
            [readOnly]="true"
            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Número de celular</label
        >
        <div class="mt-2">
          <input
            id="plate"
            type="text"
            name="plate"
            [value]="getVehicleToShow.driver.phone_number"
            [readOnly]="true"
            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Ciudad</label
        >
        <div class="mt-2">
          <input
            id="plate"
            type="text"
            name="plate"
            [value]="getVehicleToShow.driver.city.name"
            [readOnly]="true"
            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
    <p class="text-xl mt-6 mb-2 font-semibold">Información del dueño</p>
    <div
      *ngIf="getVehicleToShow && getVehicleToShow.owner"
      class="grid grid-cols-12 gap-4"
    >
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Número de documento</label
        >
        <div class="mt-2">
          <input
            id="plate"
            type="text"
            name="plate"
            [value]="getVehicleToShow.owner.document"
            [readOnly]="true"
            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Primer nombre</label
        >
        <div class="mt-2">
          <input
            id="plate"
            type="text"
            name="plate"
            [value]="getVehicleToShow.owner.first_name"
            [readOnly]="true"
            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Segundo nombre</label
        >
        <div class="mt-2">
          <input
            id="plate"
            type="text"
            name="plate"
            [value]="getVehicleToShow.owner.second_name"
            [readOnly]="true"
            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Apellidos</label
        >
        <div class="mt-2">
          <input
            id="plate"
            type="text"
            name="plate"
            [value]="getVehicleToShow.owner.surnames"
            [readOnly]="true"
            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Dirección</label
        >
        <div class="mt-2">
          <input
            id="plate"
            type="text"
            name="plate"
            [value]="getVehicleToShow.owner.address"
            [readOnly]="true"
            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Número de celular</label
        >
        <div class="mt-2">
          <input
            id="plate"
            type="text"
            name="plate"
            [value]="getVehicleToShow.owner.phone_number"
            [readOnly]="true"
            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="sm:col-span-3">
        <label
          for="plate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Ciudad</label
        >
        <div class="mt-2">
          <input
            id="plate"
            type="text"
            name="plate"
            [value]="getVehicleToShow.owner.city.name"
            [readOnly]="true"
            class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  </div> `,
  styles: ``,
})
export class ViewComponent implements OnInit {
  private uuid: string | null;
  private vehicleToShow: IVehicle | null;

  private readonly router: Router;
  private readonly activatedRoute: ActivatedRoute;
  private readonly vehiclesService: VehiclesService;

  constructor() {
    this.uuid = null;
    this.vehicleToShow = null;

    this.router = inject(Router);
    this.activatedRoute = inject(ActivatedRoute);
    this.vehiclesService = inject(VehiclesService);
  }

  ngOnInit(): void {
    this.getUUID();
  }

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
   * Get vehicle in the database.
   *
   * @returns - Void
   */
  private show = () => {
    if (!this.uuid) return;
    this.vehiclesService.show(this.uuid).subscribe({
      next: (res) => {
        if (res.message === null) {
          this.router.navigateByUrl('/dashboard/vehicles');
          return;
        }

        this.vehicleToShow = res.message;
      },
      error: () => {
        SweetAlertUtil.showServerErrorAlert();
      },
    });
  };

  public get getVehicleToShow() {
    return this.vehicleToShow;
  }
}
