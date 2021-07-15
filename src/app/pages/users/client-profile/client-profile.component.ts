import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  constructor(public authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      param => {
        let id = param['id'];
        if (id && id > 0) {
          if (id != this.authService.usuario.cliente?.id) {
            this.authService.logout();
            this.router.navigate(['app/home'])
          }
        } else {
          this.authService.logout();
          this.router.navigate(['app/home'])
        }

      }
    )
  }

}
