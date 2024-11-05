import { Usuario } from './usuario.model';

export class Invitado extends Usuario {
    motivoVisita: string;

    constructor(id: number, nombre: string, apellido: string, motivoVisita: string){
        super(id, nombre, apellido, ' ' ,' ', 0,'invitado');
        this.motivoVisita = motivoVisita;
    }
}