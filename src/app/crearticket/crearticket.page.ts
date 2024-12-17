import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../services/reserva.service';
import { Reserva } from '../models/reserva.model';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { EspacioService, Espacio } from '../services/espacio.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crearticket',
  templateUrl: './crearticket.page.html',
  styleUrls: ['./crearticket.page.scss'],
})
export class CrearticketPage implements OnInit {
  id: string = "";
  idUsuario: string = ""; // Aquí se almacenará el UID del usuario autenticado
  idEspacio: string = ""; // Almacena el id del espacio seleccionado por el usuario
  nom_cli: string = "";
  apellidos: string = "";
  hora_llegada: string = "";
  hora_salida: string = "";
  motivos: string = "";

  espaciosDisponibles: Espacio[] = [];

  constructor(
    private reservaService: ReservaService,
    private navCtrl: NavController,
    private authService: AuthService,
    private espacioService: EspacioService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    // Cargar los espacios disponibles
    this.cargarEspaciosDisponibles();
    this.espaciosDisponibles = await this.espacioService.getEspaciosDisponibles().toPromise() || [];
  }

  cargarEspaciosDisponibles() {
    this.espacioService.getEspaciosDisponibles()
      .subscribe(espacios => {
        console.log('Espacios disponibles:', espacios);
        this.espaciosDisponibles = espacios;
      }, error => {
        console.error('Error al cargar espacios disponibles', error);
      });
  }

  async crearTicket() {
    if (this.nom_cli && this.apellidos && this.hora_llegada && this.hora_salida && this.idEspacio) {
      const llegadaDate = new Date(this.hora_llegada);
      const salidaDate = new Date(this.hora_salida);

      try {
        // Obtener el ID del usuario autenticado de forma asíncrona
        const userId = await this.authService.getUserId();
        if (!userId) {
          console.error('No se pudo obtener el ID del usuario autenticado');
          return;
        }

        // Verificar si hay espacios disponibles
        if (this.espaciosDisponibles.length === 0) {
          const alert = await this.alertController.create({
            header: 'Sin Espacios Disponibles',
            message: 'No hay espacios disponibles para reservar en este momento.',
            buttons: ['OK'],
          });
          await alert.present();
          return;
        }

        // Crear una nueva reserva con el id del espacio seleccionado
        const nuevaReserva: Reserva = {
          id: this.generateUniqueId(),
          idUsuario: userId, // Asignar el ID del usuario autenticado
          idEspacio: this.idEspacio, // Usar el id del espacio seleccionado
          nom_cli: this.nom_cli,
          apellidos: this.apellidos,
          hora_llegada: llegadaDate,
          hora_salida: salidaDate,
          motivos: this.motivos,
        };

        // Cambiar el estado del espacio a "reservado"
        await this.espacioService.actualizarEstado(this.idEspacio, 'reservado'); // Actualizar el estado del espacio

        // Agregar la reserva
        await this.reservaService.agregarReserva(nuevaReserva);
        console.log('Reserva agregada con éxito');

        // Navegar de vuelta a la página de inicio
        this.navCtrl.navigateBack('/home');
      } catch (error) {
        console.error('Error al agregar la reserva:', error);
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Hubo un problema al agregar la reserva.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } else {
      console.error('Por favor complete todos los campos');
      const alert = await this.alertController.create({
        header: 'Campos Incompletos',
        message: 'Por favor complete todos los campos obligatorios.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  generateUniqueId(): string {
    return (Math.random() + 1).toString(36).substring(7);  
  }
}
