export class Reserva {
    id: string;
    idUsuario: string;
    nom_cli: string;
    apellidos: string;
    hora_llegada: Date;
    hora_salida: Date;
    motivos: string;

    constructor(id: string, idUsuario: string, nom_cli: string, apellidos: string, hora_llegada: Date, hora_salida: Date, motivos: string){
        this.id = id;
        this.idUsuario = idUsuario;
        this.nom_cli = nom_cli;
        this. apellidos = apellidos;
        this.hora_llegada = hora_llegada;
        this.hora_salida = hora_salida;
        this.motivos = motivos;
    }
}