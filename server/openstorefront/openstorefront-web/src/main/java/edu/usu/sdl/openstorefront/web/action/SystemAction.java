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
package edu.usu.sdl.openstorefront.web.action;

import edu.usu.sdl.openstorefront.service.manager.UserAgentManager;
import edu.usu.sdl.openstorefront.util.OpenStorefrontConstant;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.MediaType;
import net.sf.uadetector.ReadableUserAgent;
import net.sourceforge.stripes.action.HandlesEvent;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.action.StreamingResolution;

/**
 * System Actions
 *
 * @author dshurtleff
 */
public class SystemAction
		extends BaseAction
{

	private static final Logger log = Logger.getLogger(SystemAction.class.getName());

	@HandlesEvent("UserAgent")
	public Resolution userAgent()
	{
		return new StreamingResolution(MediaType.APPLICATION_JSON)
		{

			@Override
			protected void stream(HttpServletResponse response) throws Exception
			{
				ReadableUserAgent readableUserAgent = UserAgentManager.parse(getContext().getRequest().getHeader(OpenStorefrontConstant.HEADER_USER_AGENT));
				objectMapper.writeValue(response.getOutputStream(), readableUserAgent);
			}
		};
	}

	@HandlesEvent("AppVersion")
	public Resolution appVersion()
	{
		return new StreamingResolution("text/plain", getApplicationVersion());
	}

}
