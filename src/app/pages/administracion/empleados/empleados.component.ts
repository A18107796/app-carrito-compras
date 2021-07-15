import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  constructor(private _empS: EmpleadoService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this._empS.listar().subscribe(
      res => {
        this.empleados = res;
      }
    )
  }

  create() {
    this.router.navigate(['app/administracion/empleados/form'])
  }

}
