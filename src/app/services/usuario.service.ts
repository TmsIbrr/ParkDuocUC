import { Injectable } from '@angular/core';
import { Usuario, RolUsuario } from '../models/usuario.model';
import { Estudiante } from '../models/estudiante.model';
import { Profesor } from '../models/profesor.model';
import { Invitado } from '../models/invitado.models';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root',
  })

export class UsuarioService {
    private usuariosCollection = this.angularFirestore.collection<Usuario>('usuarios');

    constructor(private angularFirestore: AngularFirestore) {}

    obtenerUsuarioPorId(id: string): Observable<Usuario | undefined> {
        return this.usuariosCollection.doc<Usuario>(id).valueChanges();
      }

}