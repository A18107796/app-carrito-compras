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
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './shared/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ModalLoginComponent,
    BreadcrumsComponent,
    ModalRegisterComponent,
    ModalSharedComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
