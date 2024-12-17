export class Reserva {
    id: string;
    idUsuario: string;
    nom_cli: string;
    apellidos: string;
    hora_llegada: string | Date;
    hora_salida: string | Date;
    motivos: string;

    constructor(id: string, idUsuario: string, nom_cli: string, apellidos: string, hora_llegada: string, hora_salida: string, motivos: string){
        this.id = id;
        this.idUsuario = idUsuario;
        this.nom_cli = nom_cli;
        this. apellidos = apellidos;
        this.hora_llegada = hora_llegada;
        this.hora_salida = hora_salida;
        this.motivos = motivos;
    }
}