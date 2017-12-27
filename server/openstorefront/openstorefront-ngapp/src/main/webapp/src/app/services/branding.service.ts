import {Injectable, Inject} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {APP_BASE_HREF} from "@angular/common";

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {Branding} from '../models/Branding';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class BrandingService {

	private restUrl = this.baseHref + 'api/v1/resource/branding';  // URL to web api

	constructor(private http: HttpClient, @Inject(APP_BASE_HREF) private baseHref: string) {}


	//######## GET Methods ########
	getAllBranding(): Observable<Branding[]> {
		return this.http.get<Branding[]>(this.restUrl).pipe(
			tap(branding => this.log(`fetched branding list`)),
			catchError(this.handleError('getAllBranding', []))
		);
	}

	getCurrentBranding<Branding>(): Observable<Branding> {
		const url = `${this.restUrl}/current`;
		return this.http.get<Branding>(url).pipe(
			tap(data => this.log(`fetched current branding ` + data)),
			catchError(this.handleError<Branding>('getCurrentBranding'))
		);
	}

	getBranding<Branding>(id: string): Observable<Branding> {
		const url = `${this.restUrl}/${id}`;
		return this.http.get<Branding>(url).pipe(
			tap(_ => this.log(`fetched branding id=${id}`)),
			catchError(this.handleError<Branding>(`getBranding id=${id}`))
		);
	}

	//######## DELETE Methods ########
	deleteBranding(branding: Branding | string): Observable<Branding> {
		const id = typeof branding === 'string' ? branding : branding.brandingId;
		const url = `${this.restUrl}/${id}`;

		return this.http.delete<Branding>(url, httpOptions).pipe(
			tap(_ => this.log(`deleted branding id=${id}`)),
			catchError(this.handleError<Branding>('deleteBranding'))
		);
	}

	//######## POST Methods ########
	addBranding(branding: Branding): Observable<Branding> {
		return this.http.post<Branding>(this.restUrl, branding, httpOptions).pipe(
			tap((branding: Branding) => this.log(`added branding w/ id=${branding.brandingId}`)),
			catchError(this.handleError<Branding>('addBranding'))
		);
	}

	//######## Update (PUT) Methods ########
	resetBranding(): Observable<any> {
		const url = `${this.restUrl}/current/default`;
		return this.http.put(url, {}, httpOptions).pipe(
			tap(_ => this.log(`reset branding`)),
			catchError(this.handleError<any>('resetBranding'))
		);
	}

	updateBranding(branding: Branding): Observable<any> {
		const url = `${this.restUrl}/${branding.brandingId}`;
		return this.http.put(url, branding, httpOptions).pipe(
			tap(_ => this.log(`update branding`)),
			catchError(this.handleError<any>('updateBranding'))
		);
	}

	activateBranding(branding: Branding | string): Observable<any> {
		const id = typeof branding === 'string' ? branding : branding.brandingId;
		const url = `${this.restUrl}/${id}/active`;
		return this.http.put(url, {}, httpOptions).pipe(
			tap(_ => this.log(`activate branding`)),
			catchError(this.handleError<any>('activateBranding'))
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

	/** Log a HeroService message with the MessageService */
	private log(message: string) {
		console.log(message);
		//this.messageService.add('HeroService: ' + message);
	}
}
