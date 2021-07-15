import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { EmpleadosComponent } from './pages/administracion/empleados/empleados.component';
import { FormEmpleadosComponent } from './pages/administracion/empleados/form-empleados/form-empleados.component';
import { MotorizadoComponent } from './pages/administracion/motorizado/motorizado.component';
import { AdmPedidoComponent } from './pages/administracion/pedidos/adm-pedido/adm-pedido.component';
import { PedidosComponent } from './pages/administracion/pedidos/pedidos.component';
import { ProductoComponent } from './pages/administracion/producto/producto.component';
import { ProductosadmComponent } from './pages/administracion/productosadm/productosadm.component';
import { VentasComponent } from './pages/administracion/ventas/ventas.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { CartaDetailComponent } from './pages/carta/carta-detail/carta-detail.component';
import { CartaComponent } from './pages/carta/carta.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PagesModule } from './pages/pages.module';
import { AccountInfoComponent } from './pages/users/client-profile/account-info/account-info.component';
import { ClientProfileComponent } from './pages/users/client-profile/client-profile.component';
import { ClientePedidoDetalleComponent } from './pages/users/client-profile/cliente-pedidos/cliente-pedido-detalle/cliente-pedido-detalle.component';
import { ClientePedidosComponent } from './pages/users/client-profile/cliente-pedidos/cliente-pedidos.component';

import { ModalLoginService } from './services/modal-login.service';
import { ModalLoginComponent } from './shared/modal-login/modal-login.component';
import { ModalRegisterComponent } from './shared/modal-register/modal-register.component';
import { ModalSharedComponent } from './shared/modal-shared/modal-shared.component';


export const routes: Routes = [
  {
    path: 'app',

    children: [
      { path: 'home', component: InicioComponent },
      { path: 'carta', component: CartaComponent },
      { path: 'carta/detalle/:id', component: CartaDetailComponent },
      {
        path: 'profile/cliente/:id',
        component: ClientProfileComponent,
        canActivate: [RoleGuard, AuthGuard], data: { role: "ROLE_CLIENTE" },
        children: [
          { path: '', redirectTo: 'pedidos', pathMatch: 'full' },
          { path: 'pedidos', component: ClientePedidosComponent },
          { path: 'pedidos/detalle-pedido/:idPedido', component: ClientePedidoDetalleComponent },
          { path: 'account-info', component: AccountInfoComponent }
        ]
      },

      { path: 'carrito', component: CarritoComponent },
      {
        path: 'administracion',
        component: AdministracionComponent,
        canActivate: [RoleGuard], data: { role: "ROLE_EMPLEADO" },
        children: [
          { path: '', redirectTo: 'productos', pathMatch: 'full' },
          { path: 'productosadm', component: ProductosadmComponent },
          { path: 'productos', component: ProductoComponent },
          { path: 'pedidos', component: PedidosComponent },
          { path: 'pedidos/administrar/:idPedido', component: AdmPedidoComponent },
          { path: 'ventas', component: VentasComponent },
          { path: 'empleados', component: EmpleadosComponent, canActivate: [RoleGuard], data: { role: "ROLE_ADMIN" } },
          { path: 'empleados/form', component: FormEmpleadosComponent, canActivate: [RoleGuard], data: { role: "ROLE_ADMIN" } },
          { path: 'empleados/form/:id', component: FormEmpleadosComponent, canActivate: [RoleGuard], data: { role: "ROLE_ADMIN" } },
          { path: 'motorizado', component: MotorizadoComponent, canActivate: [RoleGuard], data: { role: "ROLE_MOTORIZADO" } },
        ]
      },

      { path: '', redirectTo: '/app/home', pathMatch: 'full' },
      {
        path: 'a',
        component: ModalSharedComponent,
        outlet: 'modal',
        children: [
          { path: '', redirectTo: 'view1', pathMatch: 'full' },
          { path: 'view1', component: ModalLoginComponent },
          { path: 'view2', component: ModalRegisterComponent },
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
