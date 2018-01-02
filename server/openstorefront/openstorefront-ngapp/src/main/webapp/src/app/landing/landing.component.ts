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
	public chartGroupAttribute: string = "GENRA";

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

		let viewSrc = of<ComponentSearchView[]>(this.mockData());
//		let viewSrc = this.componentService.getComponents<ComponentSearchView[]>()
		viewSrc.pipe(
			// as Observable's are collections we are converting the array into 
			// an Observable rather than having an Obaservable collection with 
			// a single item in it that is an array 
			flatMap(theArray => theArray),
			groupBy<ComponentSearchView, string>(p => p.attributes.find(f => f.type === "GENRA").code),
			flatMap(group => group.pipe(
				reduce<ComponentSearchView, {genra: string, count: number}>((total, item) => {
					let genra: string = item.attributes.find(f => f.type === "GENRA").label;
					let count: number = 1;
					if (total.genra === genra) {
						count = total.count + 1;
					}
					return {genra: genra, count: count}
				}, {genra: "", count: 0})
			)),
			toArray()
		)
			.subscribe(data => this.populateChart(data));

	}
	private populateChart(componentList: {genra: string, count: number}[]): void {
		debugger;
		let genras:string[] = [];
		let counts:number[] = [];
		let colors:string[] = [	"#48B200","#AB00B2", "#FF6384", "#36A2EB", "#FFCE56","#FF0000","#00FF00","#0000FF","#000000","#CCCCCC"	];
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
	private mockData(): ComponentSearchView[] {
		let serverResponse: string = '[\
    {\
        "type": "componentSearchView",\
        "activeStatus": "A",\
        "approvalState": "A",\
        "approvedDts": "2017-01-18T16:30:31.752-07:00",\
        "approvedUser": "admin",\
        "attributes": [\
            {\
                "code": "ROCK",\
                "label": "Rock",\
                "type": "GENRA",\
                "typeLabel": "Genre"\
            }\
        ],\
        "averageRating": 3,\
        "componentId": "d205fe4c-7a42-479c-a602-2507561cadb2",\
        "componentType": "ARTIST",\
        "componentTypeDescription": "Artist",\
        "createDts": "2017-12-27T21:43:20.665-07:00",\
        "createUser": "admin",\
        "description": "",\
        "lastActivityDts": "2017-12-27T21:43:20.665-07:00",\
        "listingType": "Component",\
        "name": "38 Special",\
        "organization": "Don Barnes and Donnie Van Zant",\
        "searchScore": 0,\
        "tags": [],\
        "updateDts": "2017-12-27T21:43:20.665-07:00",\
        "updateUser": "admin"\
    },\
    {\
        "type": "componentSearchView",\
        "activeStatus": "A",\
        "approvalState": "A",\
        "approvedDts": "2017-01-18T16:30:34.603-07:00",\
        "approvedUser": "admin",\
        "attributes": [\
            {\
                "code": "NONEGIVEN",\
                "label": "none given",\
                "type": "SUMM",\
                "typeLabel": "Summary"\
            },\
            {\
                "code": "AMRECORDS",\
                "label": "A&M Records",\
                "type": "RECORD_LABEL",\
                "typeLabel": "Record Label"\
            },\
            {\
                "code": "ROCK",\
                "label": "Rock",\
                "type": "GENRA",\
                "typeLabel": "Genre"\
            }\
        ],\
        "averageRating": 0,\
        "componentId": "56a6d8d9-c27b-4022-9ba8-2cb77a87df44",\
        "componentType": "ALBUM",\
        "componentTypeDescription": "Album",\
        "createDts": "2017-12-27T21:43:21.096-07:00",\
        "createUser": "admin",\
        "description": "",\
        "lastActivityDts": "2017-12-27T21:43:21.096-07:00",\
        "listingType": "Component",\
        "name": "38 Special (self-titled album)",\
        "organization": "38 Special",\
        "searchScore": 0,\
        "tags": [],\
        "updateDts": "2017-12-27T21:43:21.096-07:00",\
        "updateUser": "admin"\
    },\
    {\
        "type": "componentSearchView",\
        "activeStatus": "A",\
        "approvalState": "A",\
        "approvedDts": "2017-01-13T15:24:48.757-07:00",\
        "approvedUser": "admin",\
        "attributes": [\
            {\
                "code": "PORTRAITIMPRINTUN",\
                "label": "Portrait (imprint under Sony Masterworks)",\
                "type": "RECORD_LABEL",\
                "typeLabel": "Record Label"\
            },\
            {\
                "code": "CLASSICALCROSSOVER",\
                "label": "Classical Crossover",\
                "type": "GENRA",\
                "typeLabel": "Genre"\
            }\
        ],\
        "averageRating": 0,\
        "componentId": "c36242f7-213e-40b3-9aaa-14e99649386e",\
        "componentType": "ALBUM",\
        "componentTypeDescription": "Album",\
        "createDts": "2017-12-27T21:43:21.291-07:00",\
        "createUser": "admin",\
        "description": "",\
        "lastActivityDts": "2017-12-27T21:43:21.291-07:00",\
        "listingType": "Component",\
        "name": "A Family Christmas",\
        "organization": "The Piano Guys",\
        "searchScore": 0,\
        "tags": [],\
        "updateDts": "2017-12-27T21:43:21.291-07:00",\
        "updateUser": "admin"\
    },\
    {\
        "type": "componentSearchView",\
        "activeStatus": "A",\
        "approvalState": "A",\
        "approvedDts": "2017-01-18T16:30:57.488-07:00",\
        "approvedUser": "admin",\
        "attributes": [\
            {\
                "code": "CMCINTERNATIONALRE",\
                "label": "CMC International Records",\
                "type": "RECORD_LABEL",\
                "typeLabel": "Record Label"\
            },\
            {\
                "code": "ROCK",\
                "label": "Rock",\
                "type": "GENRA",\
                "typeLabel": "Genre"\
            }\
        ],\
        "averageRating": 0,\
        "componentId": "2846262d-4e84-4ada-b69e-ad932285cecf",\
        "componentType": "ALBUM",\
        "componentTypeDescription": "Album",\
        "createDts": "2017-12-27T21:43:21.405-07:00",\
        "createUser": "admin",\
        "description": "",\
        "lastActivityDts": "2017-12-27T21:43:21.405-07:00",\
        "listingType": "Component",\
        "name": "A Wild-Eyed Christmas Night",\
        "organization": "38 Special",\
        "searchScore": 0,\
        "tags": [],\
        "updateDts": "2017-12-27T21:43:21.405-07:00",\
        "updateUser": "admin"\
    },\
    {\
        "type": "componentSearchView",\
        "activeStatus": "A",\
        "approvalState": "A",\
        "approvedDts": "2017-01-19T13:52:32.437-07:00",\
        "approvedUser": "admin",\
        "attributes": [\
            {\
                "code": "ATLANTIC",\
                "label": "Atlantic",\
                "type": "RECORD_LABEL",\
                "typeLabel": "Record Label"\
            },\
            {\
                "code": "SOFT_ROCK",\
                "label": "Soft Rock",\
                "type": "GENRA",\
                "typeLabel": "Genre"\
            }\
        ],\
        "averageRating": 0,\
        "componentId": "f13278a2-abb2-4663-811c-593305fe35fc",\
        "componentType": "ALBUM",\
        "componentTypeDescription": "Album",\
        "createDts": "2017-12-27T21:43:21.475-07:00",\
        "createUser": "user",\
        "description": "",\
        "lastActivityDts": "2017-12-27T21:43:21.475-07:00",\
        "listingType": "Component",\
        "name": "Abandoned Luncheonette",\
        "organization": "Hall & Oates",\
        "searchScore": 0,\
        "tags": [],\
        "updateDts": "2017-12-27T21:43:21.475-07:00",\
        "updateUser": "admin"\
    },\
    {\
        "type": "componentSearchView",\
        "activeStatus": "A",\
        "approvalState": "A",\
        "approvedDts": "2017-01-17T15:40:02.091-07:00",\
        "approvedUser": "admin",\
        "attributes": [\
            {\
                "code": "POP",\
                "label": "Pop",\
                "type": "GENRA",\
                "typeLabel": "Genre"\
            }\
        ],\
        "averageRating": 3,\
        "componentId": "75d242bd-4443-4e6b-88a7-16591996383f",\
        "componentType": "ARTIST",\
        "componentTypeDescription": "Artist",\
        "createDts": "2017-12-27T21:43:21.56-07:00",\
        "createUser": "user",\
        "description": "",\
        "lastActivityDts": "2017-12-27T21:43:21.56-07:00",\
        "listingType": "Component",\
        "name": "ABC",\
        "organization": "ABC",\
        "searchScore": 0,\
        "tags": [],\
        "updateDts": "2017-12-27T21:43:21.56-07:00",\
        "updateUser": "admin"\
    },\
    {\
        "type": "componentSearchView",\
        "activeStatus": "A",\
        "approvalState": "A",\
        "approvedDts": "2017-01-17T15:40:17.843-07:00",\
        "approvedUser": "admin",\
        "attributes": [\
            {\
                "code": "ABRACADABRAISTHES",\
                "label": "Abracadabra is the sixth studio album by the British band ABC, released in August 1991 on EMI. It was the final ABC album to feature founding member Mark White, who departed the band in 1992.",\
                "type": "SUMM",\
                "typeLabel": "Summary"\
            },\
            {\
                "code": "MCARECORDS",\
                "label": "MCA Records",\
                "type": "RECORD_LABEL",\
                "typeLabel": "Record Label"\
            },\
            {\
                "code": "POP",\
                "label": "Pop",\
                "type": "GENRA",\
                "typeLabel": "Genre"\
            }\
        ],\
        "averageRating": 0,\
        "componentId": "a2b03d8c-53bf-49fc-8095-70fe94fcc51d",\
        "componentType": "ALBUM",\
        "componentTypeDescription": "Album",\
        "createDts": "2017-12-27T21:43:21.861-07:00",\
        "createUser": "user",\
        "description": "",\
        "lastActivityDts": "2017-12-27T21:43:21.861-07:00",\
        "listingType": "Component",\
        "name": "Abracadabra",\
        "organization": "ABC",\
        "searchScore": 0,\
        "tags": [],\
        "updateDts": "2017-12-27T21:43:21.861-07:00",\
        "updateUser": "admin"\
    },\
    {\
        "type": "componentSearchView",\
        "activeStatus": "A",\
        "approvalState": "A",\
        "approvedDts": "2017-01-25T09:13:56.489-07:00",\
        "approvedUser": "admin",\
        "attributes": [\
            {\
                "code": "S-CURVERECORDSUS",\
                "label": "S-Curve Records (US)",\
                "type": "RECORD_LABEL",\
                "typeLabel": "Record Label"\
            },\
            {\
                "code": "SYNTHPOP",\
                "label": "SynthPop",\
                "type": "GENRA",\
                "typeLabel": "Genre"\
            }\
        ],\
        "averageRating": 0,\
        "componentId": "facb720e-ba1a-4a80-8d1d-ebfbf8d9f5a4",\
        "componentType": "ALBUM",\
        "componentTypeDescription": "Album",\
        "createDts": "2017-12-27T21:43:21.939-07:00",\
        "createUser": "admin",\
        "description": "",\
        "lastActivityDts": "2017-12-27T21:43:21.939-07:00",\
        "listingType": "Component",\
        "name": "All You Need Is Now",\
        "organization": "Duran Duran",\
        "searchScore": 0,\
        "tags": [],\
        "updateDts": "2017-12-27T21:43:21.939-07:00",\
        "updateUser": "admin"\
    },\
    {\
        "type": "componentSearchView",\
        "activeStatus": "A",\
        "approvalState": "A",\
        "approvedDts": "2017-01-19T13:52:56.838-07:00",\
        "approvedUser": "admin",\
        "attributes": [\
            {\
                "code": "RCA",\
                "label": "RCA",\
                "type": "RECORD_LABEL",\
                "typeLabel": "Record Label"\
            },\
            {\
                "code": "SOFT_ROCK",\
                "label": "Soft Rock",\
                "type": "GENRA",\
                "typeLabel": "Genre"\
            }\
        ],\
        "averageRating": 0,\
        "componentId": "5458837c-ea57-4be3-b5e5-1eea2b71a49b",\
        "componentType": "ALBUM",\
        "componentTypeDescription": "Album",\
        "createDts": "2017-12-27T21:43:22.058-07:00",\
        "createUser": "user",\
        "description": "",\
        "lastActivityDts": "2017-12-27T21:43:22.058-07:00",\
        "listingType": "Component",\
        "name": "Along the Red Ledge",\
        "organization": "Hall & Oates",\
        "searchScore": 0,\
        "tags": [],\
        "updateDts": "2017-12-27T21:43:22.058-07:00",\
        "updateUser": "admin"\
    },\
    {\
        "type": "componentSearchView",\
        "activeStatus": "A",\
        "approvalState": "A",\
        "approvedDts": "2017-01-13T14:51:25.575-07:00",\
        "approvedUser": "admin",\
        "attributes": [\
            {\
                "code": "NONEGIVEN",\
                "label": "none given",\
                "type": "SUMM",\
                "typeLabel": "Summary"\
            },\
            {\
                "code": "NONEGIVEN",\
                "label": "none given",\
                "type": "RECORD_LABEL",\
                "typeLabel": "Record Label"\
            },\
            {\
                "code": "CLASSICAL",\
                "label": "Classical",\
                "type": "GENRA",\
                "typeLabel": "Genre"\
            }\
        ],\
        "averageRating": 0,\
        "componentId": "f6261335-7159-41e9-81e5-bca5e455fa3f",\
        "componentType": "ALBUM",\
        "componentTypeDescription": "Album",\
        "createDts": "2017-12-27T21:43:31.569-07:00",\
        "createUser": "admin",\
        "description": "",\
        "lastActivityDts": "2017-12-27T21:43:31.569-07:00",\
        "listingType": "Component",\
        "name": "YouTube Hits, Volume 1",\
        "organization": "The Piano Guys",\
        "searchScore": 0,\
        "tags": [],\
        "updateDts": "2017-12-27T21:43:31.569-07:00",\
        "updateUser": "admin"\
    }\
]';
		let parsedJSON = JSON.parse(serverResponse);
		let results: ComponentSearchView[] = parsedJSON as ComponentSearchView[];
		return results;
	}
}
