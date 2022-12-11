import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApoimentComponent } from './apoiment.component';

const routes: Routes = [
  {
    path: '',
    component: ApoimentComponent,
    canActivate: [],
    data: {
      authorities: [],
      title: 'model.apoiment.title'
    }
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApoimentRoutingModule{}
