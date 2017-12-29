//Framework items
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http'
import {APP_BASE_HREF, PlatformLocation} from "@angular/common";
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//ui elements
import {
	InputTextModule,
	PasswordModule,
	ButtonModule,
	MenuModule,
	MessageModule,
	TooltipModule,
	DataTableModule,
	SharedModule,
	DropdownModule
} from 'primeng/primeng';
//####### Storefront items ########
//Routing
import {AppRoutingModule} from './app-routing.module';
//Servcies
import {BrandingService} from './services/branding.service';
import {AuthenticationService} from './services/authentication.service';
import {AttributeService} from './services/attribute.service';

//Guards
import {LoggedInGuard} from './guards/logged-in.guard';
//Components
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {LandingComponent} from './landing/landing.component';
import {AdminToolsComponent} from './admin-tools/admin-tools.component';
import {UserToolsComponent} from './user-tools/user-tools.component';
import {EvaluationToolsComponent} from './evaluation-tools/evaluation-tools.component';
import {LandngPageHeaderComponent} from './landng-page-header/landng-page-header.component';
import {LandngPageFooterComponent} from './landng-page-footer/landng-page-footer.component';
import {UserMenuComponent} from './user-menu/user-menu.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AdminAttributesComponent} from './admin-attributes/admin-attributes.component';

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
		EvaluationToolsComponent,
		LandngPageHeaderComponent,
		LandngPageFooterComponent,
		UserMenuComponent,
		PageNotFoundComponent,
		AdminDashboardComponent,
		AdminAttributesComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		AppRoutingModule,
		InputTextModule,
		PasswordModule,
		ButtonModule,
		MenuModule,
		MessageModule,
		TooltipModule,
		DataTableModule,
		SharedModule,
		DropdownModule
	],
	providers: [
		BrandingService,
		AuthenticationService,
		AttributeService,
		LoggedInGuard,
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
