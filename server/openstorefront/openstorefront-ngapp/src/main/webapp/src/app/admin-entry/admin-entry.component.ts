import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-entry',
  templateUrl: './admin-entry.component.html',
  styleUrls: ['./admin-entry.component.css']
})
export class AdminEntryComponent implements OnInit {

	public pageTitle:string = "Manage Entries";
	public pageToolTip:string = "This tool allows for manipulating all data related to an entry.";
  constructor() { }

  ngOnInit() {
  }

}
