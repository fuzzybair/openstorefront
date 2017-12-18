import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EntryComponent } from './admin/data/entry/entry.component';
import { BrandingComponent } from './admin/application/branding/branding.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EntryComponent,
    BrandingComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [BrandingService, HttpClientModule, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
