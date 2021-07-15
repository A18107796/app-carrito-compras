import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    public authService: AuthService,
    private router: Router

  ) { }

  ngOnInit(): void {
  }


  abrirModal() {
    this.modalService.abrirModal();
    console.log("modal ambierto");

  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

  myProfile() {
    if (this.authService.isAuthenticated()) {
      let id = this.authService.usuario.cliente?.id;
      this.router.navigate(['app/profile/cliente', id]);
    }
  }
}
