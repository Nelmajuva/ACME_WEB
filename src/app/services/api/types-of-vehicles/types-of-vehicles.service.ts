import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../app.config';
import { IInfoResponse, IResponse } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TypesOfVehiclesService {
  private readonly urlApi: string;
  private readonly httpClient: HttpClient;

  constructor() {
    this.urlApi = `${environment.urlApi}/types-of-vehicles`;
    this.httpClient = inject(HttpClient);
  }

  public store = (data: any) => {
    return this.httpClient.post<IResponse<any>>(`${this.urlApi}`, data, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
      }),
    });
  };

  public show = (id: number) => {
    return this.httpClient.get<IResponse<any>>(
      `${this.urlApi}/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
        }),
      }
    );
  };

  public update = (id: number, data: any) => {
    return this.httpClient.put<IResponse<any>>(
      `${this.urlApi}/${id}`,
      data,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
        }),
      }
    );
  };

  public index = () => {
    return this.httpClient.get<IResponse<IInfoResponse<any>>>(
      `${this.urlApi}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
        }),
      }
    );
  };
}
