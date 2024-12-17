import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  isAdmin = true;

  constructor(private authService: AuthService, private router: Router,
              private alertController: AlertController
  ) {}

  ngOnInit() {
    console.log('Correo actual en AuthService:', this.authService.isAdmin()); 
    this.isAdmin = this.authService.isAdmin();
  }


  
  async logout() {
    try {
      await this.authService.logout(); // Llama al método de cerrar sesión en AuthService
      this.router.navigate(['/login']); // Redirige a la página de login
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al cerrar sesión.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }


}
