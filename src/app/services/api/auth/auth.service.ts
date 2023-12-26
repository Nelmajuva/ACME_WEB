import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../app.config';
import {
  IResponse,
  ISignInWithEmailAndPasswordForm,
  ISignInWithEmailAndPasswordResponse,
} from '../../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly urlApi: string;
  private readonly httpClient: HttpClient;

  constructor() {
    this.urlApi = `${environment.urlApi}/auth`;

    this.httpClient = inject(HttpClient);
  }

  signInWithEmailAndPassword = (data: ISignInWithEmailAndPasswordForm) => {
    return this.httpClient.post<IResponse<ISignInWithEmailAndPasswordResponse>>(
      `${this.urlApi}/sign-in-with-email-and-password`,
      data
    );
  };

  signOut = () => {
    sessionStorage.clear();
    return this.httpClient.post<void>(
      `${this.urlApi}/sign-out`,
      {},
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
        }),
      }
    );
  };
}
