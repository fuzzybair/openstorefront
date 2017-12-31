import {Component, OnInit, Inject} from '@angular/core';
import {APP_BASE_HREF} from "@angular/common";

@Component({
	selector: 'app-page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

	constructor( @Inject(APP_BASE_HREF) public baseHref: string) {}

	ngOnInit() {
	}

}
