import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http'


import {InputTextModule, PasswordModule, ButtonModule} from 'primeng/primeng';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

import {BrandingService} from './services/branding.service';
import {LoginComponent} from './login/login.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		InputTextModule,
		PasswordModule,
		ButtonModule
	],
	providers: [BrandingService, HttpClientModule, HttpClient],
	bootstrap: [AppComponent]
})
export class AppModule {}
