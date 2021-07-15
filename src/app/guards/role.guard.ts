import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let role = next.data['role'] as string;
    console.log(this.authService.usuario);
    console.log(this.authService.hasRole(role));
    
    if (this.authService.hasRole(role)) {
      console.log(role)
      return true;
    }
    
    Swal.fire('Acceso denegado', 'No tienes acceso a este recurso!!', 'warning');
    this.router.navigate(['app/home']);
    return false;
  }
}


