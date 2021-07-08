import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
  usuario!: Usuario;
  private formSubmited = false;
  formLogin!: FormGroup;
  constructor(private authService: AuthService, private _fb: FormBuilder, private _tS: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.crearFormulario();
  }
  submit() {
    this.formSubmited = true;
    if (this.formLogin.valid) {
      this.mapUsuario();
      this.authService.login(this.usuario).subscribe(
        res => {

          this.authService.guardarToken(res.access_token);
          this.authService.guardarUsuario(res.access_token);
          this._tS.success("Ingreso Correcto", "Login")
          this.cerrarModal();
          setTimeout( () =>{
            window.location.reload();
          },1000);
        },
        err => {
          this._tS.error(err.error.error_description, err.error.error)

          console.log(err);
        })
    }
  }

  crearFormulario() {
    this.formLogin = this._fb.group({
      usuario: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  mapUsuario() {
    this.usuario = new Usuario();
    this.usuario.usuario = this.formLogin.get('usuario')?.value;
    this.usuario.password = this.formLogin.get('password')?.value;

  }

  campoNoValido(campo: string) {
    if (this.formLogin.get(campo)?.invalid && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }

  cerrarModal() {
    this.router.navigate(['app', { outlets: { modal: null } }]);
  }

}
