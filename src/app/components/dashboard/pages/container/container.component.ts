import { Component } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent],
  template: `
    <div class="animate__animated animate__fadeIn">
      <app-sidebar></app-sidebar>
      <app-header></app-header>

      <aside
        class="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block"
      ></aside>
    </div>
  `,
  styles: ``,
})
export class ContainerComponent {}
