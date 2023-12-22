import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [],
  template: `
    <div
      class="animate__animated animate__fadeIn w-full h-full grid grid-cols-12"
    >
      <div
        class="col-span-12 lg:col-span-6 h-full flex flex-col items-center justify-center"
      >
        <div class="w-11/12 lg:w-96">
          <div class="flex flex-col items-center justify-center mb-4">
            <img
              class="h-24 w-auto"
              src="https://seeklogo.com/images/A/angular-icon-logo-5FC0C40EAC-seeklogo.com.png"
              alt="Transportes ACME S.A."
            />
            <p class="text-2xl font-bold mt-4">TRANSPORTES ACME S.A.</p>
          </div>
          <div class="border-l-4 border-blue-400 bg-blue-50 p-4 mb-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-blue-700">
                  Por favor, ingresa el correo y contraseña de la configuración
                  inicial de la API de Laravel. Consulta
                  <strong>README.MD</strong> para más detalles.
                </p>
              </div>
            </div>
          </div>
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
        </div>
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
