import { Component, OnInit } from '@angular/core';
import { Reserva } from '../models/reserva.model';
import { ReservaService } from '../services/reserva.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage implements OnInit {
  reservas: any[] = [];
  reservasSubscription: Subscription | undefined;

  constructor(private reservaService: ReservaService, 
              private router: Router,
            private firestore: AngularFirestore) { }

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

  async reservaExiste(id: string): Promise<boolean> {
    if (!id) {
      console.error('El ID proporcionado no es válido');
      return false;
    }
  
    try {
      // Acceder al documento usando el ID de Firebase
      const docRef = this.firestore.doc(`reserva/${id}`);
      const snapshot = await docRef.get().toPromise();
  
      // Verificar si el snapshot está definido y si el documento existe
      if (snapshot && snapshot.exists) {
        console.log('Reserva encontrada:', snapshot.data()); // Muestra los datos del documento
        return true;
      } else {
        console.log(`No se encontró reserva con el ID: ${id}`);
        return false;
      }
    } catch (error) {
      console.error('Error al verificar la reserva:', error);
      return false;
    }
  }
  
  
  
  
  
  

  async updateReserva(reserva: any) {
  const reservaId = reserva.id;  // Esto debe ser el id que Firebase asigna al documento
  
  const existe = await this.reservaExiste(reservaId);
  if (existe) {
    this.router.navigate(['/edit', reservaId]);  // Navegar a la página de edición con el id correcto
  } else {
    console.log("Error: la reserva no existe.");
  }
}

  

  async deleteReserva(reservaId: string) {
    console.log('ID de la reserva a eliminar:', reservaId);  // Verifica si el ID es correcto
    await this.reservaService.deleteReserva(reservaId);
    this.loadReservasInRealTime(); 
  }


  loadReservasInRealTime() {
    this.reservasSubscription = this.reservaService.getReservasObservable().subscribe(
      data => {
        this.reservas = data;
        console.log('Reservas actualizadas en tiempo real:', this.reservas);
      },
      error => {
        console.error("Error al cargar reservas en tiempo real:", error);
      }
    );
  }
}   
