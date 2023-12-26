import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../app.config';
import {
  IInfoResponse,
  IResourceVehicle,
  IResponse,
  IVehicle,
} from '../../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  private readonly urlApi: string;
  private readonly httpClient: HttpClient;

  constructor() {
    this.urlApi = `${environment.urlApi}/vehicles`;
    this.httpClient = inject(HttpClient);
  }

  public getReportOfVehicles = () => {
    return this.httpClient.post(
      `${this.urlApi}/report`,
      {},
      {
        responseType: 'blob',
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
        }),
      }
    );
  };

  public resources = () => {
    return this.httpClient.get<IResponse<IResourceVehicle>>(
      `${this.urlApi}/resources`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
        }),
      }
    );
  };

  public store = (data: Partial<IVehicle>) => {
    return this.httpClient.post<IResponse<IVehicle>>(`${this.urlApi}`, data, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
      }),
    });
  };

  public show = (uuid: string) => {
    return this.httpClient.get<IResponse<IVehicle>>(`${this.urlApi}/${uuid}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
      }),
    });
  };

  public update = (uuid: string, data: Partial<IVehicle>) => {
    return this.httpClient.put<IResponse<IVehicle>>(
      `${this.urlApi}/${uuid}`,
      data,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
        }),
      }
    );
  };

  public index = () => {
    return this.httpClient.get<IResponse<IInfoResponse<IVehicle>>>(
      `${this.urlApi}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
        }),
      }
    );
  };
}
