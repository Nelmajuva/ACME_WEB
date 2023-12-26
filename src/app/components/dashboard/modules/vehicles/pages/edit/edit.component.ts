import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Subscription } from 'rxjs';

import { LoadingComponent } from '../../../../../shared/loading/loading.component';
import { VehiclesService } from '../../../../../../services';
import { FormUtil, SweetAlertUtil } from '../../../../../../utils';
import {
  IAccount,
  IMotorOfVehicle,
  ITypeOfVehicle,
} from '../../../../../../interfaces';

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
  private listOfOwners: IAccount[];
  private listOfDrivers: IAccount[];
  private listMotorsOfVehicles: IMotorOfVehicle[];
  private listTypesOfVehicles: ITypeOfVehicle[];

  private readonly router: Router;
  private readonly form: FormGroup;
  private readonly formBuilder: FormBuilder;
  private readonly activatedRoute: ActivatedRoute;
  private readonly vehiclesService: VehiclesService;
  private readonly listOfSubscriptions$: Subscription[];

  constructor() {
    this.uuid = null;
    this.isLoading = false;

    this.listOfOwners = [];
    this.listOfDrivers = [];
    this.listMotorsOfVehicles = [];
    this.listTypesOfVehicles = [];
    this.listOfSubscriptions$ = [];

    this.router = inject(Router);
    this.formBuilder = inject(FormBuilder);
    this.activatedRoute = inject(ActivatedRoute);
    this.vehiclesService = inject(VehiclesService);

    this.form = this.formBuilder.group({
      status: [1],
      plate: ['', FormUtil.checkField(8)],
      motor_of_vehicle_id: ['', FormUtil.checkField()],
      type_of_vehicle_id: ['', FormUtil.checkField()],
      driver_uuid: ['', FormUtil.checkField()],
      owner_uuid: ['', FormUtil.checkField()],
      color: ['', FormUtil.checkField()],
    });
  }

  ngOnInit(): void {
    this.getUUID();
    this.getResources();
  }

  ngOnDestroy(): void {
    this.listOfSubscriptions$.forEach((sub$) => sub$.unsubscribe());
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

        const data = res.message;

        this.form.setValue({
          plate: data.plate,
          motor_of_vehicle_id: data.motor_of_vehicle.id,
          type_of_vehicle_id: data.type_of_vehicle.id,
          driver_uuid: data.driver.uuid,
          owner_uuid: data.owner.uuid,
          color: data.color,
          status: data.status,
        });
      },
      error: () => {
        SweetAlertUtil.showServerErrorAlert();
      },
    });
  };

  /**
   * Update the vehicle in the database.
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

    this.vehiclesService.update(this.uuid, data).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/dashboard/vehicles/list');

        SweetAlertUtil.showAlert({
          icon: 'success',
          text: 'El vehículo ha sido actualizado correctamente.',
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
