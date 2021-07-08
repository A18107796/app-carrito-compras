import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from './producto/producto.component';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartaComponent } from './carta/carta.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductoDetailComponent } from './producto/producto-detail/producto-detail.component';
import { ModalPagoComponent } from './carrito/modal-pago/modal-pago.component';

@NgModule({
  declarations: [
    ProductoComponent,
    InicioComponent,
    CartaComponent,
    CarritoComponent,
    ProductoDetailComponent,
    ModalPagoComponent
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
    
  ]
})
export class PagesModule { }
