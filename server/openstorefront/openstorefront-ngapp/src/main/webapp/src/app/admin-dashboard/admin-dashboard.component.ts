import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

	public pageTitle: string = "Manage Entries";
	public pageToolTip: string = "This tool allows for manipulating all data related to an entry.";
	constructor() {}

	ngOnInit() {
	}

}
