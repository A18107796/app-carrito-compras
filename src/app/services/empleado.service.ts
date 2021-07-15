import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_spring } from 'src/environments/environment';
import { Empleado } from '../models/empleado';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService extends CommonService<Empleado>{

  urlApi = url_spring + "empleados";
  constructor(private http: HttpClient) {
    super(http);
  }
}
