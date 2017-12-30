import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

	public pageTitle: string = "Dashboard";
	public pageToolTip: string = "Displays widgets and allows for quick mashup of data.";
	constructor() {}

	ngOnInit() {
	}

}
