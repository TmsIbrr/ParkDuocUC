export class Usuario {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
    telefono: number;
    rol: RolUsuario;
    activo: boolean;

    constructor(id: number, nombre: string, apellido: string,  correo: string, contrasena: string, telefono: number, rol: RolUsuario, activo: boolean = true){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contrasena = contrasena;
        this.telefono = telefono;
        this.rol = rol;
        this.activo = activo;
    }
}

export type RolUsuario = 'estudiante' | 'profesor' | 'invitado'