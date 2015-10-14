/*
 * Copyright 2015 Space Dynamics Laboratory - Utah State University Research Foundation.
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
package edu.usu.sdl.openstorefront.web.rest.resource;

import edu.usu.sdl.openstorefront.core.annotation.APIDescription;
import edu.usu.sdl.openstorefront.core.annotation.DataType;
import edu.usu.sdl.openstorefront.core.entity.Branding;
import edu.usu.sdl.openstorefront.core.entity.TopicSearchItem;
import edu.usu.sdl.openstorefront.core.model.BrandingModel;
import edu.usu.sdl.openstorefront.core.view.BrandingView;
import edu.usu.sdl.openstorefront.doc.annotation.RequiredParam;
import edu.usu.sdl.openstorefront.doc.security.RequireAdmin;
import edu.usu.sdl.openstorefront.validation.ValidationModel;
import edu.usu.sdl.openstorefront.validation.ValidationResult;
import edu.usu.sdl.openstorefront.validation.ValidationUtil;
import java.net.URI;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author jlaw
 * @author dshurlteff
 */
@Path("v1/resource/branding")
@APIDescription("Branding endpoints for manipulating branding content.")
public class BrandingResource
		extends BaseResource
{

	@GET
	@RequireAdmin
	@APIDescription("Get's all brandings")
	@Produces({MediaType.APPLICATION_JSON})
	@DataType(Branding.class)
	public Response getBranding()
	{
		Branding branding = new Branding();
		List<Branding> brandings = branding.findByExample();

		GenericEntity<List<Branding>> entity = new GenericEntity<List<Branding>>(brandings)
		{
		};
		return sendSingleEntityResponse(entity);
	}

	@GET
	@APIDescription("Get's the current branding view")
	@Produces({MediaType.APPLICATION_JSON})
	@DataType(BrandingView.class)
	@Path("/current")
	public Response getCurrentBrandingView()
	{
		BrandingView brandingView = service.getBrandingService().getCurrentBrandingView();
		return sendSingleEntityResponse(brandingView);
	}

	@GET
	@APIDescription("Get the branding view from a given id")
	@Produces({MediaType.APPLICATION_JSON})
	@DataType(BrandingView.class)
	@Path("/{id}")
	public Response getBrandingView(
			@PathParam("id") String brandingId
	)
	{
		BrandingView brandingView = null;

		Branding branding = new Branding();
		branding.setBrandingId(brandingId);
		branding = branding.find();
		if (branding != null) {
			TopicSearchItem topicSearchItemExample = new TopicSearchItem();
			topicSearchItemExample.setBrandingId(brandingId);
			brandingView = BrandingView.toView(branding, topicSearchItemExample.findByExample());
		}
		return sendSingleEntityResponse(brandingView);
	}

	@POST
	@APIDescription("Saves branding")
	@RequireAdmin
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addTopicSearchItem(
			@RequiredParam BrandingModel brandingModel
	)
	{
		ValidationModel validationModel = new ValidationModel(brandingModel.getBranding());
		validationModel.setConsumeFieldsOnly(true);
		ValidationResult validationResult = ValidationUtil.validate(validationModel);

		for (TopicSearchItem topicSearchItem : brandingModel.getTopicSearchItems()) {
			validationModel = new ValidationModel(topicSearchItem);
			validationModel.setConsumeFieldsOnly(true);
			validationResult.merge(ValidationUtil.validate(validationModel));
		}
		if (validationResult.valid()) {
			brandingModel = service.getBrandingService().saveFullBanding(brandingModel);
			BrandingView view = BrandingView.toView(brandingModel.getBranding(), brandingModel.getTopicSearchItems());
			return Response.created(URI.create("v1/resource/branding/" + brandingModel.getBranding().getBrandingId())).entity(view).build();
		}
		return sendSingleEntityResponse(validationResult.toRestError());
	}

	@PUT
	@APIDescription("Set Branding as active")
	@RequireAdmin
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/current/default")
	public Response setCurrentBrandingToDefault()
	{
		service.getBrandingService().setBrandingAsCurrent(null);
		return getCurrentBrandingView();
	}

	@PUT
	@APIDescription("Set Branding as active")
	@RequireAdmin
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{id}/active")
	public Response setCurrentBranding(
			@PathParam("id") String brandingId
	)
	{
		Branding branding = new Branding();
		branding.setBrandingId(brandingId);
		branding = branding.find();
		if (branding != null) {
			service.getBrandingService().setBrandingAsCurrent(brandingId);
			branding = branding.find();
		}
		return sendSingleEntityResponse(branding);
	}

	@DELETE
	@RequireAdmin
	@APIDescription("Deletes branding and related data")
	@Path("/{id}")
	public void deleteTopicSearchItems(
			@PathParam("id") String brandingId
	)
	{
		service.getBrandingService().deleteBranding(brandingId);
	}

}
