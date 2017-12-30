import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SelectItem} from 'primeng/primeng';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {LookupTypeService} from '../services/lookup-type.service';
import {AttributeService} from '../services/attribute.service';

import {AttributeType} from '../models/attribute-type';
import {LookupEntity} from '../models/lookup-entity';
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
	public attributeValueTypes: SelectItem[] = [];
	public allEntryTypes : boolean;

	private _name: string;

	@Output() close: EventEmitter<string> = new EventEmitter();
	constructor(private lookupService: LookupTypeService, private attribueService: AttributeService) {}

	ngOnInit() {
		this.lookupService.getEntityValues("AttributeValueType").subscribe(
			data => {
				for(let item of data)
				{
					this.attributeValueTypes.push({label: item.description, value: item.code},);
				}
			});
	}
	save() {
		this.log("save");
		this.close.emit(name);
	}
	cancel() {
		this.log("cancel");
		this.close.emit(name);
	}
	submit() {
		this.log("submit");
		this.close.emit(name);
	}
	private log(message: any) {
		console.log(message);
		//this.messageService.add('HeroService: ' + message);
	}
}
