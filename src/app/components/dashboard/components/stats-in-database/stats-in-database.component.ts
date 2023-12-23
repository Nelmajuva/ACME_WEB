import { Component } from '@angular/core';

@Component({
  selector: 'app-stats-in-database',
  standalone: true,
  imports: [],
  template: `
    <p class="text-xl font-semibold">Contadores de datos ingresados</p>
    <dl
      class="grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div
        class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
      >
        <dt class="text-sm font-medium leading-6 text-gray-500">
          Conductores de vehículos
        </dt>
        <dd
          class="w-full flex-none text-5xl font-medium leading-10 tracking-tight text-gray-900"
        >
          46
        </dd>
      </div>
      <div
        class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
      >
        <dt class="text-sm font-medium leading-6 text-gray-500">
          Propietarios de vehículos
        </dt>
        <dd
          class="w-full flex-none text-5xl font-medium leading-10 tracking-tight text-gray-900"
        >
          6
        </dd>
      </div>
      <div
        class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
      >
        <dt class="text-sm font-medium leading-6 text-gray-500">Vehículos</dt>
        <dd
          class="w-full flex-none text-5xl font-medium leading-10 tracking-tight text-gray-900"
        >
          12
        </dd>
      </div>
      <div
        class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
      >
        <dt class="text-sm font-medium leading-6 text-gray-500">Ciudades</dt>
        <dd
          class="w-full flex-none text-5xl font-medium leading-10 tracking-tight text-gray-900"
        >
          67
        </dd>
      </div>
      <div
        class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
      >
        <dt class="text-sm font-medium leading-6 text-gray-500">
          Motores de vehículos
        </dt>
        <dd
          class="w-full flex-none text-5xl font-medium leading-10 tracking-tight text-gray-900"
        >
          67
        </dd>
      </div>
      <div
        class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
      >
        <dt class="text-sm font-medium leading-6 text-gray-500">
          Tipos de vehículos
        </dt>
        <dd
          class="w-full flex-none text-5xl font-medium leading-10 tracking-tight text-gray-900"
        >
          67
        </dd>
      </div>
      <div
        class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
      >
        <dt class="text-sm font-medium leading-6 text-gray-500">
          Tipos de cuentas
        </dt>
        <dd
          class="w-full flex-none text-5xl font-medium leading-10 tracking-tight text-gray-900"
        >
          67
        </dd>
      </div>
      <div
        class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
      >
        <dt class="text-sm font-medium leading-6 text-gray-500">Usuarios</dt>
        <dd
          class="w-full flex-none text-5xl font-medium leading-10 tracking-tight text-gray-900"
        >
          67
        </dd>
      </div>
    </dl>
  `,
  styles: ``,
})
export class StatsInDatabaseComponent {}
