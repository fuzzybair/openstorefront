import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {APP_BASE_HREF} from "@angular/common";

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {GeneralMediaWrapper} from '../models/general-media-wrapper';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class GeneralMediaService {
	private restUrl = this.baseHref + 'api/v1/resource/generalmedia';  // URL to web api

	constructor(private http: HttpClient, @Inject(APP_BASE_HREF) private baseHref: string) {}

	//GET
	//APIDescription("Gets all general media records.")
	//Produces({MediaType.APPLICATION_JSON})
	//DataType(GeneralMediaView.class)
	public getGeneralMedia<GeneralMediaWrapper>(filterQueryParams: any): Observable<GeneralMediaWrapper> {
		const url = `${this.restUrl}`;
		this.log("requesting media");
		return this.http.get<GeneralMediaWrapper>(url).pipe(
			tap(data => this.log(`fetched general media ` + data)),
			catchError( this.handleError<GeneralMediaWrapper>('getGeneralMedia'))
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
		//this.messageService.add('HeroService: ' + message);
	}
}
