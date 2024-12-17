import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private email: string = '';
  private rol: string = ''; // Guardar el rol del usuario
  private user = new BehaviorSubject<any>(null);  


  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
  this.afAuth.authState.subscribe(user => {
    this.user.next(user);
    if (user) {
      this.fetchUserRole();  // Obtener el rol después de la autenticación
    }
  });
}


  // Método para establecer el correo electrónico
  setEmail(email: string): void {
    this.email = email;
  }

  // Obtener el rol desde Firestore
  async fetchUserRole(): Promise<void> {
    const currentUser = await this.afAuth.currentUser;
    if (currentUser) {
      const email = currentUser.email;
      console.log('Correo del usuario autenticado:', email);
      try {
        const snapshot = await this.firestore
          .collection('usuarios', (ref) => ref.where('correo', '==', email))
          .get()
          .toPromise();

        if (snapshot && !snapshot.empty) {
          const userData = snapshot.docs[0].data() as { correo: string; rol: string };
          if (userData.rol) {
            this.rol = userData.rol;
            console.log('Rol asignado:', this.rol);
          } else {
            console.error('El usuario no tiene un rol definido.');
          }
        }
      } catch (error) {
        console.error('Error al obtener el rol del usuario:', error);
      }
    }
  }

  

  isAdmin(): boolean {
    return this.rol === 'admin';
  }


  isUser(): boolean {
    return this.rol === 'usuario';
  }

  logout() {
    return this.afAuth.signOut();
  }

  async getUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser; // Espera a que se resuelva el usuario actual
    return user ? user.uid : null; // Retorna el UID si existe
  }
  
  

}
