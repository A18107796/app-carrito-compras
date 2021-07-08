import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SimpleOuterSubscriber } from 'rxjs/internal/innerSubscribe';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  ventasDia: number = 0.00;
  ventasTotales: number = 0.00;
  constructor(private comprasService: ComprasService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getVentasDia();
    this.getVentasTotales();
  }


  getVentasDia() {
    let fechaAyer = new Date();
    let fechaMañana = new Date();
    fechaAyer.setDate(fechaAyer.getDate() - 1)
    fechaMañana.setDate(fechaAyer.getDate() + 2)
    let inico: string = this.datePipe.transform(new Date(fechaAyer), "yyyy-MM-dd")?.toString() || ' '
    let fin = this.datePipe.transform(new Date(fechaMañana), "yyyy-MM-dd")?.toString() || ' '
    console.log(inico);
    console.log(fin);

    this.comprasService.getGananciasXFecha(inico, fin)
      .subscribe(
        res => {
          console.log(res);
          this.ventasDia = res.ganancias;

        }, err => {
          console.log(err);

        }
      )


  }

  getVentasTotales() {
    this.comprasService.getGananciasTotales().subscribe(
      res => {
        this.ventasTotales = res.ganancias;
      }, err => {
        console.log(err);

      }
    )
  }

}
