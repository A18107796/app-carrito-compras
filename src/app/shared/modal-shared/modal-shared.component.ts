import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModalLoginService } from 'src/app/services/modal-login.service';

@Component({
  selector: 'app-modal-shared',
  templateUrl: './modal-shared.component.html',
  styleUrls: ['./modal-shared.component.css']
})
export class ModalSharedComponent implements OnInit {

  @Input() page!: string;
  constructor(private router: Router, public modalService: ModalLoginService, private authService: AuthService) { 
    if(this.authService.isAuthenticated()){
      this.router.navigate(['app', { outlets: { modal: null } }]); 
    }
  }

  ngOnInit(): void {
  }


  
  cerrarModal(event: any) {
    this.router.navigate(['app', { outlets: { modal: null } }]); 
  }
}
