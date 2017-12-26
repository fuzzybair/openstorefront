/*
 * Copyright 2017 Space Dynamics Laboratory - Utah State University Research Foundation.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * See NOTICE.txt for more information.
 */
package edu.usu.sdl.openstorefront.web.rest.service;

import edu.usu.sdl.openstorefront.common.exception.OpenStorefrontRuntimeException;
import edu.usu.sdl.openstorefront.common.manager.PropertiesManager;
import edu.usu.sdl.openstorefront.common.util.NetworkUtil;
import edu.usu.sdl.openstorefront.core.annotation.APIDescription;
import edu.usu.sdl.openstorefront.core.entity.UserProfile;
import edu.usu.sdl.openstorefront.security.HeaderRealm;
import edu.usu.sdl.openstorefront.security.SecurityUtil;
import edu.usu.sdl.openstorefront.security.UserContext;
import edu.usu.sdl.openstorefront.web.model.LoginModel;
import edu.usu.sdl.openstorefront.web.rest.resource.BaseResource;
import edu.usu.sdl.openstorefront.web.util.ViewType;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;

/**
 *
 * @author kentb
 */
@Path("v1/service/authentication")
@APIDescription("Provides Authentication via REST endpoint")
public class AuthenticationService extends BaseResource
{

	private static final Logger LOG = Logger.getLogger(SecurityService.class.getName());

	@Context
	private HttpServletRequest httpRequest;

	@Context
	private HttpServletResponse httpResponse;

	private boolean remember;
	private String gotoPage;

	@PUT
	@APIDescription("Authenticates user")
	@Produces({MediaType.APPLICATION_JSON})
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Path("/login")
	public Response login(
			@FormParam("username") String username,
			@FormParam("password") String password)
	{
		try {
			Map<String, String> errors = new HashMap<>();

			org.apache.shiro.mgt.SecurityManager securityManager = SecurityUtils.getSecurityManager();
			if (securityManager instanceof DefaultWebSecurityManager) {
				DefaultWebSecurityManager webSecurityManager = (DefaultWebSecurityManager) securityManager;
				for (Realm realm : webSecurityManager.getRealms()) {
					if (realm instanceof HeaderRealm) {
						String startPage = startPage();
						if (startPage.toLowerCase().startsWith("http") == false) {
							startPage = httpRequest.getContextPath() + startPage;
						}
						// Return the token on the response
						LoginModel result = new LoginModel();
						result.setToken("1234");
						result.setUrl(startPage);
						return sendSingleEntityResponse(result);
					}
				}
			}

			Subject currentUser = SecurityUtils.getSubject();
			UsernamePasswordToken token = new UsernamePasswordToken(username, password);
			try {
				currentUser.login(token);
				UserProfile userProfile = new UserProfile();
				userProfile.setUsername(username);
				service.getUserService().handleLogin(userProfile, httpRequest, false);
				String startPage = startPage();
				if (startPage.toLowerCase().startsWith("http") == false) {
					startPage = httpRequest.getContextPath() + startPage;
				}
				// Return the token on the response
				LoginModel result = new LoginModel();
				result.setToken("1234");
				result.setUrl(startPage);
				return sendSingleEntityResponse(result);
			} catch (AuthenticationException uea) {
				//Keep in mind an attacker can create a DOS hitting accounts...ip logging is here to help trace that scenario.
				LOG.log(Level.WARNING, MessageFormat.format("{0} Failed to login. ip: {1}", username, NetworkUtil.getClientIp(httpRequest)));
				LOG.log(Level.FINEST, "Failed to login Details: ", uea);

				if (uea instanceof DisabledAccountException) {
					errors.put("username", uea.getMessage());
				} else {
					errors.put("username", "Unable to login. Check username and password.");
				}
			}
			return Response.status(Response.Status.FORBIDDEN).build();

		} catch (Exception e) {
			return Response.status(Response.Status.FORBIDDEN).build();
		}
	}

	@PUT
	@APIDescription("Clears Authentication token")
	@Produces({MediaType.APPLICATION_JSON})
	@Path("/logout")
	public Response logout()
	{
		//If the user is not logged in have them go back to login.
		//With the idam system it cause them to loop around to re-login
		//rather than going back to the logout.
		if (SecurityUtil.isLoggedIn() == false) {
			return sendSingleEntityResponse(null);
		}

		SecurityUtil.logout(httpRequest, httpResponse);

		String logoutUrl = PropertiesManager.getValue(PropertiesManager.KEY_LOGOUT_URL, ViewType.LOGIN.toString());
		if (StringUtils.isBlank(logoutUrl)) {
			logoutUrl = ViewType.LOGIN.toString();
		}
		if (logoutUrl.toLowerCase().startsWith("http")) {
			LoginModel result = new LoginModel();
			result.setUrl(logoutUrl);
			return sendSingleEntityResponse(result);
		} else {
			LoginModel result = new LoginModel();
			result.setUrl(logoutUrl);
			return sendSingleEntityResponse(result);
		}
	}

	private String startPage()
	{
		String startPage = ViewType.LOGIN.toString();

		UserContext userContext = SecurityUtil.getUserContext();
		if (userContext != null) {
			startPage = userContext.userLandingPage();
		}

		if (StringUtils.isNotBlank(gotoPage)) {
			try {
				startPage = URLDecoder.decode(gotoPage, "UTF-8");
			} catch (UnsupportedEncodingException ex) {
				throw new OpenStorefrontRuntimeException(ex);
			}
		}
		startPage = startPage.replace("Login.action", "");
		return startPage;
	}
}
