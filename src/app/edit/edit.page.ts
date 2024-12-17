import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from '../services/reserva.service';
import { Reserva } from '../models/reserva.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: string | null = null;
  reserva: Reserva = {
    id: '',
    nom_cli: '',
    apellidos: '',
    idUsuario: '',
    hora_llegada: new Date(),
    hora_salida: new Date(),
    motivos: '',
  }; 

  constructor(
    private route: ActivatedRoute,
    private reservaService: ReservaService,
    private router: Router
  ) {}

  ngOnInit() {
    // Capturar el parámetro 'id' de la URL
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', this.id);  // Verificar que el 'id' está siendo capturado
    if (this.id) {
      this.loadReservaData(); // Cargar los datos de la reserva si el 'id' está presente
    }
  }

  loadReservaData() {
    if (this.id) {
      this.reservaService.getReservaById(this.id).subscribe(
        (reservaData: Reserva | undefined) => {
          if (reservaData) {
            this.reserva = reservaData;
            // Si las fechas son instancias de Date, conviértelas para 'ion-datetime'
            this.reserva.hora_llegada = reservaData.hora_llegada instanceof Date
              ? reservaData.hora_llegada.toISOString()
              : reservaData.hora_llegada;
            this.reserva.hora_salida = reservaData.hora_salida instanceof Date
              ? reservaData.hora_salida.toISOString()
              : reservaData.hora_salida;
          } else {
            console.error('No se encontró reserva con el ID:', this.id);
          }
        },
        (error) => {
          console.error('Error al obtener la reserva:', error);
        }
      );
    }
  }
  
async updateReserva() {
  if (this.id) {
    try {
      // Llamamos al servicio con el ID y los datos a actualizar
      await this.reservaService.actualizarReserva(this.id, {
        nom_cli: this.reserva.nom_cli,
        apellidos: this.reserva.apellidos,
        hora_llegada: this.reserva.hora_llegada,
        hora_salida: this.reserva.hora_salida,
        motivos: this.reserva.motivos,
      });
      console.log('Reserva actualizada correctamente');
      this.router.navigate(['/home']); // Redirigir a la página principal
    } catch (error) {
      console.error('Error actualizando reserva:', error);
    }
  } else {
    console.log('Error: ID de reserva no disponible');
  }
}

}
