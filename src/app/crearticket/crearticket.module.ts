import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrearticketPageRoutingModule } from './crearticket-routing.module';
import { CrearticketPage } from './crearticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearticketPageRoutingModule
  ],
  declarations: [CrearticketPage]
})
export class CrearticketPageModule {}
