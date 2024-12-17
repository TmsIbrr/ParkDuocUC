// src/app/parking/parking.page.ts
import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../services/reserva.service';
import { Reserva } from '../models/reserva.model';
import { EspacioService, Espacio } from '../services/espacio.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-parking',
  templateUrl: './parking.page.html',
  styleUrls: ['./parking.page.scss'],
})
export class ParkingPage implements OnInit {
  espacios: Espacio[] = [];
  reservas: Reserva[] = [];

  constructor(
    private reservaService: ReservaService,
    private espacioService: EspacioService
  ) {}

  ngOnInit() {
    // Suscribirse al Observable de espacios
    this.espacioService.getEspacios().subscribe((espacios) => {
      this.espacios = espacios;
      this.actualizarEstados();  // Llamar a actualizar estados después de cargar los espacios
    });
  
    // Obtener las reservas después
    this.reservaService.obtenerReservas().pipe(first()).subscribe((reservas) => {
      this.reservas = reservas;
      this.actualizarEstados();  // Llamar a actualizar estados después de cargar las reservas
    });
  }
  

  actualizarEstados() {
    console.log('Espacios:', this.espacios);
    console.log('Reservas:', this.reservas);
  
    // Resetear estados a 'disponible'
    this.espacios.forEach(espacio => {
      espacio.estado = 'disponible'; // Asignar estado 'disponible' a todos los espacios
    });
  
    // Actualizar estados basados en reservas
    this.reservas.forEach(reserva => {
      const idEspacio = reserva.idEspacio;
      if (idEspacio) {
        console.log('Comprobando reserva con idEspacio:', idEspacio);
        const espacio = this.espacios.find(e => String(e.id) === String(idEspacio));
        if (espacio) {
          console.log('Espacio encontrado:', espacio);
          espacio.estado = 'reservado'; // Cambiar estado del espacio a 'reservado'
        } else {
          console.log('No se encontró espacio con idEspacio:', idEspacio);
        }
      } else {
        console.log('Reserva sin idEspacio:', reserva);
      }
    });
  
    console.log('Espacios actualizados:', this.espacios);
  }
  
  
  
  
  async refrescar() {
    // Vuelve a suscribirse para refrescar los datos
    this.espacioService.getEspacios().subscribe((espacios) => {
      this.espacios = espacios;
      this.actualizarEstados();
    });
    this.reservaService.obtenerReservas().pipe(first()).subscribe((reservas) => {
      this.reservas = reservas;
      this.actualizarEstados();
    });
  }


}
