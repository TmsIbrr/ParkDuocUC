import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva.model';
import { filter } from 'rxjs';
import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, getDoc, onSnapshot } from 'firebase/firestore';
import { map } from 'rxjs/operators';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {


  constructor(private angularFirestore: AngularFirestore) {}

  // Obtener todas las reservas
  obtenerReservas(): Observable<Reserva[]> {
    return this.angularFirestore
      .collection<Reserva>('reserva')
      .valueChanges({ idField: 'id' });
  }

  // Agregar reserva
  agregarReserva(reserva: Reserva) {
    return this.angularFirestore.collection('reserva').add(reserva);
  }

  // Actualizar reserva
  actualizarReserva(id: string, reserva: Partial<Reserva>) {
    return this.angularFirestore.collection('reserva').doc(id).update(reserva);
  }

  // Eliminar reserva
  deleteReserva(id: string) {
    return this.angularFirestore.collection('reserva').doc(id).delete();
  }

  // Obtener reserva por ID
  getReservaById(id: string): Observable<Reserva> {
    return this.angularFirestore
      .collection('reserva')
      .doc<Reserva>(id)
      .valueChanges()
      .pipe(
        filter((reserva): reserva is Reserva => reserva !== undefined) // Filtra undefined
      );
  }



getReservasObservable(): Observable<Reserva[]> {
  return this.angularFirestore
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
