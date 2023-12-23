import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../app.config';
import { IInfoResponse, IMotorOfVehicle, IResponse } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MotorsOfVehiclesService {
  private readonly urlApi: string;
  private readonly httpClient: HttpClient;

  constructor() {
    this.urlApi = `${environment.urlApi}/motors-of-vehicles`;
    this.httpClient = inject(HttpClient);
  }

  public store = (data: any) => {
    return this.httpClient.post<IResponse<IMotorOfVehicle>>(`${this.urlApi}`, data, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
      }),
    });
  };

  public show = (id: number) => {
    return this.httpClient.get<IResponse<IMotorOfVehicle>>(
      `${this.urlApi}/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
        }),
      }
    );
  };

  public update = (id: number, data: any) => {
    return this.httpClient.put<IResponse<IMotorOfVehicle>>(
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
    return this.httpClient.get<IResponse<IInfoResponse<IMotorOfVehicle>>>(
      `${this.urlApi}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
        }),
      }
    );
  };
}
