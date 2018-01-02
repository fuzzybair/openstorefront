/*
 * Copyright 2014 Space Dynamics Laboratory - Utah State University Research Foundation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {StandardEntityView} from './standard-entity-view';
import {ComponentTag} from './component-tag';
import {SearchResultAttribute} from './search-result-attribute';

export class ComponentSearchView extends StandardEntityView {
	public listingType: string;
	public componentId: string;
	public name: string;
	public description: string;
	public parentComponentId: string;
	public guid: string;
	public organization: string;
	public version: string;
	public approvalState: string;
	public approvedUser: string;
	public articleAttributeType: string;
	public articleAttributeCode: string;
	public componentType: string;
	public componentTypeDescription: string;
	public componentIconId: string;
	public componentTypeIconUrl: string;
	public averageRating: number;
	public releaseDate: Date;
	public approvedDts: Date;
	public lastActivityDts: Date;
	public listingSecurityMarkingType: string;
	public listingSecurityMarkingDescription: string;
	public listingSecurityMarkingRank: number;
	public listingSecurityMarkingStyle: string;
	public searchScore: number;
	public dataSource: string;
	public dataSensitivity: string;
	public tags: ComponentTag[];
	public activeStatus: string;
	public createUser: string;
	public createDts: Date;
	public updateUser: string;
	public updateDts: Date;
	public attributes: SearchResultAttribute[];
}