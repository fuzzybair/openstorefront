import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {APP_BASE_HREF} from "@angular/common";

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {Login} from '../models/login';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
};
/*
 * this is just basic authentication for Proof of Concept additional safegards may need to be taken see
 * http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial#home-component-ts
 */
@Injectable()
export class AuthenticationService {

	private restUrl = this.baseHref + 'api/v1/service/authentication';  // URL to web api

	constructor(private http: HttpClient, @Inject(APP_BASE_HREF) private baseHref: string) {}

	login(username: string, password: string): Observable<Login> {
		const url = `${this.restUrl}/login`;
		const postData = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
		return this.http.post<Login>(url, postData, httpOptions).pipe(
			map(user => {
				// login successful if there's a jwt token in the response
				if (user && user.token) {
					// store user details and jwt token in local storage to keep user logged in between page refreshes
					localStorage.setItem('currentUser', JSON.stringify(user));
					user.url = user.url.replace(this.baseHref,'');
				}

				return user;
			}),
			tap(_ => this.log(`login`)),
			catchError(this.handleError<any>('login'))
		);
	}
	logout(): Observable<Login> {
		const url = `${this.restUrl}/logout`;
		return this.http.post<Login>(url, {}, httpOptions).pipe(
			map(user => {
				// remove user from local storage to log user out
				localStorage.removeItem('currentUser');
				return user;
			}),
			tap(_ => this.log(`logout`)),
			catchError(this.handleError<any>('logout'))
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
