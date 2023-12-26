import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../app.config';
import { IResponse, IStats } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private readonly urlApi: string;
  private readonly httpClient: HttpClient;

  constructor() {
    this.urlApi = `${environment.urlApi}/stats`;
    this.httpClient = inject(HttpClient);
  }

  public index = () => {
    return this.httpClient.get<IResponse<IStats>>(
      `${this.urlApi}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
        }),
      }
    );
  };
}
