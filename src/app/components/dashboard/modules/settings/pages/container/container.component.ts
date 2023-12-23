import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="px-4 sm:px-6 lg:px-8 w-full">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: ``,
})
export class ContainerComponent {}
