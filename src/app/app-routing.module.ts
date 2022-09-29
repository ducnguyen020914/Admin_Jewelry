import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductModule } from './pages/product/product.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';

const routes: Routes = [{
  path:'',
  children:[
    {
      path: '',
      component:MainLayoutComponent,
    },
    {
      path: 'product',
      loadChildren: () =>
         import('./pages/product/product.module').then(
          (m) => m.ProductModule
    ),
    }
  ]
}
  
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
