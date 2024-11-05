import { Injectable } from '@angular/core';
import { Usuario, RolUsuario } from '../models/usuario.model';
import { Estudiante } from '../models/estudiante.model';
import { Profesor } from '../models/profesor.model';
import { Invitado } from '../models/invitado.models';

@Injectable({
    providedIn: 'root',
  })

export class UsuarioService {
    private usuarios: Usuario[] = [];

    agregarUsuario(usuario: Usuario) {
        this.usuarios.push(usuario);
    }

    obtenerUsuario(usuario: Usuario) {
        return this.usuarios;
    }

    crearUsuario(id: number, nombre: string, apellido: string,  correo: string, contrasena: string, telefono: number, rol: RolUsuario, extraInfo: any): Usuario {
        switch (rol){
            case 'estudiante':
                return new Estudiante(id, nombre, apellido, correo, contrasena, telefono, extraInfo.sede);
            
            case 'profesor':
                return new Profesor(id, nombre, apellido, correo, contrasena, telefono, extraInfo.sede);

            case 'invitado':
                return new Invitado(id, nombre, apellido, extraInfo.motivoVisita);
            
            default:
                throw new Error('Rol de usuario no valido');
        }
    }
}