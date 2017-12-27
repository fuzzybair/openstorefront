import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LandingComponent} from './landing/landing.component';
import {AdminToolsComponent} from './admin-tools/admin-tools.component';
import {UserToolsComponent} from './user-tools/user-tools.component';
import {EvaluationToolsComponent} from './evaluation-tools/evaluation-tools.component';
import {AdminEntryComponent} from './admin-entry/admin-entry.component';

const routes: Routes = [
	{path: '', redirectTo: 'Landing.action', pathMatch: 'full'},
	{path: 'Login.action', component: HomeComponent},
	{path: 'Landing.action', component: LandingComponent},
	{
		path: 'AdminTool.action', 
		component: AdminToolsComponent,
		children: [
			{path: '', redirectTo: 'Entry', pathMatch: 'full'},
			{path: 'Entry', component: AdminEntryComponent}
		]
	},
	{path: 'UserTool.action', component: UserToolsComponent},
	{path: 'EvaluationTool.action', component: EvaluationToolsComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule {}
