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
import {ComponentTypeRestriction} from './component-type-restriction';
import {StandardEntity} from './standard-entity';

export class AttributeType extends StandardEntity{
	public attributeType: string;
	public description: string;
	public detailedDescription: string;
	public visibleFlg: boolean;
	public requiredFlg: boolean;
	public requiredRestrictions: ComponentTypeRestriction[];
	public associatedComponentTypes: ComponentTypeRestriction[];
	public architectureFlg: boolean;
	public importantFlg: boolean;
	public allowMultipleFlg: boolean;
	public hideOnSubmission: boolean;
	public allowUserGeneratedCodes: boolean;
	public defaultAttributeCode: string;
	public attributeValueType: string;
}