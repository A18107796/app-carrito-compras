import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { CartaComponent } from './pages/carta/carta.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PagesModule } from './pages/pages.module';
import { ProductoDetailComponent } from './pages/producto/producto-detail/producto-detail.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ModalLoginService } from './services/modal-login.service';
import { ModalLoginComponent } from './shared/modal-login/modal-login.component';
import { ModalRegisterComponent } from './shared/modal-register/modal-register.component';
import { ModalSharedComponent } from './shared/modal-shared/modal-shared.component';


export const routes: Routes = [
  {
    path: 'app',
    
    children: [
      { path: 'home', component: InicioComponent },
      { path: 'productos', component: ProductoComponent },
      { path: 'carta', component: CartaComponent },
      { path: 'carta/product-detail/:id', component: ProductoDetailComponent },
      { path: 'carrito', component: CarritoComponent },
      { path: '', redirectTo: '/app/home', pathMatch: 'full' },
      {
        path: 'a',
        component: ModalSharedComponent,
        outlet: 'modal',
        children: [
          {path: '', redirectTo: 'view1', pathMatch: 'full'},
          {path: 'view1', component: ModalLoginComponent},
          {path: 'view2', component: ModalRegisterComponent},
        ]
      }

    ],
  },
  { path: '', redirectTo: '/app/home', pathMatch: 'full' },

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
