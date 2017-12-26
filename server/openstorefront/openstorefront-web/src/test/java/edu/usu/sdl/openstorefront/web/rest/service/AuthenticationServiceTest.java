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

import edu.usu.sdl.openstorefront.core.api.ServiceProxyFactory;
import edu.usu.sdl.openstorefront.core.entity.UserProfile;
import edu.usu.sdl.openstorefront.core.entity.UserRole;
import edu.usu.sdl.openstorefront.core.entity.UserTypeCode;
import edu.usu.sdl.openstorefront.service.manager.UserAgentManager;
import edu.usu.sdl.openstorefront.service.test.TestPersistenceService;
import edu.usu.sdl.openstorefront.web.rest.JerseyShiroTest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MultivaluedHashMap;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import org.junit.Assert;
import org.junit.Test;

/**
 *
 * @author kentb
 */
public class AuthenticationServiceTest extends JerseyShiroTest
{
	@Override
	protected Class<?> getRestClass()
	{
		return AuthenticationService.class;
	}
	@Test
	public void loginTest()
	{
		UserAgentManager.init();
		//Arrange
		
		TestPersistenceService persistenceService = ((TestPersistenceService) ServiceProxyFactory.getServiceProxy().getPersistenceService());
		UserProfile profile = new UserProfile();
		profile.setUsername("TestUser");
		persistenceService.addObjectWithId(UserProfile.class, "TestUser", profile);
		persistenceService.addObject(profile);
		UserTypeCode userTypeCode = new UserTypeCode();
		userTypeCode.setActiveStatus(UserTypeCode.ACTIVE_STATUS);
		userTypeCode.setCode(UserTypeCode.END_USER);
		List<UserTypeCode> results = Arrays.asList(userTypeCode);
		persistenceService.addQuery(UserTypeCode.class, results);
		persistenceService.addQuery(UserTypeCode.class, results);
		MultivaluedMap<String, String> idMap = new MultivaluedHashMap<>();
		idMap.add("username", "TestUser");
		idMap.add("password", "TestPass");
		persistenceService.addQuery(UserRole.class, new ArrayList<>());
		
		//Act
		Response response = target("v1/service/authentication/login")
				.request()
				.header(HttpHeaders.AUTHORIZATION, getBasicAuthHeader())
				.put(Entity.form(idMap));
		Assert.assertEquals(200, response.getStatus());
		UserAgentManager.cleanup();
	}
}
