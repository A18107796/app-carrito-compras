import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

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
import { ProductoDetailComponent } from './administracion/producto/producto-detail/producto-detail.component';
import { ProductoComponent } from './administracion/producto/producto.component';
import { VentasComponent } from './administracion/ventas/ventas.component';
import { TokenInterceptor } from '../interceptors/token.interceptor';

@NgModule({
  declarations: [
    ProductoComponent,
    InicioComponent,
    CartaComponent,
    CarritoComponent,
    ProductoDetailComponent,
    ModalPagoComponent,
    AdministracionComponent,
    ProductosadmComponent,
    PedidosComponent,
    VentasComponent
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
  providers: [DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class PagesModule { }
