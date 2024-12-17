// src/app/services/espacio.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';


export interface Espacio {
  id: string;
  estado: 'disponible' | 'ocupado' | 'reservado';
}

@Injectable({
  providedIn: 'root',
})
export class EspacioService {
  constructor(private firestore: AngularFirestore) {}

  // Obtener todos los espacios
  getEspaciosDisponibles(): Observable<Espacio[]> {
    return this.firestore
      .collection<Espacio>('espacio', ref => ref.where('estado', '==', 'disponible'))
      .valueChanges({ idField: 'id' });
  }
  
  

  getEspacios(): Observable<Espacio[]> {
    return this.firestore.collection<Espacio>('espacio').valueChanges();
  }
  
  
  async actualizarEstado(id: string, nuevoEstado: string): Promise<void> {
    try {
      const espacioRef = this.firestore.doc(`espacio/${id}`);
      await espacioRef.update({ estado: nuevoEstado });
      console.log(`Estado del espacio ${id} actualizado a ${nuevoEstado}`);
    } catch (error) {
      console.error('Error al actualizar estado de espacio:', error);
    }
  }

}
