import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [],
  template: `
    <form autocomplete="off" class="w-full">
      <div class="mb-2">
        <label
          for="email"
          class="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
          >Correo electrónico</label
        >
        <div class="mt-1">
          <input
            type="email"
            name="email"
            id="email"
            class="outline-none block w-full rounded-full border-0 px-4 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder="admin@transportesacme.com.co"
          />
        </div>
      </div>
      <div class="mb-8">
        <label
          for="password"
          class="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
          >Contraseña</label
        >
        <div class="mt-1">
          <input
            type="password"
            name="password"
            id="password"
            class="outline-none block w-full rounded-full border-0 px-4 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder="*********"
          />
        </div>
      </div>
      <button
        type="button"
        class="rounded-md bg-blue-50 px-3.5 w-full h-12 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-100"
      >
        Ingresar
      </button>
    </form>
  `,
  styles: ``,
})
export class SignInFormComponent {}
