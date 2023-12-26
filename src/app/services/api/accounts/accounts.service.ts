import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../app.config';
import { IAccount, IInfoResponse, IResourceAccount, IResponse } from '../../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private readonly urlApi: string;
  private readonly httpClient: HttpClient;

  constructor() {
    this.urlApi = `${environment.urlApi}/accounts`;
    this.httpClient = inject(HttpClient);
  }

  public getResources = () => {
    return this.httpClient.get<IResponse<IResourceAccount>>(`${this.urlApi}/resources`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
      }),
    });
  };

  public store = (data: Partial<IAccount>) => {
    return this.httpClient.post<IResponse<IAccount>>(`${this.urlApi}`, data, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
      }),
    });
  };

  public show = (uuid: string) => {
    return this.httpClient.get<IResponse<IAccount>>(`${this.urlApi}/${uuid}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
      }),
    });
  };

  public update = (uuid: string, data: Partial<IAccount>) => {
    return this.httpClient.put<IResponse<IAccount>>(
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
    return this.httpClient.get<IResponse<IInfoResponse<IAccount>>>(
      `${this.urlApi}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
        }),
      }
    );
  };
}
