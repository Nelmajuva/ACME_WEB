import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ISettings, ISidebar } from '../../../../../../interfaces';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="w-full animate__animated animate__fadeIn">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold">Ajustes</h1>
          <p class="mt-2 text-base text-gray-700">
            Configuraciones adicionales que se hacen para un manejo óptimo
            dentro la plataforma.
          </p>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <ul role="list" class="divide-y divide-gray-100">
          @for (settings of getListOfSettings; track $index) {
          <li
            [routerLink]="settings.url"
            class="flex justify-between gap-x-6 py-5 cursor-pointer px-4 hover:bg-gray-50"
          >
            <div class="flex min-w-0 gap-x-4">
              <img
                class="h-12 w-12 flex-none rounded-full bg-gray-50"
                [src]="'/assets/images/' + settings.icon"
                alt=""
              />
              <div class="min-w-0 flex-auto flex justify-center flex-col">
                <p class="text-base font-semibold text-gray-900">
                  {{ settings.name }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  {{ settings.description }}
                </p>
              </div>
            </div>
            <div
              class="hidden shrink-0 sm:flex sm:flex-col sm:items-center sm:justify-center"
            >
              <p class="text-sm">
                <a
                  class="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
                >
                  Ingresar al módulo
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </p>
            </div>
          </li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: ``,
})
export class StartComponent {
  private readonly listOfSettings: (ISidebar & ISettings)[];

  constructor() {
    this.listOfSettings = [
      {
        name: 'Ciudades',
        description:
          'Todas las ciudades dónde se tiene cobertura para los clientes.',
        icon: 'city-park.png',
        url: '/dashboard/settings/cities',
      },
      {
        name: 'Motores de vehículos',
        description:
          'Motores que son utilizados por los vehículos dentro la organización.',
        icon: 'motor.png',
        url: '/dashboard/settings/motors-of-vehicles',
      },
      {
        name: 'Tipos de vehículos',
        description: 'Tipos de vehículos admitidos en la organización.',
        icon: 'military-vehicle.png',
        url: '/dashboard/settings/types-of-vehicles',
      },
    ];
  }

  public get getListOfSettings() {
    return this.listOfSettings;
  }
}
