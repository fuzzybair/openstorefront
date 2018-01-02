import {Component, OnInit, Inject} from '@angular/core';
import {APP_BASE_HREF} from "@angular/common";

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {from} from 'rxjs/observable/from';
import {catchError, flatMap, tap, groupBy, reduce, toArray} from 'rxjs/operators';

import {BrandingService} from '../services/branding.service';
import {GeneralMediaService} from '../services/general-media.service';
import {ComponentService} from '../services/component.service';
import {Branding} from '../models/Branding';
import {GeneralMediaWrapper} from '../models/general-media-wrapper';
import {ComponentSearchView} from '../models/component-search-view';

@Component({
	selector: 'app-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

	public brandingObs$: Observable<Branding>;
	public generalMediaObs$: Observable<GeneralMediaWrapper>;
	public generalMedia: any[] = [];
	public chartData: any;

	constructor( @Inject(APP_BASE_HREF) private baseHref: string,
		public brandingServcie: BrandingService,
		public generalMediaServcie: GeneralMediaService,
		public componentService: ComponentService) {}

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

		this.componentService.getComponents<ComponentSearchView>()
			.pipe(
			// as Observable's are collections we are converting the array into 
			// an Observable rather than having an Obaservable collection with 
			// a single item in it that is an array 
			flatMap(theArray => theArray),
			groupBy<ComponentSearchView, string>(p => {
				let genra = p.attributes.find(f => f.type === "GENRA");
				if (genra === undefined) {
					return "NONE";
				} else {
					return genra.code;
				}

			}),
			flatMap(group => group.pipe(
				reduce<ComponentSearchView, {genra: string, count: number}>((total, item) => {
					let count: number = 1;
					let genraLabel: string = "Unknown";
					let genra = item.attributes.find(f => f.type === "GENRA");
					if (genra !== undefined) {
						genraLabel = genra.label;
					}
					if (total.genra === genraLabel) {
						count = total.count + 1;
					}
					return {genra: genraLabel, count: count}
				}, {genra: "", count: 0})
			)),
			toArray()
			)
			.subscribe(data => this.populateChart(data));

	}
	private populateChart(componentList: {genra: string, count: number}[]): void {
		let genras: string[] = [];
		let counts: number[] = [];
		let colors: string[] = ["#48B200", "#AB00B2", "#FF6384", "#36A2EB", "#FFCE56", "#FF0000", "#00FF00", "#0000FF", "#000000", "#CCCCCC","#FFFF00"];
		componentList.map(item => {
			genras.push(item.genra);
			counts.push(item.count)
		});

		this.chartData = {
			// componentType
			labels: genras,
			datasets: [
				{
					//count
					data: counts,
					backgroundColor: colors,
					hoverBackgroundColor: colors
				}]
		};
		this.log(JSON.stringify(this.chartData));
	}
	public getImages(): any[] {
		//		this.log(`using result ${JSON.stringify(this.generalMedia)}`);
		return this.generalMedia;
	}

	private log(item: any) {
		console.log(item);
	}
}
