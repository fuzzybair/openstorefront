import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { AdminToolsComponent } from './admin-tools/admin-tools.component';
import { UserToolsComponent } from './user-tools/user-tools.component';
import { EvaluationToolsComponent } from './evaluation-tools/evaluation-tools.component';

const routes: Routes = [
	{path: '', redirectTo: 'Landing.action', pathMatch: 'full'},
	{path: 'Login.action', component: HomeComponent},
	{path: 'Landing.action', component: LandingComponent},
	{path: 'AdminTools.action', component: AdminToolsComponent},
	{path: 'UserTools.action', component: UserToolsComponent},
	{path: 'EvaluationTool.action', component: EvaluationToolsComponent}
];	

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule {}
