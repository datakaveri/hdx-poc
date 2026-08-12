<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled?? isLoginPage=true; section>
    <#if section = "header">
        <span class="page-header-padded" style="display: block;">
            <span>Login <span class="maha-black">to HDX</span></span>
        </span>
    <#elseif section = "form">
    <div id="kc-form-444">
      <div id="kc-form-wrapper">
        <#if realm.password>
            <form id="kc-form-login" action="${url.loginAction}" method="post">
                <div class="${properties.kcFormGroupClass!}">
                    <label for="username" class="${properties.kcLabelClass!}"><#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("email")}<#else>${msg("email")}</#if></label>

                    <#if usernameEditDisabled??>
                        <input tabindex="1" id="username" class="${properties.kcInputClass!}" name="username" value="${(login.username!'')}" type="text" disabled placeholder="you@example.com" />
                    <#else>
                        <input tabindex="1" id="username" class="${properties.kcInputClass!}" name="username" value="${(login.username!'')}"  type="text"  autofocus autocomplete="email"
                            aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"
                            placeholder="you@example.com"

                        />
                    </#if>
                    
                    <#if messagesPerField.existsError('username')>
                        <span id="input-error-username" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('username'))?no_esc}
                        </span>
                    </#if>
                </div>

                <div class="${properties.kcFormGroupClass!}">
                    <label for="password" class="${properties.kcLabelClass!}">${msg("password")}</label>

                    <div style="position: relative;">
                        <input tabindex="2"
                            id="password"
                            class="${properties.kcInputClass!}"
                            name="password"
                            type="password"
                            autocomplete="off"
                            aria-invalid="<#if messagesPerField.existsError('password')>true</#if>"
                            placeholder="Enter your password"
                            style="padding-right: 40px;" />
                        <button type="button" id="togglePassword" class="password-toggle-btn" aria-label="Show password"
                                style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: none; border: none; cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; z-index: 10;">
                            <svg width="20" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" style="stroke: #6B7280; stroke-width: 1.5;">
                                <path d="M1.33398 8.49992C1.33398 8.49992 3.33398 3.83325 8.00065 3.83325C12.6673 3.83325 14.6673 8.49992 14.6673 8.49992C14.6673 8.49992 12.6673 13.1666 8.00065 13.1666C3.33398 13.1666 1.33398 8.49992 1.33398 8.49992Z" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8 10.5C9.10457 10.5 10 9.60457 10 8.5C10 7.39543 9.10457 6.5 8 6.5C6.89543 6.5 6 7.39543 6 8.5C6 9.60457 6.89543 10.5 8 10.5Z" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>

                    <#if messagesPerField.existsError('password')>
                        <span id="input-error-password" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('password'))?no_esc}
                        </span>
                    </#if>
                </div>

                <div class="${properties.kcFormGroupClass!} ${properties.kcFormSettingClass!}">
                    <div id="kc-form-options">
                        <#if realm.rememberMe && !usernameEditDisabled??>
                            <div class="checkbox">
                                <label>
                                    <#if login.rememberMe??>
                                        <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox" checked> ${msg("rememberMe")}
                                    <#else>
                                        <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox"> ${msg("rememberMe")}
                                    </#if>
                                </label>
                            </div>
                        </#if>
                        </div>
                        <div class="${properties.kcFormOptionsWrapperClass!}">
                            <#if realm.resetPasswordAllowed>
                                <a tabindex="5" href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a>
                            </#if>
                        </div>
                </div>


                <div class="bottom-align">
                    <div id="kc-form-buttons" class="${properties.kcFormGroupClass!}">
                        <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                        <input tabindex="4" class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!}" name="login" id="kc-login" type="submit" value="${msg("doLogIn")}"/>
                    </div>

                    
                        <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
                            <div id="kc-registration-container">
                                <div id="kc-registration">
                                    <span>${msg("noAccount")} <a tabindex="6"
                                        href="${url.registrationUrl}">${msg("doRegister")}</a></span>
                                </div>
                            </div>
                        </#if>
                </div>
            </form>
        </#if>
        </div>

        <#if realm.password && social.providers??>
            <div id="kc-social-providers" class="${properties.kcFormSocialAccountSectionClass!}">
                <ul class="${properties.kcFormSocialAccountListClass!} <#if social.providers?size gt 3>${properties.kcFormSocialAccountListGridClass!}</#if>">
                    <#list social.providers as p>
                        <a id="social-${p.alias}" class="${properties.kcFormSocialAccountListButtonClass!} <#if social.providers?size gt 3>${properties.kcFormSocialAccountGridItem!}</#if>"
                                type="button" href="${p.loginUrl}">
                            <#if p.iconClasses?has_content>
                                <i class="${properties.kcCommonLogoIdP!} ${p.iconClasses!}" aria-hidden="true"></i>
                                <span class="${properties.kcFormSocialAccountNameClass!} kc-social-icon-text">${p.displayName!}</span>
                            <#else>
                                <span class="${properties.kcFormSocialAccountNameClass!}">${p.displayName!}</span>
                            </#if>
                        </a>
                    </#list>
                </ul>
            </div>
        </#if>

    </div>
        </#if>

   
   

</@layout.registrationLayout>


