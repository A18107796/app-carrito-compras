import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ModalLoginComponent } from './shared/modal-login/modal-login.component';
import { BreadcrumsComponent } from './shared/breadcrums/breadcrums.component';
import { ModalRegisterComponent } from './shared/modal-register/modal-register.component';
import { ModalSharedComponent } from './shared/modal-shared/modal-shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ModalLoginComponent,
    BreadcrumsComponent,
    ModalRegisterComponent,
    ModalSharedComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
