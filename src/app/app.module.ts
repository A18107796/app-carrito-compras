import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ModalLoginComponent } from './shared/modal-login/modal-login.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ModalLoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
