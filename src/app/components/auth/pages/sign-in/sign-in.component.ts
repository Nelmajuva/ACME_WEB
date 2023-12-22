import { Component } from '@angular/core';

import { SignInFormComponent } from '../../components/sign-in-form/sign-in-form.component';
import { SignInHeaderComponent } from '../../components/sign-in-header/sign-in-header.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SignInHeaderComponent, SignInFormComponent],
  template: `
    <div class="w-11/12 lg:w-96">
      <app-sign-in-header></app-sign-in-header>
      <app-sign-in-form></app-sign-in-form>
    </div>
  `,
  styles: ``,
})
export class SignInComponent {}
