import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { url_spring } from 'src/environments/environment';
import { Compras } from '../models/compras';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  urlApi = url_spring + "compras";

  constructor(private http: HttpClient) { }



  saveCompra(compra: Compras): Observable<any> {
    console.log(compra);
    return this.http.post(this.urlApi + '/pagar', compra).pipe(
      catchError(err => {
        return throwError(err);
      })
    )
  }

  getCompras(): Observable<any> {
    return this.http.get(this.urlApi);
  }

  uploadRecibo(file: File, id: number): Observable<any> {
    const formData = new FormData();
    formData.append('img', file);
    return this.http.put(this.urlApi + '/upload/' + id, formData).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  updateEstadoCompra(estado: string, id: number): Observable<any> {
    return this.http.put(this.urlApi + '/update/' + id + "/" + estado, null);
  }

  getCompra(id: number): Observable<any> {
    return this.http.get(this.urlApi + '/' + id);
  }

  getGananciasTotales(): Observable<any> {
    return this.http.get(this.urlApi + "/filtrar/ganancias/total");
  }

  filtrarXEstado(term: string): Observable<any> {
    return this.http.get(this.urlApi + "/filtrar/" + term);
  }
  getGananciasXFecha(fecha_inicio: string, fecha_fin: string): Observable<any> {
    return this.http.get(this.urlApi + '/filtrar/ganancias?fecha_inicio=' + fecha_inicio + "&fecha_fin=" + fecha_fin);
  }

}
