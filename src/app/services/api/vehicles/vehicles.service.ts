import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../app.config';
import { IInfoResponse, IResponse } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private readonly urlApi: string;
  private readonly httpClient: HttpClient;

  constructor() {
    this.urlApi = `${environment.urlApi}/vehicles`;
    this.httpClient = inject(HttpClient);
  }

  public index = () => {
    return this.httpClient.get<IResponse<IInfoResponse<any>>>(`${this.urlApi}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token_access')
      }),
    });
  }
}
