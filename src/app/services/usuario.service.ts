import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { url_spring } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlApi = url_spring + 'usuarios'
  constructor(private httpClient:HttpClient) { }
  
  public create(entity: Usuario): Observable<any> {

    return this.httpClient.post(this.urlApi, entity).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }
}
