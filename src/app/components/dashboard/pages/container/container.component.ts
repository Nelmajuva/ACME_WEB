import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, RouterOutlet],
  template: `
    <div>
      <app-sidebar></app-sidebar>
      <app-header></app-header>

      <div class="lg:pl-20">
        <div class="w-full">
          <div class="container mx-auto mt-4">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ContainerComponent {}
