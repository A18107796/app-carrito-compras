import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/app/home'])
    }else if(!this.authService.hasRole('ROLE_EMPLEADO')){
      this.router.navigate(['/app/home'])
    }
  }

}
