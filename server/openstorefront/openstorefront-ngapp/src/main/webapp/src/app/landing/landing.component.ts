import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {BrandingService} from '../services/branding.service';
import {Branding} from '../models/Branding';

@Component({
	selector: 'app-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

	public brandingObs$: Observable<Branding>;
	constructor(public brandingServcie: BrandingService) {}

	ngOnInit() {
		this.brandingObs$ = this.brandingServcie.getCurrentBranding<Branding>();
	}

	private log(item: any) {
		console.log(item);
		//this.messageService.add('HeroService: ' + message);
	}
}
