import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpHeaders,
} from '@angular/common/http';

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
      data,
      {
        context: new HttpContext().set(
          new HttpContextToken<boolean>(() => false),
          true
        ),
      }
    );
  };

  signOut = () => {
    return this.httpClient.get(`${this.urlApi}/sign-out`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
      }),
    });
  };
  
  me = () => {
    return this.httpClient.get<IResponse<ISignInWithEmailAndPasswordResponse>>(`${this.urlApi}/me`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token_access'),
      }),
    });
  };
}
