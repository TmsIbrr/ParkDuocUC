import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: Usuario | undefined;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    const userId = '1'; // Reemplaza con el ID real del usuario
    this.usuarioService.obtenerUsuarioPorId(userId).subscribe(
      (data) => {
        this.usuario = data;
        console.log('Usuario obtenido:', this.usuario);
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }
}
