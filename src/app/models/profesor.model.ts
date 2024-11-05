import { Usuario } from './usuario.model';

export class Profesor extends Usuario {
    sede: string;

    constructor(id: number, nombre: string, apellido: string, correo: string, contrasena: string, telefono: number,sede: string){
        super(id, nombre, apellido, correo, contrasena, telefono,'profesor');
        this.sede = sede;
    }
}