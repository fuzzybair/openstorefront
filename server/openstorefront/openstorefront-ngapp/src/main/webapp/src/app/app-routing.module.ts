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

const routes: Routes = [
	{path: '', redirectTo: 'Landing.action', pathMatch: 'full'},
	{path: 'Login.action', component: HomeComponent},
	{path: 'Landing.action', component: LandingComponent},
	{
		path: 'AdminTool.action',
		component: AdminToolsComponent,
		children: [
			{path: '', redirectTo: 'Dashboard', pathMatch: 'full'},
			{path: 'Dashboard',	component: AdminDashboardComponent},
			{path: 'Attributes',	component: AdminAttributesComponent}
		]
	},
	{path: 'UserTool.action', component: UserToolsComponent},
	{path: 'EvaluationTool.action', component: EvaluationToolsComponent},
	{path: '**', component: PageNotFoundComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule {}
