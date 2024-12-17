import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) {}

  async canActivate(): Promise<boolean> {
    // Asegúrate de que el usuario esté autenticado
    const user = await this.afAuth.currentUser;
    if (user) {
      // Obtener el rol desde Firestore
      await this.authService.fetchUserRole();

      // Verificar si es admin
      if (this.authService.isAdmin()) {
        return true; // Permite el acceso
      }
    }

    // Redirige al home si no es administrador
    this.router.navigate(['/home']);
    return false;
  }
}
