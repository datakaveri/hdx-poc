<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false showAnotherWayIfPresent=true isLoginPage=false isRegisterPage=false>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" class="${properties.kcHtmlClass!}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <#if properties.meta?has_content>
        <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
        </#list>
    </#if>
    <title>HDX</title>
    <link rel="icon" type="image/png" href="${url.resourcesPath}/img/tab-image.png" />
    <link rel="shortcut icon" type="image/x-icon" href="${url.resourcesPath}/img/favicon.ico" />
    <link rel="apple-touch-icon" href="${url.resourcesPath}/img/tab-image.png" />
    <#if properties.stylesCommon?has_content>
        <#list properties.stylesCommon?split(' ') as style>
            <link href="${url.resourcesCommonPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.scripts?has_content>
        <#list properties.scripts?split(' ') as script>
            <script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <#if scripts??>
        <#list scripts as script>
            <script src="${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <style>
        /* Login nav item: orange hover, no underline */
        .login-btn .nav-link:hover,
        .login-btn a:hover {
            color: #f58120 !important;
            text-decoration: none !important;
            transform: none !important;
            background-color: transparent !important;
        }
        .login-btn .nav-link:hover::after,
        .login-btn a:hover::after {
            width: 0 !important;
            display: none !important;
        }
        .navbar-nav .login-btn .nav-link:hover {
            transform: none !important;
        }
        .navbar-nav .login-btn .nav-link:hover::after {
            width: 0 !important;
            display: none !important;
        }
        /* Remove register nav item hover effect */
        .register-btn .nav-link:hover,
        .register-btn a:hover {
            color: white !important;
            text-decoration: none !important;
            transform: none !important;
            background-color: transparent !important;
        }
        .register-btn .nav-link:hover::after,
        .register-btn a:hover::after {
            width: 0 !important;
            display: none !important;
        }
        .navbar-nav .register-btn .nav-link:hover {
            transform: none !important;
        }
        .navbar-nav .register-btn .nav-link:hover::after {
            width: 0 !important;
            display: none !important;
        }
        /* Resources dropdown - panel below nav item (per screenshot) */
        .resources-dropdown {
            min-width: 560px; border: none; border-radius: 12px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.1);
            padding: 1.25rem; margin-top: 0.5rem;
            background: #f8f9fa;
        }
        .resources-dropdown .resources-grid {
            display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
        }
        .resources-dropdown .resource-card {
            display: flex; flex-direction: column; align-items: flex-start;
            padding: 1.25rem 1.5rem;
            border: 0.5px solid transparent; border-radius: 10px;
            background: #fff;
            color: inherit; text-decoration: none;
            transition: border-color .6s, box-shadow .6s, color .6s;
            text-align: left;
        }
        .resources-dropdown .resource-card:hover {
            background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border-color: #283a89  ;
            color: inherit;
        }
        .resources-dropdown .resource-card:hover .resource-icon,
        .resources-dropdown .resource-card:hover .resource-title {
            color: #283a89 !important;
        }
        .resources-dropdown .resource-card .resource-header {
            display: flex; align-items: center; gap: 0.5rem;
            margin-bottom: 0.5rem;
        }
        .resources-dropdown .resource-card .resource-icon {
            flex-shrink: 0; color: #1f2937;
            display: inline-flex; align-items: center; justify-content: center;
        }
        .resources-dropdown .resource-card .resource-icon svg {
            stroke: currentColor;
        }
        .resources-dropdown .resource-card .resource-title {
            font-weight: 600; font-size: 0.9rem; color: #1f2937;
            margin: 0;
        }
        .resources-dropdown .resource-card .resource-desc {
            font-size: 0.8rem; color: #6b7280; margin: 0;
            line-height: 1.4;
        }
        .resources-nav-btn { border-radius: 8px; padding: 0.4rem 1rem; }
        .resources-nav-btn:hover { color: #fff !important; }
        .nav-item.dropdown.show .resources-nav-btn {
            background: #d1f7e0; color: #237e56 !important;
        }
        @media (max-width: 991px) {
            .resources-dropdown { min-width: auto; width: 100%; }
            .resources-dropdown .resources-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>


<body class="${properties.kcBodyClass!}">
<#-- navBasePath: from messages, then theme property, else '' (no public HDX marketing site yet) -->
<#assign navBasePath = (msg('navBasePath')!properties.navBasePath!'')?trim?replace('/$','','r')>
<nav class="navbar navbar-expand-lg w-100 bg-white">
     <#-- Logo: Realm Frontend URL or navBasePath from env.properties -->
     <a href="${realm.frontendUrl!navBasePath!''}" class="logo-container">
        <img
            src="${url.resourcesPath}/img/hdx-logo.svg"
            alt="HDX logo"
            class="logo-image"
        />

    </a>

     <!-- Hamburger menu for mobile/tablet -->
     <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileOffcanvas" aria-controls="mobileOffcanvas" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
     </button>

     <ul class="navbar-nav ms-auto d-none d-lg-block">
        <li class="nav-item ">
            <a id="nav-about" class="nav-link" href="${navBasePath!''}/about">About HDX</a>
        </li>
         <li class="nav-item">
            <a id="nav-datasets" class="nav-link" href="${navBasePath!''}/datasets">Datasets</a>
        </li>
        <li class="nav-item">
            <a id="nav-models" class="nav-link" href="${navBasePath!''}/models">Models</a>
        </li>
        <li class="nav-item ">
            <a id="nav-usecases" class="nav-link" href="${navBasePath!''}/usecases">Usecases</a>
        </li>
        <li class="nav-item">
            <a id="nav-sandbox" class="nav-link" href="${navBasePath!''}/sandbox">Sandbox</a>
        </li>
        <li class="nav-item">
            <a id="nav-leaderboard" class="nav-link" href="${navBasePath!''}/leadership">Leaderboard</a>
        </li>
         <li class="nav-item ">
            <a id="nav-challenges" class="nav-link" href="${navBasePath!''}/challenges">Challenges</a>
        </li>
        <li class="nav-item">
            <a id="nav-discussions" class="nav-link" href="${navBasePath!''}/discussions">Discussions</a>
        </li>
        <li class="nav-item dropdown">
            <a id="nav-resources" class="nav-link resources-nav-btn" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Resources</a>
            <div class="dropdown-menu dropdown-menu-end resources-dropdown" aria-labelledby="nav-resources">
                <div class="resources-grid">
                    <a href="${navBasePath!''}/toolsets" class="resource-card">
                        <div class="resource-header">
                            <span class="resource-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></span>
                            <span class="resource-title">Toolset</span>
                        </div>
                        <p class="resource-desc">Access tools and utilities for data processing and analysis.</p>
                    </a>
                    <a href="${navBasePath!''}/library" class="resource-card">
                        <div class="resource-header">
                            <span class="resource-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8"/></svg></span>
                            <span class="resource-title">Learning library</span>
                        </div>
                        <p class="resource-desc">Explore tutorials, guides, and learning resources to get started.</p>
                    </a>
                    <a href="${navBasePath!''}/contact" class="resource-card">
                        <div class="resource-header">
                            <span class="resource-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
                            <span class="resource-title">Contact Us</span>
                        </div>
                        <p class="resource-desc">Get in touch with the team for support and feedback.</p>
                    </a>
                </div>
            </div>
        </li>
         <#--  <li>
            <div class="menu-item-desktop">
				<button class="white-btn me-1">
					<img
						src="${url.resourcesPath}/img/search.svg"
						class="me-2"
					/>
					Search Datasets
				</button>
			</div>
        </li>  -->
        <#if !(isLoginPage?? && isLoginPage)>
            <li class="nav-item login-btn d-none d-lg-block">
                <a class="nav-link" href="${url.loginUrl}">Login</a>
            </li>
        </#if>
        <#if isLoginPage?? && isLoginPage>
            <li class="nav-item register-btn d-none d-lg-block">
                <a class="nav-link" href="${url.registrationUrl}">Register</a>
            </li>
        </#if> 

        
      </ul>

      <!-- Mobile offcanvas sidebar -->
      <div class="offcanvas offcanvas-end" tabindex="-1" id="mobileOffcanvas" aria-labelledby="mobileOffcanvasLabel">
        <div class="offcanvas-header">
          <button type="button" class="btn-close-custom" data-bs-dismiss="offcanvas" aria-label="Close">
            <span class="close-icon">✕</span>
          </button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav offcanvas-nav-list">
            <li class="nav-item">
              <a id="mobile-nav-about" class="nav-link" href="${navBasePath!''}/about">About HDX</a>
            </li>
            <li class="nav-item">
              <a id="mobile-nav-datasets" class="nav-link" href="${navBasePath!''}/datasets">Datasets</a>
            </li>
            <li class="nav-item">
              <a id="mobile-nav-models" class="nav-link" href="${navBasePath!''}/models">Models</a>
            </li>
            <li class="nav-item">
              <a id="mobile-nav-usecases" class="nav-link" href="${navBasePath!''}/usecases">Usecases</a>
            </li>
            <li class="nav-item">
              <a id="mobile-nav-sandbox" class="nav-link" href="${navBasePath!''}/sandbox">Sandbox</a>
            </li>
            <li class="nav-item">
              <a id="mobile-nav-leaderboard" class="nav-link" href="${navBasePath!''}/leadership">Leaderboard</a>
            </li>
            <li class="nav-item">
              <a id="mobile-nav-challenges" class="nav-link" href="${navBasePath!''}/challenges">Challenges</a>
            </li>
            <li class="nav-item">
              <a id="mobile-nav-discussions" class="nav-link" href="${navBasePath!''}/discussions">Discussions</a>
            </li>
            <li class="nav-item">
              <a id="mobile-nav-toolset" class="nav-link nav-link-with-trailer" href="${navBasePath!''}/toolsets"><span>Toolset</span></a>
            </li>
            <li class="nav-item">
              <a id="mobile-nav-library" class="nav-link nav-link-with-trailer" href="${navBasePath!''}/library"><span>Learning library</span></a>
            </li>
            <li class="nav-item">
              <a id="mobile-nav-contact" class="nav-link nav-link-with-trailer" href="${navBasePath!''}/contact"><span>Contact Us</span></a>
            </li>
          </ul>

          <!-- Mobile Login / Register CTA buttons -->
          <div class="offcanvas-cta-buttons">
            <#if !(isLoginPage?? && isLoginPage)>
              <a href="${url.loginUrl}" class="offcanvas-login-btn">Login</a>
            </#if>
            <#if isLoginPage?? && isLoginPage>
              <a href="${url.registrationUrl}" class="offcanvas-register-btn">Register</a>
            </#if>
          </div>
        </div>
      </div>

      
</nav>

<div class="${properties.kcLoginClass!}">
    <div class='row'>

        <div id='custom-card-pf' class="${properties.kcFormCardClass!} col-12 col-xl-6 bg-img">
            <header class="${properties.kcFormHeaderClass!} ">
                <#if realm.internationalizationEnabled  && locale.supported?size gt 1>
                    <div class="${properties.kcLocaleMainClass!}" id="kc-locale">
                        <div id="kc-locale-wrapper" class="${properties.kcLocaleWrapperClass!}">
                            <div id="kc-locale-dropdown" class="${properties.kcLocaleDropDownClass!}">
                                <a href="#" id="kc-current-locale-link">${locale.current}</a>
                                <ul class="${properties.kcLocaleListClass!}">
                                    <#list locale.supported as l>
                                        <li class="${properties.kcLocaleListItemClass!}">
                                            <a class="${properties.kcLocaleItemClass!}" href="${l.url}">${l.label}</a>
                                        </li>
                                    </#list>
                                </ul>
                            </div>
                        </div>
                    </div>
                </#if>

            <#if !(auth?has_content && auth.showUsername() && !auth.showResetCredentials())>
                <#if displayRequiredFields>
                    <div class="${properties.kcContentWrapperClass!}">
                        <div class="${properties.kcLabelWrapperClass!} subtitle">
                            <span class="subtitle"><span class="required">*</span> ${msg("requiredFields")}</span>
                        </div>
                        <div class="col-md-10">
                            <h1 id="kc-page-title"><#nested "header"></h1>
                        </div>
                        <div class="col-md-10">
                            <h1 id="kc-page-title"><#nested "header"></h1>
                        </div>
                    </div>
                <#else>
                    <h1 id="kc-page-title"><#nested "header"></h1>
                </#if>
            <#else>
                <#if displayRequiredFields>
                    <div class="${properties.kcContentWrapperClass!}">
                        <div class="${properties.kcLabelWrapperClass!} subtitle">
                            <span class="subtitle"><span class="required">*</span> ${msg("requiredFields")}</span>
                        </div>
                        <div class="col-md-10">
                            <#nested "show-username">
                            <div id="kc-username" class="${properties.kcFormGroupClass!}">
                                <label id="kc-attempted-username">${auth.attemptedUsername}</label>
                                <a id="reset-login" href="${url.loginRestartFlowUrl}">
                                    <div class="kc-login-tooltip">
                                        <i class="${properties.kcResetFlowIcon!}"></i>
                                        <span class="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                <#else>
                    <#nested "show-username">
                    <div id="kc-username" class="${properties.kcFormGroupClass!}">
                        <label id="kc-attempted-username">${auth.attemptedUsername}</label>
                        <a id="reset-login" href="${url.loginRestartFlowUrl}">
                            <div class="kc-login-tooltip">
                                <i class="${properties.kcResetFlowIcon!}"></i>
                                <span class="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
                            </div>
                        </a>
                    </div>
                </#if>
            </#if>
            </header>
            <div id="kc-content">
                <div id="custom-kc-content-wrapper">

                <#-- App-initiated actions should not see warning messages about the need to complete the action -->
                <#-- during login.                                                                               -->
                <#if displayMessage && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
                    <div class="alert-${message.type} ${properties.kcAlertClass!} pf-m-<#if message.type = 'error'>danger<#else>${message.type}</#if>">
                        <div class="pf-c-alert__icon">
                            <#if message.type = 'success'><span class="${properties.kcFeedbackSuccessIcon!}"></span></#if>
                            <#if message.type = 'warning'><span class="${properties.kcFeedbackWarningIcon!}"></span></#if>
                            <#if message.type = 'error'><span class="${properties.kcFeedbackErrorIcon!}"></span></#if>
                            <#if message.type = 'info'><span class="${properties.kcFeedbackInfoIcon!}"></span></#if>
                        </div>
                            <span class="${properties.kcAlertTitleClass!}">${kcSanitize(message.summary)?no_esc}</span>
                    </div>
                </#if>

                <#nested "form">

                    <#if auth?has_content && auth.showTryAnotherWayLink() && showAnotherWayIfPresent>
                        <form id="kc-select-try-another-way-form" action="${url.loginAction}" method="post">
                            <div class="${properties.kcFormGroupClass!}">
                                <input type="hidden" name="tryAnotherWay" value="on"/>
                                <a href="#" id="try-another-way"
                                onclick="document.forms['kc-select-try-another-way-form'].submit();return false;">${msg("doTryAnotherWay")}</a>
                            </div>
                        </form>
                    </#if>

                <#if displayInfo>
                    <div id="kc-info" class="${properties.kcSignUpClass!}">
                        <div id="kc-info-wrapper" class="${properties.kcInfoAreaWrapperClass!}">
                            <#nested "info">
                        </div>
                    </div>
                </#if>
                </div>
            </div>

        </div>
        
         <div class='col-12 col-md-6 p-0 d-none d-md-block images-row'>
            <div>
                <img class="video" src="${url.resourcesPath}/img/hero-image.jpg" alt="Banner" />
            </div>
        </div>
    </div>
  </div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>
</html>
</#macro>
