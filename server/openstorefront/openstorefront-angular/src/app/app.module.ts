import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'


import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { BrandingService } from './services/branding.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [BrandingService,HttpClientModule, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
