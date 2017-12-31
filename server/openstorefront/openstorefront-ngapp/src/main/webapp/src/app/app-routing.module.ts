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
	//Old url mappings to new
	{path: 'Login.action', redirectTo: '/Login' },
	{path: 'Landing.action', redirectTo: '/Landing' },
	{path: 'AdminTool.action', redirectTo: '/AdminTool' },
	{path: 'UserTool.action', redirectTo: '/UserTool' },
	{path: 'EvaluationTool.action', redirectTo: '/EvaluationTool' },
	//Routes
	{path: '', redirectTo: '/Landing', pathMatch: 'full'},
	{path: 'Login', component: HomeComponent},
	{path: 'Landing', component: LandingComponent, canActivate: [LoggedInGuard]},
	{
		path: 'AdminTool',
		component: AdminToolsComponent,
		canActivate: [LoggedInGuard],
		children: [
			{path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
			{path: 'Dashboard',	component: AdminDashboardComponent},
			{path: 'Attributes',	component: AdminAttributesComponent}
		]
	},
	{path: 'UserTool', component: UserToolsComponent, canActivate: [LoggedInGuard]},
	{path: 'EvaluationTool', component: EvaluationToolsComponent, canActivate: [LoggedInGuard]},
//	{path: '**', component: PageNotFoundComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: true })],
	exports: [RouterModule]
})

export class AppRoutingModule {}
