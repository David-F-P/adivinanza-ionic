import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { GameApiService } from '../services/game-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = '';
  password: string = '';
  showError: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, private api: GameApiService) {}

  ngOnInit() {}

  async onClickIngresar(form: NgForm) {
    this.showError = false;
    this.errorMessage = '';

    if (form.invalid) {
      this.showError = true;
      return;
    }

    try {
      await this.api.login(this.usuario, this.password);
      this.router.navigate(['/menu']);
    } catch (error) {
      const httpError = error as HttpErrorResponse;

      if (httpError?.status === 401) {
        // Credenciales incorrectas
        this.errorMessage = 'Usuario o contraseña incorrectos.';
      } else if (httpError?.status === 400) {
        // Datos incompletos o formato inválido
        this.errorMessage = 'Los datos proporcionados son inválidos.';
      } else {
        // Otros errores
        this.errorMessage = 'Hubo un error al iniciar sesión. Intente más tarde.';
      }
    }
  }
}
