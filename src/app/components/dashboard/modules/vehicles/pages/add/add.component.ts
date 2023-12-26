import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import {
  IAccount,
  IMotorOfVehicle,
  IResponse,
  ITypeOfVehicle,
} from '../../../../../../interfaces';
import { VehiclesService } from '../../../../../../services';
import { FormUtil, SweetAlertUtil } from '../../../../../../utils';
import { LoadingComponent } from '../../../../../shared/loading/loading.component';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, LoadingComponent],
  template: `
    <div class="px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn w-full">
      <div class="sm:flex sm:items-center mb-8">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold">Agregar un nuevo vehículo</h1>
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
                  for="plate"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Placa</label
                >
                <div class="mt-2">
                  <input
                    id="plate"
                    type="text"
                    name="plate"
                    formControlName="plate"
                    class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                  @if(validate('plate')) {
                  <p
                    class="text-xs text-red-600 mt-1 animate__animated animate__fadeInUp"
                  >
                    La placa es un campo requerido y no puede tener más de 32
                    dígitos.
                  </p>
                  }
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="color"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Color</label
                >
                <div class="mt-2">
                  <input
                    id="color"
                    type="color"
                    name="color"
                    formControlName="color"
                    class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                  @if(validate('color')) {
                  <p
                    class="text-xs text-red-600 mt-1 animate__animated animate__fadeInUp"
                  >
                    La color es un campo requerido y no puede tener más de 32
                    dígitos.
                  </p>
                  }
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="motor_of_vehicle"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Motor de vehículo</label
                >
                <div class="mt-2">
                  <select
                    id="motor_of_vehicle"
                    name="motor_of_vehicle"
                    formControlName="motor_of_vehicle_id"
                    class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    @for(motorOfVehicle of getListMotorsOfVehicles; track
                    $index) {
                    <option [value]="motorOfVehicle.id">
                      {{ motorOfVehicle.name }}
                    </option>
                    }
                  </select>
                  @if(validate('motor_of_vehicle_id')) {
                  <p
                    class="text-xs text-red-600 mt-1 animate__animated animate__fadeInUp"
                  >
                    El motor del vehículo es un campo requerido.
                  </p>
                  }
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="type_of_vehicle"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Tipo de vehículo</label
                >
                <div class="mt-2">
                  <select
                    id="type_of_vehicle"
                    name="type_of_vehicle"
                    formControlName="type_of_vehicle_id"
                    class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    @for(typeOfVehicle of getListTypesOfVehicles; track $index)
                    {
                    <option [value]="typeOfVehicle.id">
                      {{ typeOfVehicle.name }}
                    </option>
                    }
                  </select>
                  @if(validate('type_of_vehicle_id')) {
                  <p
                    class="text-xs text-red-600 mt-1 animate__animated animate__fadeInUp"
                  >
                    El tipo de vehículo es un campo requerido.
                  </p>
                  }
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="driver"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Conductor</label
                >
                <div class="mt-2">
                  <select
                    id="driver"
                    name="driver"
                    formControlName="driver_uuid"
                    class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    @for(driver of getListOfDrivers; track $index) {
                    <option [value]="driver.uuid">
                      {{ driver.first_name }} {{ driver.second_name }}
                      {{ driver.surnames }}
                    </option>
                    }
                  </select>
                  @if(validate('driver_uuid')) {
                  <p
                    class="text-xs text-red-600 mt-1 animate__animated animate__fadeInUp"
                  >
                    El conductor es un campo requerido.
                  </p>
                  }
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="owner"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Propietario</label
                >
                <div class="mt-2">
                  <select
                    id="owner"
                    name="owner"
                    formControlName="owner_uuid"
                    class="block w-full rounded-md outline-none border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    @for(owner of getListOfOwners; track $index) {
                    <option [value]="owner.uuid">
                      {{ owner.first_name }} {{ owner.second_name }}
                      {{ owner.surnames }}
                    </option>
                    }
                  </select>
                  @if(validate('owner_uuid')) {
                  <p
                    class="text-xs text-red-600 mt-1 animate__animated animate__fadeInUp"
                  >
                    El propietario es un campo requerido.
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
  private listOfOwners: IAccount[];
  private listOfDrivers: IAccount[];
  private listMotorsOfVehicles: IMotorOfVehicle[];
  private listTypesOfVehicles: ITypeOfVehicle[];

  private readonly router: Router;
  private readonly form: FormGroup;
  private readonly formBuilder: FormBuilder;
  private readonly vehiclesService: VehiclesService;

  constructor() {
    this.isLoading = false;
    this.listOfOwners = [];
    this.listOfDrivers = [];
    this.listMotorsOfVehicles = [];
    this.listTypesOfVehicles = [];

    this.router = inject(Router);
    this.formBuilder = inject(FormBuilder);
    this.vehiclesService = inject(VehiclesService);

    this.form = this.formBuilder.group({
      plate: ['', FormUtil.checkField(8)],
      motor_of_vehicle_id: ['', FormUtil.checkField()],
      type_of_vehicle_id: ['', FormUtil.checkField()],
      driver_uuid: ['', FormUtil.checkField()],
      owner_uuid: ['', FormUtil.checkField()],
      color: ['#000', FormUtil.checkField()],
    });
  }

  ngOnInit(): void {
    this.getResources();
  }

  /**
   * Get all the information need to create
   * a vehicle.
   *
   * @returns - Void
   */
  private getResources = () => {
    this.vehiclesService.resources().subscribe((res) => {
      const data = res.message;

      this.listOfOwners = data.owners;
      this.listOfDrivers = data.drivers;
      this.listTypesOfVehicles = data.types_of_vehicles;
      this.listMotorsOfVehicles = data.motors_of_vehicles;
    });
  };

  /**
   * Add new vehicle in database.
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

    this.vehiclesService.store(data).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/dashboard/vehicles');

        SweetAlertUtil.showAlert({
          icon: 'success',
          text: 'El nuevo vehículo ha sido registrado correctamente.',
          title: '¡Eres genial!',
        });
      },
      error: ({ error }: HttpErrorResponse & { error: IResponse<string> }) => {
        this.isLoading = false;

        if (error.message === 'The plate has already been taken.') {
          SweetAlertUtil.showAlert({
            icon: 'error',
            text: 'Lo sentimos, pero el vehículo ya se encuentra registrado en la base de datos.',
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

  public get getListOfOwners() {
    return this.listOfOwners;
  }

  public get getListOfDrivers() {
    return this.listOfDrivers;
  }

  public get getListMotorsOfVehicles() {
    return this.listMotorsOfVehicles;
  }

  public get getListTypesOfVehicles() {
    return this.listTypesOfVehicles;
  }
}
