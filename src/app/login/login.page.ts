import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importar AngularFireAuth
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}

  async login() {
    try {
      // Intentar iniciar sesión con Firebase
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
  
      // Guardar el correo en AuthService
      this.authService.setEmail(this.email);
  
      // Obtener el rol del usuario
      await this.authService.fetchUserRole();
  
      // Redirigir según el rol del usuario
      if (this.authService.isAdmin()) {
        this.router.navigate(['/admin-panel']); // Redirige al panel de administrador
      } else if (this.authService.isUser()) {
        this.router.navigate(['/home']); // Redirige al home para usuarios normales
      } else {
        // Si no tiene un rol válido, muestra un error o redirige a una página de error
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Rol de usuario no autorizado.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } catch (error) {
      // Mostrar alerta de error
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Correo o contraseña incorrectos.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }  
}
