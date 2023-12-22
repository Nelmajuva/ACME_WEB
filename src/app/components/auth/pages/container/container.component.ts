import { Component } from '@angular/core';

import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [SignInComponent],
  template: `
    <div
      class="animate__animated animate__fadeIn w-full h-screen grid grid-cols-12"
    >
      <div
        class="col-span-12 lg:col-span-6 h-full flex flex-col items-center justify-center"
      >
        <app-sign-in></app-sign-in>
      </div>
      <div
        class="col-span-12 lg:col-span-6 h-full bg-cover"
        style="background-image: url('/assets/background/auth-bg.png');"
      ></div>
    </div>
  `,
  styles: ``,
})
export class ContainerComponent {}
