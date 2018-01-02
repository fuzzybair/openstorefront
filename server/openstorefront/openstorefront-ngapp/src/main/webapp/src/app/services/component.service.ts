import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {APP_BASE_HREF} from "@angular/common";

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, flatMap, tap} from 'rxjs/operators';

import {ComponentSearchView} from '../models/component-search-view';

@Injectable()
export class ComponentService {
	private restUrl = this.baseHref + 'api/v1/resource/branding';  // URL to web api

	constructor(private http: HttpClient, @Inject(APP_BASE_HREF) private baseHref: string) {}
	//GET
	//APIDescription("Get a list of components <br>(Note: this only the top level component object, See Component Detail for composite resource.)")
	//Produces(MediaType.APPLICATION_JSON)
	//DataType(ComponentSearchView.class)
	public getComponents<ComponentSearchView>(): Observable<ComponentSearchView[]> {
		const url = `${this.restUrl}`;
		return this.http.get<ComponentSearchView[]>(url).pipe(
			tap(components => this.log(`fetched ComponentSearchView list records: ${components.length}`)),
			catchError(this.handleError('getComponents', []))
		);
	}

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	private log(message: any) {
		console.log(message);
	}
}
