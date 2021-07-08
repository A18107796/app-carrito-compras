import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { url_spring } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  public titulo: string = "REGISTRAR PRODUCTO";
  public productos: Producto[] = [];
  formProducto!: FormGroup;
  private formSubmited = false;
  public producto: Producto = new Producto();
  constructor(private _pS: ProductoService, private _fb: FormBuilder) { }
  public urlImage = url_spring + 'productos/uploads/img/';

  ngOnInit(): void {
    this.listar();
    this.crearFormulario();
  }

  listar() {
    this._pS.listar().subscribe(
      res => {
        this.productos = res;
        this.createDataTable();
      }
    )
  }

  crearFormulario() {
    this.formProducto = this._fb.group({
      producto: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      precio: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      foto: [File],
    })
  }

  seleccionarFoto(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];

      if (file.type.indexOf('image') < 0) {
        Swal.fire('Error', 'Debe seleccionar una imagen [.img, .jpg, .jpeg]', 'error');
      } else {
        this.formProducto.patchValue({
          foto: [file]
        })
      }

    }
  }

  campoNoValido(campo: string) {
    if (this.formProducto.get(campo)?.invalid && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }

  changeStatus(status: boolean, id: number) {
    this._pS.changeStatus(status, id).subscribe(
      res => {
        console.log(res);
        this.deleteTable();
        setTimeout(() => {
          this.listar();
        }, 1000);

      },
      err => {
        console.log(err);

      }
    )
  }

  submit() {
    this.formSubmited = true;
    if (this.formProducto.valid) {
      if (this.producto.id) {
        this.mapProducto();
        let fotoSeleccionada: File = this.formProducto.get('foto')?.value[0];
        this._pS.updateWithImage(this.producto, fotoSeleccionada).subscribe(
          res => {
            Swal.fire('Actualizado', 'Producto actualizado correctamente.', 'success');
          },
          err => {
            console.log(err);

          }
        )
      } else {
        this.producto = new Producto();
        let fotoSeleccionada: File = this.formProducto.get('foto')?.value[0];
        this.mapProducto();
        if (fotoSeleccionada) {
          this._pS.createWithImage(this.producto, fotoSeleccionada).subscribe(
            res => {
              Swal.fire('Registrado', 'Producto registrado correctamente.', 'success');
              this.deleteTable();
            },
            err => {
              console.log(err);
            }
          );
        } else {
          this._pS.create(this.producto).subscribe(
            res => {
              Swal.fire('Registrado', 'Producto registrado correctamente.', 'success');
              this.deleteTable();
            },
            err => {
              console.log(err);
            }
          );
        }

      }
      this.crearFormulario();
      this.producto = new Producto();
      this.formSubmited = false;
      this.deleteTable();
      setTimeout(() => {
        this.listar();
      }, 1000);
    }
  }

  delete(id: number) {
    Swal.fire({
      title: 'ELIMINAR',
      text: "Desea eliminar la especializacion id: " + id,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this._pS.delete(id).subscribe(
          res => {
            Swal.fire(
              'Eliminado',
              'Especializacion eliminada.',
              'success'
            )
            this.deleteTable();
            this.listar();
          },
          err => {
            Swal.fire(
              'Error',
              'Mensaje:' + err,
              'error'
            )
          }
        )

      }
    })
  }

  editar(id: number) {
    this._pS.getEntity(id).subscribe(
      res => {
        this.producto = res.producto;
        this.mapFormWithProducto();
      },
      err => {
        Swal.fire('Error', err.err.message, 'error');
      }
    )
  }

  mapFormWithProducto() {
    this.formProducto.get('producto')?.setValue(this.producto.nombres);
    this.formProducto.get('descripcion')?.setValue(this.producto.descripcion);
    this.formProducto.get('precio')?.setValue(this.producto.precio);
    this.formProducto.get('stock')?.setValue(this.producto.stock);
  }

  mapProducto() {
    this.producto.nombres = this.formProducto.get('producto')?.value;
    this.producto.descripcion = this.formProducto.get('descripcion')?.value;
    this.producto.precio = this.formProducto.get('precio')?.value;
    this.producto.stock = this.formProducto.get('stock')?.value;
    this.producto.foto = null;
  }

  createDataTable() {
    $(function () {
      $('#example1').DataTable({
        pageLength: 3,
        lengthMenu: [[3, 6, 9, -1], [3, 6, 9, 'Todos']]
      })
    });

  }

  deleteTable() {
    $('#example1').dataTable().fnDestroy();
  }


}
