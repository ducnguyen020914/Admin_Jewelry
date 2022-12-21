import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventComponent } from './event.component';
const routes: Routes = [
  {
    path: '',
    component: EventComponent,
    canActivate: [],
    data: {
      authorities: [],
      title: 'model.event.title'
    }
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule{}
