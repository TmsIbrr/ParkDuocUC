import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  nombre: string = '';
  correo: string = '';
  historialReservas: string = 'Aquí aparecerá tu historial de reservas.';

  guardarPerfil() {
    console.log('Perfil guardado:', { nombre: this.nombre, correo: this.correo });
  }
}
