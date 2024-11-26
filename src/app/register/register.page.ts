import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { GameApiService } from '../services/game-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuario: string = '';
  correo: string = '';
  password: string = '';

  // Variables para manejar mensajes de validación
  errorUsuario: string = '';
  errorCorreo: string = '';
  errorPassword: string = '';
  generalError: string = '';
  mensajeExito: string = '';

  constructor(
    private router: Router,
    private api: GameApiService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async onClickRegistrar(form: NgForm) {
    // Reseteamos mensajes de error y éxito
    this.errorUsuario = '';
    this.errorCorreo = '';
    this.errorPassword = '';
    this.generalError = '';
    this.mensajeExito = '';

    // Validaciones de campos vacíos
    if (form.invalid) {
      if (!this.usuario) this.errorUsuario = 'El campo Usuario es obligatorio.';
      if (!this.correo) this.errorCorreo = 'El campo Correo es obligatorio.';
      if (!this.password) this.errorPassword = 'El campo Contraseña es obligatorio.';
      return;
    }

    // Validación de formato de correo
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(this.correo)) {
      this.errorCorreo = 'El correo no es válido.';
      return;
    }

    try {
      // Intentamos registrar al usuario
      await this.api.register(this.correo, this.usuario, this.password);

      // Mensaje de éxito (en pantalla)
      this.mensajeExito = 'Te has registrado correctamente. Ahora puedes iniciar sesión.';

      // Opcional: Esperar 3 segundos antes de redirigir
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);

      // Mensaje de éxito como pop-up
      await this.mostrarAlerta('Registro exitoso', 'Te has registrado correctamente. Ahora puedes iniciar sesión.');
    } catch (error) {
      // Manejo de errores del servidor
      const httpError = error as HttpErrorResponse;

      if (httpError.status === 400) {
        const serverMessage = httpError.error.message;
        if (serverMessage.includes('usuario')) {
          this.generalError = 'El usuario ya está registrado.';
        } else if (serverMessage.includes('correo')) {
          this.generalError = 'El correo ya está registrado.';
        } else {
          this.generalError = 'Datos inválidos. Verifica la información.';
        }
      } else {
        this.generalError = 'Ocurrió un error. Intenta más tarde.';
      }
    }
  }

  // Función para mostrar un mensaje emergente
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
