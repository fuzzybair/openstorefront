import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-attributes',
  templateUrl: './admin-attributes.component.html',
  styleUrls: ['./admin-attributes.component.css']
})
export class AdminAttributesComponent implements OnInit {

	public pageTitle:string = "Manage Entries";
	public pageToolTip:string = "This tool allows for manipulating all data related to an entry.";
  constructor() { }

  ngOnInit() {
  }

}
