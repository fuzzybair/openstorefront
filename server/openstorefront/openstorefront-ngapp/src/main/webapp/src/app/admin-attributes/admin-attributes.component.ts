import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/primeng';

import {Observable} from 'rxjs/Observable';

import {AttributeService} from '../services/attribute.service';
import {AttributeType} from '../models/attribute-type';

@Component({
	selector: 'app-admin-attributes',
	templateUrl: './admin-attributes.component.html',
	styleUrls: ['./admin-attributes.component.css']
})
export class AdminAttributesComponent implements OnInit {

	public pageTitle: string = "Manage Attributes";
	public pageToolTip: string = "Attributes are used to categorize components and other listings. They can be searched on and filtered. They represent the metadata for a listing. Attribute Types represent a category and a code represents a specific value. The data is linked by the type and code which allows for a simple change of the description.";
	public statuses: SelectItem[];
	public selectedStatus: string = "A";
	public attributeTypes : AttributeType[];
	constructor(private attribueService : AttributeService) {}

	ngOnInit() {
		this.statuses = [
			{label: "Active", value: "A"},
			{label: "Inactive", value: "I"}
		];
		this.getAttributeTypes(); 
	}
	getAttributeTypes(): void {
		this.attribueService.getAttributeTypes(undefined, undefined).subscribe(data => {
			this.attributeTypes = data;
		});
	}
}
