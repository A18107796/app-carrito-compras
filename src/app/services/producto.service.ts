import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { url_spring } from 'src/environments/environment';
import { Producto } from '../models/producto';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends CommonService<Producto>{
  urlApi = url_spring + "productos";

  constructor(private http: HttpClient) {
    super(http);
  }

  public createWithImage(entity: Producto, foto: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', foto);
    formData.append('nombres', entity.nombres);
    formData.append('descripcion', entity.descripcion);
    formData.append('precio', entity.precio.toString());
    formData.append('stock', entity.stock.toString());

    return this.httpClient.post(this.urlApi + '/crear-con-foto', formData).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  public updateWithImage(entity: Producto, foto: File): Observable<any> {
    const formData = new FormData();
    if (foto) {
      formData.append('file', foto);
    }
    formData.append('nombres', entity.nombres);
    formData.append('descripcion', entity.descripcion);
    formData.append('precio', entity.precio.toString());
    formData.append('stock', entity.stock.toString());
    return this.httpClient.put(this.urlApi + '/edit/' + entity.id, formData).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  public filterProductos(termino: string, oferta: boolean): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.urlApi + '/filtrar/' + termino + '?oferta=' + oferta);
  }

  


}
