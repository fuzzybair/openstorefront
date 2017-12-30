import {Component, OnInit,Input} from '@angular/core';

import {Branding} from '../models/Branding';

@Component({
	selector: 'app-landng-page-header',
	templateUrl: './landng-page-header.component.html',
	styleUrls: ['./landng-page-header.component.css']
})
export class LandngPageHeaderComponent implements OnInit {
	
	@Input()
	public branding: Branding;
	constructor() {}

	ngOnInit() {
	}
}
