import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { Usuario } from 'src/app/models/usuario';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-empleados',
  templateUrl: './form-empleados.component.html',
  styleUrls: ['./form-empleados.component.css']
})
export class FormEmpleadosComponent implements OnInit {
  usuario: Usuario = new Usuario();
  formEmpleado!: FormGroup;
  cargos: Array<String> = ['MOTORIZADO', 'COCINERO', 'AYUDANTE'];
  public formSubmited = false;
  constructor(private _empS: UsuarioService, private _formB: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formEmpleado = this._formB.group({
      empleado: [null, [Validators.required]],
      dni: [null, [Validators.required, Validators.minLength(8)]],
      email: [null, [Validators.required, Validators.email]],
      telefono: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
      cargo: [null, Validators.required]
    })
  }

  campoNoValido(campo: string) {
    if (this.formEmpleado.get(campo)?.invalid && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }

  submit() {
    this.formSubmited = true;
    if (this.formEmpleado.valid) {
      this.mapEmpleado();
      this._empS.create(this.usuario).subscribe(
        res => {
          Swal.fire("Registro Correcto", "Empleado registrado correctamente.", "success")
          this.router.navigateByUrl("/app/administracion/empleados")
        }, err => {
          console.log(err.error.message);
          this.router.navigateByUrl("/app/administracion/empleados")
        }
      )
    }
  }

  mapEmpleado() {
    this.usuario.empleado = new Empleado();
    this.usuario.empleado.nombres = this.formEmpleado.get('empleado')?.value;
    this.usuario.empleado.dni = this.formEmpleado.get('dni')?.value;
    this.usuario.empleado.email = this.formEmpleado.get('email')?.value;
    this.usuario.empleado.telefono = this.formEmpleado.get('telefono')?.value;
    this.usuario.empleado.direccion = this.formEmpleado.get('direccion')?.value;
    this.usuario.empleado.tipo_empleado = this.formEmpleado.get('cargo')?.value;
  }

}
