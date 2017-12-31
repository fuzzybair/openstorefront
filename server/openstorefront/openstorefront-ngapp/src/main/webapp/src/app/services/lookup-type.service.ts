import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {APP_BASE_HREF} from "@angular/common";

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {LookupEntity} from '../models/lookup-entity';

const httpOptions = {
	headers: new HttpHeaders()
		.set("Content-Type", "application/json")
		.set("Access-Control-Allow-Credentials", "true")
		.set("Access-Control-Allow-Origin", "*")
		.set("Cache-Control", "no-cache") // due to IE browser caches API get requests)
};

@Injectable()
export class LookupTypeService {
	private restUrl = this.baseHref + 'api/v1/resource/lookuptypes';  // URL to web api

	constructor(private http: HttpClient, @Inject(APP_BASE_HREF) private baseHref: string) {}

	//GET
	//APIDescription("Get entity type codes")
	//Produces({MediaType.APPLICATION_JSON})
	//DataType(value = GenericLookupEntity.class, actualClassName = "LookupEntity")
	//Path("/{entity}")
	getEntityValues(entity: string): Observable<LookupEntity[]> {
		const url = `${this.restUrl}/${entity}`;
		//FilterQueryParams
		let params = new HttpParams();

		//		if(!!attributeTypeDescription)
		//		{
		//			params.append("attributeTypeDescription",attributeTypeDescription);
		//		}
		//		if(!!attributeCodeLabel)
		//		{
		//			params.append("attributeCodeLabel",attributeCodeLabel);
		//		}
		return this.http.get<LookupEntity[]>(url, {params}).pipe(
			tap(attributes => this.log(`fetched LookupEntity list records: ${attributes.length}`)),
			catchError(this.handleError('LookupEntityList', []))
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

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	private log(message: any) {
		console.log(message);
	}
}
