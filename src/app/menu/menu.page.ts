import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() { }

  async confirmarSalida() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas salir del juego?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('El usuario canceló la salida.');
          }
        },
        {
          text: 'Salir',
          handler: () => {
            console.log('El usuario confirmó la salida.');
            this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
          }
        }
      ]
    });

    await alert.present();
  }
}

