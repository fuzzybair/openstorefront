import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SelectItem} from 'primeng/primeng';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {LookupTypeService} from '../services/lookup-type.service';
import {AttributeService} from '../services/attribute.service';

import {AttributeType} from '../models/attribute-type';
import {LookupEntity} from '../models/lookup-entity';
import {ComponentTypeRestriction} from '../models/component-type-restriction';
import {StandardEntity} from '../models/standard-entity';

@Component({
	selector: 'app-add-attribute',
	templateUrl: './add-attribute.component.html',
	styleUrls: ['./add-attribute.component.css']
})
export class AddAttributeComponent implements OnInit {

	@Input()
	public visible: boolean = false;
	@Input()
	set name(name: string) {
		this._name = (name && name.trim()) || '<no name set>';
	}

	get name(): string {return this._name;}


	public data: AttributeType = new AttributeType();
	public componentTypeRestrictions: ComponentTypeRestriction[] = [];
	public associatedComponentTypes: ComponentTypeRestriction[] = [];


	public attributeValueTypes: SelectItem[] = [];
	public allEntryTypes: boolean;

	private _name: string;

	@Output() close: EventEmitter<AttributeType> = new EventEmitter();
	constructor(private lookupService: LookupTypeService, private attribueService: AttributeService) {}

	ngOnInit() {
		this.lookupService.getEntityValues("AttributeValueType").subscribe(
			data => {
				for (let item of data) {
					this.attributeValueTypes.push({label: item.description, value: item.code}, );
				}
			});
	}
	save() {
		this.log("save");
		debugger;
		this.attribueService.postAttributeType(this.data, this.componentTypeRestrictions, this.associatedComponentTypes).subscribe(
			result => {
				this.close.emit(result);
			},
			error => {
				this.log(error);
			});
	}
	cancel() {
		this.log("cancel");
		this.close.emit(undefined);
	}

	private log(message: any) {
		console.log(message);
	}
}
