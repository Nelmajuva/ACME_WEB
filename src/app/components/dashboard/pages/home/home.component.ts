import { Component } from '@angular/core';

import { AlertWelcomeComponent } from '../../components/alert-welcome/alert-welcome.component';
import { StatsInDatabaseComponent } from '../../components/stats-in-database/stats-in-database.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StatsInDatabaseComponent, AlertWelcomeComponent],
  template: `
    <div class="px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn w-full">
      <app-alert-welcome></app-alert-welcome>
      <app-stats-in-database></app-stats-in-database>
    </div>
  `,
  styles: ``,
})
export class HomeComponent {}
