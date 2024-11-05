import { Component } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage {
  historial = [
    { horaLlegada: '7:30 AM', horaSalida: '19:30 PM' },
    { horaLlegada: '7:30 AM', horaSalida: '19:30 PM' },
    { horaLlegada: '7:30 AM', horaSalida: '19:30 PM' },
    // Agrega más elementos si es necesario
  ];

  constructor() {}
}
