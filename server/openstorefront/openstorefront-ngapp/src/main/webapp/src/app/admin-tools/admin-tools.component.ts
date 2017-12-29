import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {MenuItem} from 'primeng/primeng';

import {BrandingService} from '../services/branding.service';
import {Branding} from '../models/Branding';

@Component({
	selector: 'app-admin-tools',
	templateUrl: './admin-tools.component.html',
	styleUrls: ['./admin-tools.component.css']
})
export class AdminToolsComponent implements OnInit {
	private sub: any;
	private data: any;
	public brandingObs$: Observable<Branding>;
	public dataPages: MenuItem[];
	public evaluationPages: MenuItem[];
	public applicationPages: MenuItem[];
	constructor(public brandingServcie: BrandingService, private route: ActivatedRoute) {}

	ngOnInit() {
		this.brandingObs$ = this.brandingServcie.getCurrentBranding<Branding>();
		this.setMenu();
//		this.sub = this.route.params.subscribe(params => {
//			this.data = params;
//		});
	}
	private setMenu():void{
		this.dataPages = [
			{label: 'Attributes', routerLink: ['/AdminTool.action/Attributes']},
			{label: 'TBD'}
		];
		this.evaluationPages = [
			{label: 'TBD'}
		];
		this.applicationPages = [
			{label: 'TBD'}
		];
	}

}
