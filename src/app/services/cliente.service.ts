import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_spring } from 'src/environments/environment';
import { Cliente } from '../models/cliente';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends CommonService<Cliente>{
  urlApi = url_spring + "clientes";
  
  constructor(private http: HttpClient) {
    super(http);
  }
}
