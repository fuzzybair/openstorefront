import {Component, OnInit,Inject} from '@angular/core';
import {APP_BASE_HREF} from "@angular/common";

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {first} from 'rxjs/operators/first';
//import {catchError, map, tap} from 'rxjs/operators';
import 'rxjs/operators';

import {BrandingService} from '../services/branding.service';
import {GeneralMediaService} from '../services/general-media.service';
import {Branding} from '../models/Branding';
import {GeneralMediaView} from '../models/general-media-view';
import {GeneralMediaWrapper} from '../models/general-media-wrapper';

@Component({
	selector: 'app-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

	public brandingObs$: Observable<Branding>;
	public generalMediaObs$: Observable<GeneralMediaWrapper>;
	public generalMedia: any[];
	constructor(public brandingServcie: BrandingService, public generalMediaServcie: GeneralMediaService, @Inject(APP_BASE_HREF) private baseHref: string) {}

	ngOnInit() {
		this.brandingObs$ = this.brandingServcie.getCurrentBranding<Branding>();
				this.generalMediaServcie.getGeneralMedia<GeneralMediaWrapper>({}).subscribe(
			generalMediaWrapper => {
				this.log("got media result");
				if (!!generalMediaWrapper) {
					for (let view of generalMediaWrapper.data) {
						this.generalMedia.push({source: this.baseHref + view.mediaLink, title: view.name});
					}
				}
				this.log("finished result");
			});
	}
	
	public getImages(): any[]{		
		this.log("using result");
		return this.generalMedia;
	}
	
	private log(item: any) {
		console.log(item);
		//this.messageService.add('HeroService: ' + message);
	}
}
