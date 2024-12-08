import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { ReservaService } from '../services/reserva.service';
import { Reserva } from '../models/reserva.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
    reservas: any[] = [];
    fechaActual: Date = new Date();

    constructor(private reservaService: ReservaService, private router: Router) {}
  
    ngOnInit() {
      this.reservaService.getReservasObservable().subscribe(
        (reservas: Reserva[]) => {
          console.log('Reservas obtenidas:', reservas);
          this.reservas = reservas;
        },
        (error: any) => {
          console.error('Error al obtener reservas', error);
        }
      );
    }
    
}
