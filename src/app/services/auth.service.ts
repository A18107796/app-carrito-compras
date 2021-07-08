import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_auth } from 'src/environments/environment';
import { Cliente } from '../models/cliente';
import { Empleado } from '../models/empleado';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuario!: Usuario;
  private _token!: string;
  private urlAuth: string = url_auth;
  constructor(private http: HttpClient) { }


  public get usuario(): Usuario {

    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && localStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(localStorage.getItem('usuario') || '') as Usuario;
    }
    return new Usuario();
  }

  public get token(): string | null {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && localStorage.getItem('token') != null) {
      this._token = localStorage.getItem('token') || '';
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario) {

    const credenciales = btoa('angularapp' + ':' + '1234');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.usuario);
    params.set('password', usuario.password);

    return this.http.post<any>(this.urlAuth, params.toString(), { headers: httpHeaders });
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    localStorage.setItem('token', accessToken);
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);

    this._usuario = new Usuario();
    this._usuario.id = payload.id_usuario;
    this._usuario.roles = payload.authorities;
    this
    if (payload.id_empleado === undefined || payload.id_empleado) {
      this._usuario.cliente = new Cliente();
      this._usuario.cliente.id = payload.id_cliente;
      this._usuario.cliente.nombres = payload.nombres || "";
    } else {
      this._usuario.empleado = new Empleado();
      this._usuario.empleado.id = payload.id_empleado;
      this._usuario.empleado.nombres = payload.nombres;
    }


    localStorage.setItem("usuario", JSON.stringify(this._usuario));
  }



  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {

    if (this.token) {
      let payload = this.obtenerDatosToken(this.token);
     
      
      if (payload != null && payload.id_usuario) {
        return true;
      }
    }
    return false;
  }

  hasRole(role: string): boolean {

    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }


  logout(): void {
    this._token = null as any;
    this._usuario = null as any;
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  }

}
