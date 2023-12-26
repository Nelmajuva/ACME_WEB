import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../app.config';
import { IInfoResponse, IBrandOfVehicle, IResponse } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BrandsOfVehiclesService {
  private readonly urlApi: string;
  private readonly httpClient: HttpClient;

  constructor() {
    this.urlApi = `${environment.urlApi}/brands-of-vehicles`;
    this.httpClient = inject(HttpClient);
  }

  public store = (data: Partial<IBrandOfVehicle>) => {
    return this.httpClient.post<IResponse<IBrandOfVehicle>>(`${this.urlApi}`, data, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
      }),
    });
  };

  public show = (id: number) => {
    return this.httpClient.get<IResponse<IBrandOfVehicle>>(
      `${this.urlApi}/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
        }),
      }
    );
  };

  public update = (id: number, data: Partial<IBrandOfVehicle>) => {
    return this.httpClient.put<IResponse<IBrandOfVehicle>>(
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
    return this.httpClient.get<IResponse<IInfoResponse<IBrandOfVehicle>>>(
      `${this.urlApi}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
        }),
      }
    );
  };
}
