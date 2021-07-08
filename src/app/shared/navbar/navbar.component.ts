import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ModalLoginService } from 'src/app/services/modal-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public carritoService: CarritoService,
    public modalService: ModalLoginService,
    public authService: AuthService
    
    ) { }

  ngOnInit(): void {
  }


  abrirModal() {
    this.modalService.abrirModal();
    console.log("modal ambierto");
    
  }

  logout(){
    this.authService.logout();
    window.location.reload();
  }
}
