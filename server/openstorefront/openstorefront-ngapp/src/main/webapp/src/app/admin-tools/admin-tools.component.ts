import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.css']
})
export class AdminToolsComponent implements OnInit {
	public pageTitle:string = "Dashboard";
	public pageToolTip:string = "Displays widgets and allows for quick mashup of data.";

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
//	  this.sub = this.route.params.subscribe(params => {
//       this.id = +params['id']; // (+) converts string 'id' to a number
//    });
  }

}
