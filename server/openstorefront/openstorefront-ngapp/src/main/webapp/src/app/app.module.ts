//Framework items
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http'
import {APP_BASE_HREF, PlatformLocation} from "@angular/common";
import {FormsModule} from '@angular/forms';

//ui elements
import {InputTextModule, PasswordModule, ButtonModule} from 'primeng/primeng';
//####### Storefront items ########
//Routing
import {AppRoutingModule} from './app-routing.module';
//Components
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AdminToolsComponent } from './admin-tools/admin-tools.component';
import { UserToolsComponent } from './user-tools/user-tools.component';
import { EvaluationToolsComponent } from './evaluation-tools/evaluation-tools.component';
//Servcies
import {BrandingService} from './services/branding.service';
import {AuthenticationService} from './services/authentication.service';

export function getBaseHref(platformLocation: PlatformLocation): string {
	return platformLocation.getBaseHrefFromDOM();
}

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
		LandingComponent,
		AdminToolsComponent,
		UserToolsComponent,
		EvaluationToolsComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		AppRoutingModule,
		InputTextModule,
		PasswordModule,
		ButtonModule
	],
	providers: [
		BrandingService,
		AuthenticationService,
		HttpClientModule,
		HttpClient,
		{
			provide: APP_BASE_HREF,
			useFactory: getBaseHref,
			deps: [PlatformLocation]
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
