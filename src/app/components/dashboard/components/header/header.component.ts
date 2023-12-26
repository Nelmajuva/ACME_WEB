import { Component, inject } from '@angular/core';

import { AuthService } from '../../../../services';
import { SweetAlertUtil } from '../../../../utils';
import { LoadingComponent } from '../../../shared/loading/loading.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoadingComponent],
  template: `
    <div class="lg:pl-20">
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
      >
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden">
          <i class="fa-solid fa-bars"></i>
        </button>

        <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"></div>

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div class="flex flex-1"></div>
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <div class="relative">
              <button
                (click)="signOut()"
                type="button"
                class="inline-flex items-center gap-x-1.5 rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-gray-900"
              >
                @if(getIsLoading) {
                <app-loading [isWhiteIndicator]="true"></app-loading>
                } @else {
                <i class="fa-solid fa-arrow-right-from-bracket mr-1"></i>
                Cerrar sesión }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class HeaderComponent {
  private isLoading: boolean;

  private readonly authService: AuthService;

  constructor() {
    this.isLoading = false;

    this.authService = inject(AuthService);
  }

  signOut = () => {
    if (this.isLoading) return;
    this.isLoading = true;

    this.authService.signOut().subscribe({
      next: () => {
        this.isLoading = false;
        sessionStorage.removeItem('token_access');
        window.location.reload();
      },
      error: () => {
        this.isLoading = false;
        SweetAlertUtil.showServerErrorAlert();
      },
    });
  };

  public get getIsLoading() {
    return this.isLoading;
  }
}
