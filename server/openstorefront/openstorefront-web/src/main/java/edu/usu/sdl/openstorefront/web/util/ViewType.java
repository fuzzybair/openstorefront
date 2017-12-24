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
package edu.usu.sdl.openstorefront.web.util;

import edu.usu.sdl.openstorefront.common.manager.PropertiesManager;

/**
 * Map of Views for ExtJS/Angular
 *
 * @author kbair
 */
public enum ViewType
{
	LOGIN("login"),
	LANDING("landing");

	private final String viewName;

	private ViewType(String name)
	{
		String uiMode = PropertiesManager.getValue(PropertiesManager.KEY_UI_MODE);
		if (uiMode == null) {
			uiMode = "ExtJS";
		}
		switch (uiMode.toLowerCase()) {
			case "angular":
				viewName = getAngularPage(name);
				break;
			case "extjs":
			default:
				viewName = getExtJSPage(name);
				break;
		}
	}

	@Override
	public String toString()
	{
		return viewName;
	}

	private String getAngularPage(String name)
	{
		String page;
		switch (name.toLowerCase()) {
			case "login":
				page = "/ngIndex.jsp";
				break;
			case "landing":
				page = "/ngIndex.jsp";
				break;
			default:
				throw new IllegalArgumentException(name + " is not a valid ExtJs Page");
		}
		return page;
	}

	private String getExtJSPage(String name)
	{
		String page;
		switch (name.toLowerCase()) {
			case "login":
				page = "/login.jsp";
				break;
			case "landing":
				page = "/landing.jsp";
				break;
			default:
				throw new IllegalArgumentException(name + " is not a valid ExtJs Page");
		}
		return page;
	}
}
