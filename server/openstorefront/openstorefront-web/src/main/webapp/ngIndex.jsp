<%--
/* 
 * Copyright 2016 Space Dynamics Laboratory - Utah State University Research Foundation.
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
--%>
<%-- 
    Document   : ngIndex
    Created on : Dec 24, 2017, 4:47:03 PM
    Author     : kentb
--%>
<%@page import="edu.usu.sdl.openstorefront.core.entity.Branding"%>
<%@page import="edu.usu.sdl.openstorefront.service.ServiceProxy"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
	Branding branding = ServiceProxy.getProxy().getBrandingService().getCurrentBrandingView();
	request.setAttribute("branding", branding);
%>
<!DOCTYPE html>
<html>
    <head>
		<!-- ***USER-NOT-LOGIN*** -->
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="shortcut icon" href="${pageContext.request.contextPath}/appicon.png" type="image/x-icon">
		<link rel="icon" href="${pageContext.request.contextPath}/appicon.png" type="image/x-icon">
		<title>${branding.getApplicationName()}</title>
		<base href="${pageContext.request.contextPath}/">
	</head>
	<body>
	<app-root>Loading...</app-root>
	<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/ngApp/inline.bundle.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/ngApp/polyfills.bundle.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/ngApp/styles.bundle.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/ngApp/vendor.bundle.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/ngApp/main.bundle.js"></script>
</body>
</html>