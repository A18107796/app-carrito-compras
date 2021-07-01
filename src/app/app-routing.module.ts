import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { CartaComponent } from './pages/carta/carta.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PagesModule } from './pages/pages.module';
import { ProductoComponent } from './pages/producto/producto.component';


export const routes: Routes = [
  {
    path: 'app',
    children: [
      { path: 'home', component: InicioComponent },
      { path: 'productos', component: ProductoComponent },
      { path: 'carta', component: CartaComponent },
      { path: 'carrito', component: CarritoComponent },
      { path: '', redirectTo: '/app/home', pathMatch: 'full' },

    ],


  },
  { path: '', redirectTo: '/app/home', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
