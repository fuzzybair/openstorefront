import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { BrandingService } from './services/branding.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    AppRoutingModule
  ],
  providers: [BrandingService, HttpClientModule, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