<script>
  <#-- Store validation messages in JavaScript variables -->
  const loginMissingEmailMessage = "${msg("loginMissingEmailMessage")?js_string}";
  const loginMissingPasswordMessage = "${msg("loginMissingPasswordMessage")?js_string}";
  const kcInputErrorMessageClass = "${properties.kcInputErrorMessageClass!}";
  const kcFormGroupClass = "${properties.kcFormGroupClass!}";

  // Password toggle functionality - multiple approaches for maximum reliability
  function setupPasswordToggle(toggleId, inputId) {
    const toggleIcon = document.getElementById(toggleId);
    const input = document.getElementById(inputId);
    
    if (!toggleIcon || !input) {
      return false;
    }
    
    // Ensure icon is clickable
    toggleIcon.style.pointerEvents = "auto";
    toggleIcon.style.zIndex = "10";
    toggleIcon.style.cursor = "pointer";
    toggleIcon.setAttribute("role", "button");
    toggleIcon.setAttribute("tabindex", "0");
    
    // Remove existing listeners by cloning (prevents duplicates)
    const newToggle = toggleIcon.cloneNode(true);
    toggleIcon.parentNode.replaceChild(newToggle, toggleIcon);
    
    // Add click event
    newToggle.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      const currentInput = document.getElementById(inputId);
      if (currentInput) {
        currentInput.type = currentInput.type === "password" ? "text" : "password";
      }
    });
    
    // Add keyboard support for accessibility
    newToggle.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const currentInput = document.getElementById(inputId);
        if (currentInput) {
          currentInput.type = currentInput.type === "password" ? "text" : "password";
        }
      }
    });
    
    return true;
  }
  
  // Initialize on DOM ready
  function initPasswordToggles() {
    setupPasswordToggle("togglePassword", "password");
  }
  
  // Try multiple times to ensure it works
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      initPasswordToggles();
      // Retry after a short delay in case elements load asynchronously
      setTimeout(initPasswordToggles, 200);
    });
  } else {
    initPasswordToggles();
    setTimeout(initPasswordToggles, 200);
  }
  
  // Also use event delegation as fallback
  document.addEventListener("click", function(e) {
    if (e.target && e.target.id === "togglePassword") {
      e.preventDefault();
      e.stopPropagation();
      const passwordInput = document.getElementById("password");
      if (passwordInput) {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
      }
    }
  }, true); // Use capture phase for better reliability

  // Field validation functions
  function showFieldError(input, message, errorId) {
    // Remove existing error if any
    clearFieldError(input, errorId);
    
    // Set aria-invalid
    input.setAttribute("aria-invalid", "true");
    
    // Create error span
    const errorSpan = document.createElement("span");
    errorSpan.id = errorId;
    errorSpan.className = kcInputErrorMessageClass;
    errorSpan.setAttribute("aria-live", "polite");
    errorSpan.textContent = message;
    
    // Insert error message after the input field
    // For password field, insert after the wrapper div
    const wrapper = input.closest("div[style*='position: relative']");
    if (wrapper) {
      wrapper.parentNode.insertBefore(errorSpan, wrapper.nextSibling);
    } else {
      // For username field, insert after the input
      input.parentNode.insertBefore(errorSpan, input.nextSibling);
    }
  }

  function clearFieldError(input, errorId) {
    const existingError = document.getElementById(errorId);
    if (existingError) {
      existingError.remove();
    }
    if (input) {
      input.removeAttribute("aria-invalid");
    }
  }

  // Form validation on submit
  const loginForm = document.getElementById("kc-form-login");
  if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
      const usernameInput = document.getElementById("username");
      const passwordInput = document.getElementById("password");
      let hasError = false;

      // Validate username/email
      if (usernameInput && !usernameInput.disabled) {
        const usernameValue = usernameInput.value.trim();
        if (!usernameValue) {
          showFieldError(usernameInput, loginMissingEmailMessage, "custom-error-username");
          hasError = true;
        } else {
          clearFieldError(usernameInput, "custom-error-username");
        }
      }

      // Validate password
      if (passwordInput) {
        const passwordValue = passwordInput.value.trim();
        if (!passwordValue) {
          showFieldError(passwordInput, loginMissingPasswordMessage, "custom-error-password");
          hasError = true;
        } else {
          clearFieldError(passwordInput, "custom-error-password");
        }
      }

      if (hasError) {
        e.preventDefault();
        e.stopPropagation();
        // Focus on first error field
        if (usernameInput && !usernameInput.disabled && !usernameInput.value.trim()) {
          usernameInput.focus();
        } else if (passwordInput && !passwordInput.value.trim()) {
          passwordInput.focus();
        }
        return false;
      }
      
      // Disable login button to prevent double submission
      const loginButton = document.getElementById("kc-login");
      if (loginButton) {
        loginButton.disabled = true;
      }
    });

    // Clear errors on input
    const usernameInput = document.getElementById("username");
    if (usernameInput && !usernameInput.disabled) {
      usernameInput.addEventListener("input", function() {
        if (this.value.trim()) {
          clearFieldError(this, "custom-error-username");
        }
      });
    }

    const passwordInput = document.getElementById("password");
    if (passwordInput) {
      passwordInput.addEventListener("input", function() {
        if (this.value.trim()) {
          clearFieldError(this, "custom-error-password");
        }
      });
    }
  }
</script>
