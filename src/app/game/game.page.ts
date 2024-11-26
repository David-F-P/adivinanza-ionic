import { Component, OnInit } from '@angular/core';
import { GameApiService } from '../services/game-api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  numero: number = 0;
  mensaje: string = '';
  errorNumero: string = '';
  juegoTerminado: boolean = false;

  constructor(private api: GameApiService) {}

  ngOnInit() {}

  async onClickAdivinar() {
    // Validar que el número esté entre 1 y 100
    if (this.numero < 1 || this.numero > 100) {
      this.errorNumero = 'Por favor, ingresa un número entre 1 y 100.';
      return;
    }
    this.errorNumero = '';

    // Verificar si el juego ya ha terminado
    if (this.juegoTerminado) {
      this.mensaje = 'Debes reiniciar el juego para volver a intentarlo.';
      return;
    }

    // Realizar la llamada al backend
    await this.api
      .guess(this.numero)
      .then((data) => {
        this.mensaje = data.message;

        // Mensajes personalizados según la proximidad al número correcto
        if (data.proximidad === 'cerca') {
          this.mensaje += ' ¡Estás muy cerca!';
        } else if (data.proximidad === 'lejos') {
          this.mensaje += ' Estás algo lejos.';
        }

        // Si adivina correctamente
        if (data.correcto) {
          this.mensaje = '¡Felicidades! Has adivinado el número.';
          this.juegoTerminado = true;
        }
      })
      .catch((error) => {
        this.mensaje = error.error.message || 'Ocurrió un error inesperado.';
      });
  }

  async onClickReiniciar() {
    await this.api.restart();
    this.mensaje = '';
    this.errorNumero = '';
    this.numero = 0;
    this.juegoTerminado = false;
  }
}

