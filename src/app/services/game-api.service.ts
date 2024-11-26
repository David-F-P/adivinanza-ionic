import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { lastValueFrom } from 'rxjs';

const _BASE_URL = environment.base_url;

@Injectable({

  providedIn: 'root'
})

export class GameApiService {

  constructor(private http: HttpClient) {

  }




  // Aquí van los métodos de cada ruta

  //login

  async login(usuario: string, password: string): Promise<any> {
    const response = await lastValueFrom(
      this.http.post<{ message: string, token: string }>
        (`${_BASE_URL}/login`, { usuario, password })
    );
    localStorage.setItem('token', response.token);

    return response;
  }

  //register
  async register(correo: string, usuario: string, password: string): Promise<any> {
    return await this.http
      .post(`${_BASE_URL}/register`, { correo, usuario, password })
      .toPromise();
  }

  //game

  async start(): Promise<any> {
    return await this.http
      .post(`${_BASE_URL}/start`, {})
      .toPromise();
  }

  //guess
  async guess(numero: number): Promise<any> {
    return await this.http
      .post(`${_BASE_URL}/guess`, { numero })
      .toPromise();
  }

  //restart

  async restart(): Promise<any> {
    return await this.http
      .post(`${_BASE_URL}/restart`, {})
      .toPromise();
  }

  //metodos de informacion

  //status

  async status(): Promise<any> {
    return await this.http
      .get(`${_BASE_URL}/status`, {})
      .toPromise();
  }

  //leaderboard

  async leaderboard(): Promise<any> {
    return await this.http
      .get(`${_BASE_URL}/leaderboard`)
      .toPromise();
  }

  //stadistics
  async statistics(): Promise<any> {
    return await this.http
      .get(`${_BASE_URL}/statistics`, {})
      .toPromise();
  }

}