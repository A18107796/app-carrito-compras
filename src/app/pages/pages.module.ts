import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';

import { InicioComponent } from './inicio/inicio.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartaComponent } from './carta/carta.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalPagoComponent } from './carrito/modal-pago/modal-pago.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { ProductosadmComponent } from './administracion/productosadm/productosadm.component';
import { PedidosComponent } from './administracion/pedidos/pedidos.component';
import { ProductoComponent } from './administracion/producto/producto.component';
import { VentasComponent } from './administracion/ventas/ventas.component';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { CartaDetailComponent } from './carta/carta-detail/carta-detail.component';
import { ClientProfileComponent } from './users/client-profile/client-profile.component';
import { AccountInfoComponent } from './users/client-profile/account-info/account-info.component';
import { ClientePedidosComponent } from './users/client-profile/cliente-pedidos/cliente-pedidos.component';
import { ClientePedidoDetalleComponent } from './users/client-profile/cliente-pedidos/cliente-pedido-detalle/cliente-pedido-detalle.component';
import { EmpleadosComponent } from './administracion/empleados/empleados.component';
import { FormEmpleadosComponent } from './administracion/empleados/form-empleados/form-empleados.component';
import { AdmPedidoComponent } from './administracion/pedidos/adm-pedido/adm-pedido.component';
import { MotorizadoComponent } from './administracion/motorizado/motorizado.component';

@NgModule({
  declarations: [
    ProductoComponent,
    InicioComponent,
    CartaComponent,
    CarritoComponent,
    ModalPagoComponent,
    AdministracionComponent,
    ProductosadmComponent,
    PedidosComponent,
    VentasComponent,
    CartaDetailComponent,
    ClientProfileComponent,
    AccountInfoComponent,
    ClientePedidosComponent,
    ClientePedidoDetalleComponent,
    EmpleadosComponent,
    FormEmpleadosComponent,
    AdmPedidoComponent,
    MotorizadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule,
    BrowserAnimationsModule

  ],
  providers: [DatePipe, DecimalPipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class PagesModule { }
