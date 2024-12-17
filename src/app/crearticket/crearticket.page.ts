import { Component } from '@angular/core';
import { ReservaService } from '../services/reserva.service';
import { Reserva } from '../models/reserva.model';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; // Importar el AuthService

@Component({
  selector: 'app-crearticket',
  templateUrl: './crearticket.page.html',
  styleUrls: ['./crearticket.page.scss'],
})
export class CrearticketPage {

  id: string = "";
  idUsuario: string = ""; // Aquí se almacenará el UID del usuario autenticado
  nom_cli: string = "";
  apellidos: string = "";
  hora_llegada: string = "";
  hora_salida: string = "";
  motivos: string = "";

  constructor(
    private reservaService: ReservaService,
    private navCtrl: NavController,
    private authService: AuthService // Inyectar AuthService
  ) {}

  async crearTicket() {
    if (this.nom_cli && this.apellidos && this.hora_llegada && this.hora_salida) {
      const llegadaDate = new Date(this.hora_llegada);
      const salidaDate = new Date(this.hora_salida);

      // Obtener el ID del usuario autenticado
      const userId = await this.authService.getUserId();
      if (!userId) {
        console.error('No se pudo obtener el ID del usuario autenticado');
        return;
      }

      const nuevaReserva: Reserva = {
        id: this.generateUniqueId(),
        idUsuario: userId, // Asignar el ID del usuario autenticado
        nom_cli: this.nom_cli,
        apellidos: this.apellidos,
        hora_llegada: llegadaDate,
        hora_salida: salidaDate,
        motivos: this.motivos,
      };

      this.reservaService.agregarReserva(nuevaReserva).then(() => {
        console.log('Reserva agregada con éxito');
        this.navCtrl.navigateBack('/home');
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
