import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {APP_BASE_HREF} from "@angular/common";

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {AttributeType} from '../models/attribute-type';
import {ComponentTypeRestriction} from '../models/component-type-restriction';

const httpOptions = {
	headers: new HttpHeaders()
		.set("Content-Type", "application/json")
		.set("Access-Control-Allow-Credentials", "true")
		.set("Access-Control-Allow-Origin", "*")
		.set("Cache-Control", "no-cache") // due to IE browser caches API get requests)
};
@Injectable()
export class AttributeService {
	private restUrl = this.baseHref + 'api/v1/resource/attributes';  // URL to web api

	constructor(private http: HttpClient, @Inject(APP_BASE_HREF) private baseHref: string) {}

	// GET
	// APIDescription("Gets attribute types based on filter")
	// Produces({MediaType.APPLICATION_JSON})
	// DataType(AttributeType.class)
	// Path("/attributetypes")
	public getAttributeTypes(attributeTypeDescription: string, attributeCodeLabel: string): Observable<AttributeType[]> {
		const url = `${this.restUrl}`;
		let params = new HttpParams();
		if (!!attributeTypeDescription) {
			params.append("attributeTypeDescription", attributeTypeDescription);
		}
		if (!!attributeCodeLabel) {
			params.append("attributeCodeLabel", attributeCodeLabel);
		}
		return this.http.get<AttributeType[]>(url, {params}).pipe(
			tap(attributes => this.log(`fetched AttributeType list records: ${attributes.length}`)),
			catchError(this.handleError('getAttributeTypes', []))
		);
	}

	//POST
	//RequireSecurity(SecurityPermission.ADMIN_ATTRIBUTE_MANAGEMENT)
	//APIDescription("Adds a new attribute type")
	//Consumes({MediaType.APPLICATION_JSON})
	//Path("/attributetypes")
	public postAttributeType(attributeType: AttributeType, componentTypeRestrictions: ComponentTypeRestriction[], associatedComponentTypes: ComponentTypeRestriction[]): Observable<AttributeType> {

		const url = `${this.restUrl}/attributetypes`;
		return this.http.post<AttributeType>(url, {
			attributeType: attributeType,
			componentTypeRestrictions: componentTypeRestrictions,
			associatedComponentTypes: associatedComponentTypes
		}, httpOptions).pipe(
			map(attType => {
				return attType;
			}),
			tap(_ => this.log(`postAttributeType`)),
			catchError(this.handleError<any>('postAttributeType'))
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
