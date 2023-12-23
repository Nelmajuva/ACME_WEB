import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in-header',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col items-center justify-center mb-4">
      <div class="flex gap-x-6">
        <img
          class="h-24 w-auto"
          src="https://seeklogo.com/images/A/angular-icon-logo-5FC0C40EAC-seeklogo.com.png"
          alt="Transportes ACME S.A."
        />
        <img
          class="h-24 w-auto"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/800px-Laravel.svg.png"
          alt="Transportes ACME S.A."
        />
      </div>
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
  `,
  styles: ``,
})
export class SignInHeaderComponent {}
