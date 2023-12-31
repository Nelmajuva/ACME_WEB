import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { IAppState, IAuthState, IUser } from '../../../../interfaces';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert-welcome',
  standalone: true,
  imports: [],
  template: `
    <div class="rounded-md bg-blue-50 p-4 mb-4">
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
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3 flex-1 md:flex md:justify-between">
          <p class="text-sm text-blue-700">
            Hola <strong>{{ getUser?.email }}</strong
            >, intente agregar elementos adicionales acorde a la prueba y mi
            experiencia como desarrollador para destacar en este entregable.
          </p>
          <p class="text-sm">
            <a
              href="https://camilopezm.netlify.app/"
              target="_blank"
              class="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
            >
              Ver mi web
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class AlertWelcomeComponent implements OnInit, OnDestroy {
  private readonly store: Store<IAppState>;
  private readonly listOfSubscriptions$: Subscription[];

  private user: IUser | null;

  constructor() {
    this.user = null;

    this.store = inject(Store<IAppState>);

    this.listOfSubscriptions$ = [];
  }

  ngOnInit(): void {
    this.listOfSubscriptions$.push(
      this.store.select('auth').subscribe((res: IAuthState) => {
        this.user = res.user;
      })
    );
  }

  ngOnDestroy(): void {
    this.listOfSubscriptions$.forEach((sub$) => sub$.unsubscribe());
  }

  public get getUser() {
    return this.user;
  }
}
