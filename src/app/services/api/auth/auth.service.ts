import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ISignInWithEmailAndPasswordForm } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly urlApi: string;
  private readonly httpClient: HttpClient;

  constructor() {
    this.urlApi = ``;

    this.httpClient = inject(HttpClient);
  }

  signInWithEmailAndPassword = (data: ISignInWithEmailAndPasswordForm) => {
    return this.httpClient.post(`${this.urlApi}/sign-in-with-email-and-password`, data);
  }
}
