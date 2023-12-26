import { RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { IAppState, IAuthState, IUser } from '../../../../interfaces';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { LoadingComponent } from '../../../shared/loading/loading.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, RouterOutlet, LoadingComponent],
  template: `
    @if(getUser) {
    <div>
      <app-sidebar></app-sidebar>
      <app-header></app-header>

      <div class="lg:pl-20">
        <div class="w-full">
          <div class="container xl:mx-auto mt-4">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </div>
    } @else {
    <div class="w-full h-full flex items-center justify-center">
      <app-loading></app-loading>
    </div>
    }
  `,
  styles: ``,
})
export class ContainerComponent {
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
