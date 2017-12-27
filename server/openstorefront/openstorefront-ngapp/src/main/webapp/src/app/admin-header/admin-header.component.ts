import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {MenuItem} from 'primeng/primeng';

import {BrandingService} from '../services/branding.service';
import {Branding} from '../models/Branding';

@Component({
	selector: 'app-admin-header',
	templateUrl: './admin-header.component.html',
	styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {


	public brandingObs$: Observable<Branding>;
	public dataPages: MenuItem[];
	public evaluatonPages: MenuItem[];
	public applicationPages: MenuItem[];
	constructor(public brandingServcie: BrandingService) {}

	ngOnInit() {
		this.brandingObs$ = this.brandingServcie.getCurrentBranding<Branding>();
		this.dataPages = [
			{label: 'Home', routerLink: ['/Landing.action']},
			{label: 'TBD'}
		];
		this.evaluatonPages = [
			{label: 'TBD'}
		];
		this.applicationPages = [
			{label: 'TBD'}
		];
	}
}
