import {Component, OnInit} from '@angular/core';
import {BrandingService} from '../services/branding.service';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {Branding} from '../models/Branding';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	public brandingObs$: Observable<Branding>;
	constructor(public brandingServcie: BrandingService) {}

	ngOnInit() {
		this.brandingObs$ = this.brandingServcie.getCurrentBranding<Branding>();
	}
	signUp():void {
		
	}
	/** Log a HeroService message with the MessageService */
	private log(message: string) {
		console.log("BrandingService: " +message);
	}
}