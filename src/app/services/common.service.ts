import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GenericEntity } from '../models/generic-entity';

@Injectable({
  providedIn: 'root'
})
export class CommonService <E extends GenericEntity>{
  protected urlApi!: string; 
  constructor(protected httpClient: HttpClient) { }
  public listar(): Observable<E[]> {
    return this.httpClient.get<E[]>(this.urlApi);
  }

  public getEntity(id: any): Observable<any> {
    return this.httpClient.get(this.urlApi + "/" + id).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  public create(entity: E): Observable<any> {

    return this.httpClient.post(this.urlApi, entity).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }


  public update(entity: E): Observable<any> {

    return this.httpClient.put(this.urlApi + '/edit/' + entity.id, entity).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  public delete(id: Number): Observable<any> {
    return this.httpClient.delete(this.urlApi + '/' + id).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }
}
