import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva.model';
import { filter } from 'rxjs';
import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, getDoc, onSnapshot } from 'firebase/firestore';
import { map } from 'rxjs/operators';
import { Timestamp } from '@angular/fire/firestore';
import { EspacioService, Espacio } from './espacio.service';
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private collectionName = 'reserva'
  reservas: Reserva[] = [];

  constructor(private firestore: AngularFirestore, private espacioService: EspacioService) {}

  async reservaExiste(id: string): Promise<boolean> {
    const docRef = this.firestore.doc(`reserva/${id}`);
    const snapshot = await docRef.get().toPromise();
    return snapshot ? snapshot.exists : false
  }


  // Obtener todas las reservas
  obtenerReservas(): Observable<Reserva[]> {
    return this.firestore
      .collection<Reserva>('reserva')
      .valueChanges({ idField: 'id' });
  }

  // Agregar reserva
  async agregarReserva(reserva: Reserva): Promise<void> {
    // Obtener espacios disponibles
    const espaciosDisponibles = await this.espacioService.getEspaciosDisponibles().pipe(first()).toPromise();
    
    if (espaciosDisponibles && espaciosDisponibles.length > 0) {
      const espacioAsignado: Espacio = espaciosDisponibles[0];
      await this.espacioService.actualizarEstado(espacioAsignado.id, 'reservado');
    } else {
      console.error('No hay espacios disponibles para asignar.');
    }
    

    // Agregar la reserva a Firestore
    return this.firestore.collection<Reserva>('reserva').doc(reserva.id).set(reserva);
  }

  // Actualizar reserva
  actualizarReserva(id: string, data: Partial<Reserva>) {
    const docRef = this.firestore.doc(`reserva/${id}`);
    return docRef.update(data);  // Solo actualiza los campos necesarios
  }


  // Eliminar reserva
  deleteReserva(id: string) {
    return this.firestore.collection('reserva').doc(id).delete();
  }

  // Obtener reserva por ID
  getReservaById(id: string): Observable<Reserva> {
    return this.firestore
      .collection<Reserva>('reserva')
      .doc(id)
      .valueChanges() as Observable<Reserva>;
  }
  



getReservasObservable(): Observable<Reserva[]> {
  return this.firestore
    .collection<Reserva>('reserva')
    .valueChanges({ idField: 'id' })
    .pipe(
      map((reservas) =>
        reservas.map((reserva) => ({
          ...reserva,
          hora_llegada: reserva.hora_llegada instanceof Timestamp
            ? reserva.hora_llegada.toDate() // Convierte Timestamp a Date
            : reserva.hora_llegada,
          hora_salida: reserva.hora_salida instanceof Timestamp
            ? reserva.hora_salida.toDate()
            : reserva.hora_salida,
        }))
      )
    );
}

  
}
