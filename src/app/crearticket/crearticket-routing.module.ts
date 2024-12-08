import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearticketPage } from './crearticket.page';

const routes: Routes = [
  {
    path: '',
    component: CrearticketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearticketPageRoutingModule {}
