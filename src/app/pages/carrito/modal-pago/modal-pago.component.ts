import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Compras } from 'src/app/models/compras';
import { DetalleCompras } from 'src/app/models/detalle-compras';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ComprasService } from 'src/app/services/compras.service';
import { ModalLoginService } from 'src/app/services/modal-login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-pago',
  templateUrl: './modal-pago.component.html',
  styleUrls: ['./modal-pago.component.css']
})
export class ModalPagoComponent implements OnInit {
  compra: Compras = new Compras();
  formCompras!: FormGroup;
  public formSubmited = false;
  constructor(
    public modalService: ModalLoginService, private _cS: ClienteService, private _aS: AuthService,
    private router: Router,
    private fB: FormBuilder,
    private carritoService: CarritoService,
    private compraService: ComprasService,
    private decimalPipe: DecimalPipe
  ) { }
  public tipo_pago: string = "Tarjeta";
  ngOnInit(): void {
    this.crearFormulario();
    this.getCliente();

  }

  crearFormulario() {
    this.formCompras = this.fB.group({
      direccion: [null, [Validators.required]],
      num_tarjeta: [null, Validators.required],
      expiration: [null, Validators.required],
      cvv: [null, Validators.required]
    })
  }

  submit() {
    this.formSubmited = true;
    if (this.formCompras.valid) {
      this.mapCompras();
      console.log(this.formCompras);
      console.log(this.formCompras.valid);
      console.log(this.compra);
      this.carritoService._carrito.productos.forEach(p => {
        let detalleCompras = new DetalleCompras();
        detalleCompras.cantidad = p.cantidad;
        detalleCompras.subtotal = (p.cantidad * p.producto.precio);
        detalleCompras.producto = p.producto;
        this.compra.detalles.push(detalleCompras);
      })
      this.compraService.saveCompra(this.compra).subscribe(
        res => {
          console.log(res);
          this.carritoService.cleanCarrito();
          this.router.navigateByUrl("/app/carta");


          this.cerrarModal();
          if (res.tipo_pago === "Tarjeta") {
            Swal.fire('Listo!', 'Compra registrada correctamente, el encargado se encargara de comunicarse con usted.', 'success')
          } else {
            Swal.fire('Listo!', 'Su pedido fue realizado exitosamente, se esperara que suba el recibo con el deposito de S./ ' + this.decimalPipe.transform(res.total, '1.2-5'), 'success');
          }
        },
        err => {
          console.error(err);
          this.cerrarModal(),
            Swal.fire('Error:', err.error.message, 'error');
          this.router.navigateByUrl("/app/carta");
          this.compra.detalles = [];
        }
      )
    }
  }

  mapCompras() {
    if (this.tipo_pago === "Tarjeta") {
      this.compra.num_tarjeta = this.formCompras.get('num_tarjeta')?.value;
      this.compra.expiration = this.formCompras.get('expiration')?.value;
      this.compra.cvv = this.formCompras.get('cvv')?.value;
    }
    this.compra.tipo_pago = this.tipo_pago;
    this.compra.direccion_envio = this.formCompras.get('direccion')?.value;
  }

  campoNoValido(campo: string) {
    if (this.formCompras.get(campo)?.invalid && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
  }


  getCliente() {
    const id = this._aS.usuario.cliente?.id;
    this.compra.cliente = new Cliente();
    this._cS.getEntity(id).subscribe(
      res => {
        this.compra.cliente = res.cliente;
        console.log(this.compra);
        this.formCompras.get('direccion')?.setValue(this.compra.cliente.direccion);
      }, err => {
        console.log(err);

      }
    )

  }
  checkTipoPago(event: any) {
    const value = event.target.value;
    const active = event.target.checked;

    if (value === "deposito" && active) {
      this.tipo_pago = "Deposito";
      this.formCompras.get('num_tarjeta')?.setValue("none");
      this.formCompras.get('cvv')?.setValue("none");
      this.formCompras.get('expiration')?.setValue("none");
    } else if (value === "tarjeta" && active) {
      this.tipo_pago = "Tarjeta";
      this.formCompras.get('num_tarjeta')?.setValue(null);
      this.formCompras.get('cvv')?.setValue(null);
      this.formCompras.get('expiration')?.setValue(null);
    }

  }

}
