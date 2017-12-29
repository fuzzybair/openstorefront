import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LandingComponent} from './landing/landing.component';
import {AdminToolsComponent} from './admin-tools/admin-tools.component';
import {UserToolsComponent} from './user-tools/user-tools.component';
import {EvaluationToolsComponent} from './evaluation-tools/evaluation-tools.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AdminAttributesComponent} from './admin-attributes/admin-attributes.component';
import {LoggedInGuard} from './guards/logged-in.guard';

const routes: Routes = [
	{path: '', redirectTo: 'Landing.action', pathMatch: 'full'},
	{path: 'Login.action', component: HomeComponent},
	{path: 'Landing.action', component: LandingComponent, canActivate: [LoggedInGuard]},
	{
		path: 'AdminTool.action',
		component: AdminToolsComponent,
		canActivate: [LoggedInGuard],
		children: [
			{path: '', redirectTo: 'Dashboard', pathMatch: 'full'},
			{path: 'Dashboard',	component: AdminDashboardComponent},
			{path: 'Attributes',	component: AdminAttributesComponent}
		]
	},
	{path: 'UserTool.action', component: UserToolsComponent, canActivate: [LoggedInGuard]},
	{path: 'EvaluationTool.action', component: EvaluationToolsComponent, canActivate: [LoggedInGuard]},
	{path: '**', component: PageNotFoundComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule {}
