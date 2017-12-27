import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/primeng';

@Component({
	selector: 'app-user-menu',
	templateUrl: './user-menu.component.html',
	styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

	public fullName: string = "Local Admin";
	public pages: MenuItem[];
	constructor() {}

	ngOnInit() {
		this.pages = [
			{label: 'Home', icon: 'fa-home', routerLink: ['/Landing.action']},
			{label: 'Admin Tools', icon: 'fa-gear', routerLink: ['/AdminTool.action']},
			{label: 'User Tools', icon: 'fa-user', routerLink: ['/UserTool.action']},
			{label: 'Evaluation Tools', icon: 'fa-th-list', routerLink: ['/EvaluationTool.action']},
			{separator: true},
			{label: 'Help', icon: 'fa-question-circle'},
			{label: 'Tutorials', icon: 'fa-tv'},
			{label: 'FAQ', icon: 'fa-info-circle'},
			{label: 'Contact Us', icon: 'fa-commenting'},
			{separator: true},
			{label: 'Logout', icon: 'fa-sign-out', routerLink: ['/Login.action']}
		];
	}

}
