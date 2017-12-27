import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';


import {BrandingService} from '../services/branding.service';
import {Branding} from '../models/Branding';

@Component({
	selector: 'app-landng-page-header',
	templateUrl: './landng-page-header.component.html',
	styleUrls: ['./landng-page-header.component.css']
})
export class LandngPageHeaderComponent implements OnInit {
	public branding: Branding;
	constructor(public brandingServcie: BrandingService) {}

	ngOnInit() {
		this.brandingServcie.getCurrentBranding<Branding>().subscribe(
			data => {
				this.branding = data;
			},
			error => {
				this.log(error);
				//this.loading = false;
			});
	}

	private log(item: any) {
		console.log(item);
		//this.messageService.add('HeroService: ' + message);
	}

}
