import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../services/reserva.service';
import { Reserva } from '../models/reserva.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crearticket',
  templateUrl: './crearticket.page.html',
  styleUrls: ['./crearticket.page.scss'],
})
export class CrearticketPage {

  id: string = "";
  idUsuario: string = "";
  nom_cli: string = "";
  apellidos: string = "";
  hora_llegada: string = "";
  hora_salida: string = "";
  motivos: string = "";

  reserva: Reserva = {
    id: "",
    idUsuario: "1",
    nom_cli: "",
    apellidos: "",
    hora_llegada: new Date(),
    hora_salida: new Date(),
    motivos: ""
  }
  


  constructor(private reservaService: ReservaService, private navCtrl: NavController) { }


  crearTicket(){
    if (this.nom_cli && this.apellidos && this.hora_llegada && this.hora_salida) {
      const llegadaDate = new Date(this.hora_llegada);
      const salidaDate = new Date(this.hora_salida); // Convertir fecha de salida a formato Date
      const nuevaReserva: Reserva = {
        id: this.generateUniqueId(), // Generar un ID único para el viaje
        idUsuario: this.idUsuario,
        nom_cli: this.nom_cli,
        apellidos: this.apellidos,
        hora_llegada: llegadaDate,
        hora_salida: salidaDate,
        motivos: this.motivos,
      };
  
      // Llamar al servicio para agregar el viaje a la base de datos
      this.reservaService.agregarReserva(nuevaReserva).then(() => {
        console.log('Reserva agregada con éxito');
        this.navCtrl.navigateBack('/home'); // Redirigir a la página de inicio
      }).catch((error: any) => {  
        console.error('Error al agregar reserva', error);
      });
    } else {
      console.error('Por favor complete todos los campos');
    }
  }

  generateUniqueId(): string {
    return (Math.random() + 1).toString(36).substring(7);  
  }

}
