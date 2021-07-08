import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { Usuario } from 'src/app/models/usuario';
import { ModalLoginService } from 'src/app/services/modal-login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.css']
})
export class ModalRegisterComponent implements OnInit {
  usuario: Usuario = new Usuario();
  private formSubmited = false;
  constructor(private _uS: UsuarioService, private _fB: FormBuilder, private router: Router, private _tS: ToastrService) { }
  public formUsuario!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formUsuario = this._fB.group({
      usuario: [null, Validators.required],
      password: [null, Validators.required],
      cliente: this._fB.group({
        nombres: [null, Validators.required],
        dni: [null, [Validators.required, Validators.minLength(8)]],
        email: [null, [Validators.required, Validators.email]],
        telefono: [null, [Validators.required]],
        direccion: [null, [Validators.required]]
      })
    })
  }

  submit() {
    this.formSubmited = true;
    if (this.formUsuario.valid) {
      this.mapUsuario();
      this._uS.create(this.usuario).subscribe(
        res => {
          this._tS.success("Registrado satisfactoriamente!", "En hora buena!");
          this.router.navigate(['/app', { outlets: { 'modal': ['a', 'view1'] } }]);
        },
        err => {
          this._tS.error(err.error.error, "Error:")
          this.usuario = new Usuario();
          this.createForm();
          console.log(err);

        }
      );
    }
  }

  mapUsuario() {
    this.usuario.usuario = this.formUsuario.get('usuario')?.value;
    this.usuario.password = this.formUsuario.get('password')?.value;
    this.usuario.empleado = null;
    this.usuario.cliente = new Cliente();
    this.usuario.cliente.nombres = this.formUsuario.get('cliente.nombres')?.value;
    this.usuario.cliente.telefono = this.formUsuario.get('cliente.telefono')?.value;
    this.usuario.cliente.dni = this.formUsuario.get('cliente.dni')?.value;
    this.usuario.cliente.email = this.formUsuario.get('cliente.email')?.value;
    this.usuario.cliente.direccion = this.formUsuario.get('cliente.direccion')?.value;



  }
  campoNoValido(campo: string) {
    if (this.formUsuario.get(campo)?.invalid && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }



}
