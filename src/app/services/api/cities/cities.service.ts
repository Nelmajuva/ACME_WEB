import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../app.config';
import { ICity, IInfoResponse, IResponse } from '../../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  private readonly urlApi: string;
  private readonly httpClient: HttpClient;

  constructor() {
    this.urlApi = `${environment.urlApi}/cities`;
    this.httpClient = inject(HttpClient);
  }

  public store = (data: Partial<ICity>) => {
    return this.httpClient.post<IResponse<ICity>>(`${this.urlApi}`, data, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
      }),
    });
  };

  public show = (id: number) => {
    return this.httpClient.get<IResponse<ICity>>(
      `${this.urlApi}/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
        }),
      }
    );
  };

  public update = (id: number, data: Partial<ICity>) => {
    return this.httpClient.put<IResponse<ICity>>(
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
    return this.httpClient.get<IResponse<IInfoResponse<ICity>>>(
      `${this.urlApi}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
        }),
      }
    );
  };
}
