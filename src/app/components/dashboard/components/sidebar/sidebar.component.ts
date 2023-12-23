import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ISidebar } from '../../../../interfaces';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-20 lg:overflow-y-auto lg:bg-gray-900 lg:pb-4 lg:flex lg:flex-col"
    >
      <div class="flex h-16 shrink-0 items-center justify-center">
        <img
          class="h-8 w-auto"
          src="https://seeklogo.com/images/A/angular-icon-logo-5FC0C40EAC-seeklogo.com.png"
          alt="Transportes ACME S.A."
        />
      </div>
      <nav class="mt-8 flex-1 w-full">
        <ul role="list" class="flex flex-col items-center space-y-2">
          @for (option of getMenuOptions; track $index) {
          <li>
            <a
              [routerLink]="option['url']"
              class="w-10 h-10 cursor-pointer bg-gray-950 text-white group flex rounded-md text-sm font-semibold items-center justify-center"
            >
              <i [classList]="option['icon']"></i>
              <span class="sr-only">{{ option['name'] }}</span>
            </a>
          </li>
          }
        </ul>
      </nav>
      <div class="w-full flex justify-center">
        <button
          type="button"
          class="w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class SidebarComponent {
  private readonly menuOptions: ISidebar[];

  constructor() {
    this.menuOptions = [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'fa-solid fa-house text-base',
      },
      {
        name: 'Vehicles',
        url: '/dashboard/vehicles',
        icon: 'fa-solid fa-car text-base',
      },
      {
        name: 'Accounts',
        url: '/dashboard/accounts',
        icon: 'fa-solid fa-users text-base',
      },
      {
        name: 'Settings',
        url: '/dashboard/settings',
        icon: 'fa-solid fa-gears text-base',
      },
    ];
  }

  public get getMenuOptions() {
    return this.menuOptions;
  }
}
