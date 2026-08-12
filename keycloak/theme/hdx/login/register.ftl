<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('firstName','lastName','email','username','password','password-confirm') isRegisterPage=true; section>
    <#if section = "header">
        <span style="display: block;">Register <span class="maha-black">for HDX</span></span>
    <#elseif section = "form">
        <form id="kc-register-form" class="${properties.kcFormClass!} custom-form" action="${url.registrationAction}" method="post">
        <div class='form-col'>
            <div class="${properties.kcFormGroupClassCustom!}">
                <div class="${properties.kcLabelWrapperClassCustom!}">
                    <label for="firstName" class="${properties.kcLabelClass!}">${msg("firstName")}</label>
                </div>
                <div class="${properties.kcInputWrapperClass!}">
                    <input type="text" id="firstName" class="${properties.kcInputClass!}" name="firstName"
                        value="${(register.formData.firstName!'')}"
                        aria-invalid="<#if messagesPerField.existsError('firstName')>true</#if>"
                        placeholder="Enter First name" />

                    <#if messagesPerField.existsError('firstName')>
                        <span id="input-error-firstname" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('firstName'))?no_esc}
                        </span>
                    </#if>
                </div>
            </div>

            <div class="${properties.kcFormGroupClassCustom!}">
                <div class="${properties.kcLabelWrapperClassCustom!}">
                    <label for="lastName" class="${properties.kcLabelClass!}">${msg("lastName")}</label>
                </div>
                <div class="${properties.kcInputWrapperClass!}">
                    <input type="text" id="lastName" class="${properties.kcInputClass!}" name="lastName"
                        value="${(register.formData.lastName!'')}"
                        aria-invalid="<#if messagesPerField.existsError('lastName')>true</#if>"
                        placeholder="Enter last name" />

                    <#if messagesPerField.existsError('lastName')>
                        <span id="input-error-lastname" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('lastName'))?no_esc}
                        </span>
                    </#if>
                </div>
            </div>
        </div>

        <div id='form-col-full' class="${properties.kcFormGroupClassCustom!}">
            <div class="${properties.kcLabelWrapperClassCustom!}">
                <label for="email" class="${properties.kcLabelClass!}">${msg("email")}</label>
            </div>
            <div class="${properties.kcInputWrapperClass!}">
                <input type="email" id="email" class="${properties.kcInputClass!}" name="email"
                    value="${(register.formData.email!'')}" autocomplete="email"
                    aria-invalid="<#if messagesPerField.existsError('email')>true</#if>"
                    placeholder="Enter Email ID" />

                <#if messagesPerField.existsError('email')>
                    <span id="input-error-email" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                        ${kcSanitize(messagesPerField.get('email'))?no_esc}
                    </span>
                </#if>
            </div>
        </div>

        <#if !realm.registrationEmailAsUsername>
            <div class="${properties.kcFormGroupClassCustom!}">
                <div class="${properties.kcLabelWrapperClassCustom!}">
                    <label for="username" class="${properties.kcLabelClass!}">${msg("username")}</label>
                </div>
                <div class="${properties.kcInputWrapperClass!}">
                    <input type="text" id="username" class="${properties.kcInputClass!}" name="username"
                        value="${(register.formData.username!'')}" autocomplete="username"
                        aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"
                        placeholder="Enter Username" />

                    <#if messagesPerField.existsError('username')>
                        <span id="input-error-username" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('username'))?no_esc}
                        </span>
                    </#if>
                </div>
            </div>
        </#if>

        <div class='form-col pb-3'>
            <#if passwordRequired??>
            <div class="${properties.kcFormGroupClassCustom!}" style="position: relative;">
                <div class="${properties.kcLabelWrapperClassCustom!}">
                    <label for="password" class="${properties.kcLabelClass!}">${msg("password")}</label>
                </div>
                <div style="position: relative;">
                    <input type="password" id="password" class="${properties.kcInputClass!}" name="password"
                        autocomplete="new-password"
                        aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>"
                        placeholder="Enter Password"
                        style="padding-right: 40px;" />
                    <button type="button" id="togglePassword" class="password-toggle-btn" aria-label="Show password"
                            style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: none; border: none; cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; z-index: 10;">
                        <svg width="20" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" style="stroke: #6B7280; stroke-width: 1.5;">
                            <path d="M1.33398 8.49992C1.33398 8.49992 3.33398 3.83325 8.00065 3.83325C12.6673 3.83325 14.6673 8.49992 14.6673 8.49992C14.6673 8.49992 12.6673 13.1666 8.00065 13.1666C3.33398 13.1666 1.33398 8.49992 1.33398 8.49992Z" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 10.5C9.10457 10.5 10 9.60457 10 8.5C10 7.39543 9.10457 6.5 8 6.5C6.89543 6.5 6 7.39543 6 8.5C6 9.60457 6.89543 10.5 8 10.5Z" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div id="password-requirements" style="margin-top: 8px; font-size: 12px; color: #666; display: none;">
                    <div id="req-length" class="requirement" style="margin: 4px 0;">
                        <span class="req-icon" style="margin-right: 5px;">○</span>
                        <span>8-20 characters</span>
                    </div>
                    <div id="req-lowercase" class="requirement" style="margin: 4px 0;">
                        <span class="req-icon" style="margin-right: 5px;">○</span>
                        <span>Contains lowercase letter</span>
                    </div>
                    <div id="req-uppercase" class="requirement" style="margin: 4px 0;">
                        <span class="req-icon" style="margin-right: 5px;">○</span>
                        <span>Contains uppercase letter</span>
                    </div>
                    <div id="req-number" class="requirement" style="margin: 4px 0;">
                        <span class="req-icon" style="margin-right: 5px;">○</span>
                        <span>Contains number</span>
                    </div>
                    <div id="req-special" class="requirement" style="margin: 4px 0;">
                        <span class="req-icon" style="margin-right: 5px;">○</span>
                        <span>Contains special character</span>
                    </div>
                </div>
                <#if messagesPerField.existsError('password')>
                        <span id="input-error-password" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('password'))?no_esc}
                        </span>
                    </#if>
            </div>

            <div class="${properties.kcFormGroupClassCustom!}" style="position: relative;">
                <div class="${properties.kcLabelWrapperClassCustom!}">
                    <label for="password-confirm" class="${properties.kcLabelClass!}">${msg("passwordConfirm")}</label>
                </div>
                <div style="position: relative;">
                    <input type="password" id="password-confirm" class="${properties.kcInputClass!}" name="password-confirm"
                        autocomplete="new-password"
                        placeholder="Enter Confirm password"
                        style="padding-right: 40px;" />
                    <button type="button" id="togglePasswordConfirm" class="password-toggle-btn" aria-label="Show password"
                            style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: none; border: none; cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; z-index: 10;">
                        <svg width="20" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" style="stroke: #6B7280; stroke-width: 1.5;">
                            <path d="M1.33398 8.49992C1.33398 8.49992 3.33398 3.83325 8.00065 3.83325C12.6673 3.83325 14.6673 8.49992 14.6673 8.49992C14.6673 8.49992 12.6673 13.1666 8.00065 13.1666C3.33398 13.1666 1.33398 8.49992 1.33398 8.49992Z" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 10.5C9.10457 10.5 10 9.60457 10 8.5C10 7.39543 9.10457 6.5 8 6.5C6.89543 6.5 6 7.39543 6 8.5C6 9.60457 6.89543 10.5 8 10.5Z" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <#if messagesPerField.existsError('password-confirm')>
                        <span id="input-error-password-confirm" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('password-confirm'))?no_esc}
                        </span>
                    </#if>
            </div>
            </#if>
        </div>
        <div class="${properties.kcFormGroupClass!}">
            <div class="${properties.kcInputWrapperClass!}">
                <label for="acceptTerms" class="checkbox-container" style="display: flex; align-items: flex-start; gap: 10px;padding-top:20px">
                    <input type="checkbox" id="acceptTerms" name="acceptTerms" required style="margin-top: 3px;">
                <span class="terms-text" style="font-size: 14px;">
                    I have read and agree with
                    <a id="termsLink" href="#">Terms of Service</a>
                    and
                    <a id="privacyLink" href="#">Privacy Policy</a>
                    of HDX.
                </span>
                </label>
                <#if messagesPerField.existsError('acceptTerms')>
                    <span id="input-error-acceptTerms" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                        ${kcSanitize(messagesPerField.get('acceptTerms'))?no_esc}
                    </span>
                </#if>
            </div>
        </div>

        <#if recaptchaRequired??>
            <div class="form-group">
                <div class="${properties.kcInputWrapperClass!}">
                    <div class="g-recaptcha" data-size="compact" data-sitekey="${recaptchaSiteKey}" style="padding-top: 20px"></div>
                </div>
            </div>
        </#if>

        <div class="${properties.kcFormGroupClass!} bottom-align">
            <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doRegister")}" />
            </div>
            <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                <div class="${properties.kcFormOptionsWrapperClass!}">
                    <span class="${properties.kcLoginHelperText}">${msg("kcLoginHelperText")}<a class="${properties.kcLoginText}" href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a></span>
                </div>
            </div>
        </div>
        </form>

        <script>
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
            setupPasswordToggle("togglePasswordConfirm", "password-confirm");
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
            } else if (e.target && e.target.id === "togglePasswordConfirm") {
                e.preventDefault();
                e.stopPropagation();
                const passwordConfirmInput = document.getElementById("password-confirm");
                if (passwordConfirmInput) {
                    passwordConfirmInput.type = passwordConfirmInput.type === "password" ? "text" : "password";
                }
            }
        }, true); // Use capture phase for better reliability
        
        document.addEventListener("DOMContentLoaded", function () {

            const baseErrorClassName = "${properties.kcInputErrorMessageClass!}";
            const errorClassName = baseErrorClassName + " custom-field-error";

            // Localized client-side invalid email message (falls back to English if not present)
            const clientInvalidEmailMessage = "${msg('clientInvalidEmailMessage')?js_string!"Please enter a valid email address."}";

            function isValidEmail(email) {
                if (!email) return false;
                // Minimum validation: must contain @ and .
                return email.includes("@") && email.includes(".");
            }

            function getContainer(input) {
                if (!input) {
                    return null;
                }

                if (input.type === "checkbox") {
                    const labelContainer = input.closest(".checkbox-container");
                    if (labelContainer && labelContainer.parentElement) {
                        return labelContainer.parentElement;
                    }
                    return input.parentElement;
                }

                return input.parentElement;
            }

            function showFieldError(input, message, errorId) {
                if (!input) {
                    return;
                }

                const container = getContainer(input);
                if (!container) {
                    return;
                }

                let errorSpan = document.getElementById(errorId);
                if (!errorSpan) {
                    errorSpan = document.createElement("span");
                    errorSpan.id = errorId;
                    errorSpan.className = errorClassName;
                    errorSpan.style.display = "block";
                    errorSpan.style.fontSize = "12px";
                    errorSpan.setAttribute("role", "alert");
                    container.appendChild(errorSpan);
                } else {
                    errorSpan.style.fontSize = "12px";
                }

                errorSpan.textContent = message;
                input.setAttribute("aria-invalid", "true");
            }

            function clearFieldError(input, errorId) {
                if (!input) {
                    return;
                }

                const errorSpan = document.getElementById(errorId);
                if (errorSpan && errorSpan.parentElement) {
                    errorSpan.parentElement.removeChild(errorSpan);
                }

                const container = getContainer(input);
                const classSelector = "." + baseErrorClassName.replace(/\s+/g, ".");
                const remainingErrors = container ? container.querySelectorAll(classSelector).length : 0;
                if (!container || remainingErrors === 0) {
                    input.removeAttribute("aria-invalid");
                }
            }

            const requiredFields = [
                    { id: "firstName", message: "Please enter your first name.", errorId: "custom-error-firstName" },
                    { id: "lastName", message: "Please enter your last name.", errorId: "custom-error-lastName" },
                    { id: "email", message: "Please enter your email address.", errorId: "custom-error-email" },
                    { id: "password", message: "Please enter a password.", errorId: "custom-error-password" },
                    { id: "password-confirm", message: "Please confirm your password.", errorId: "custom-error-password-confirm" },
                    { id: "acceptTerms", message: "You must accept the Terms of Service and Privacy Policy.", errorId: "custom-error-acceptTerms" }
            ];

            requiredFields.forEach(function (field) {
                const input = document.getElementById(field.id);

                if (!input) {
                    return;
                }

                const handler = function () {
                    const value = input.type === "checkbox" ? input.checked : input.value.trim();

                    if (value) {
                        clearFieldError(input, field.errorId);

                        // For email, also validate format in real-time and clear/show format-specific error
                        if (input.id === "email") {
                            if (!isValidEmail(value)) {
                                showFieldError(input, clientInvalidEmailMessage, "custom-error-email-format");
                            } else {
                                clearFieldError(input, "custom-error-email-format");
                            }
                        }

                        if (input.id === "password-confirm") {
                            clearFieldError(input, "custom-error-password-mismatch");
                        }
                    } else {
                        // If field becomes empty, ensure format-specific email error is cleared too
                        if (input.id === "email") {
                            clearFieldError(input, "custom-error-email-format");
                        }
                    }
                };

                if (input.type === "checkbox") {
                    input.addEventListener("change", handler);
                } else {
                    input.addEventListener("input", handler);
                    input.addEventListener("blur", handler);
                }
            });

            // Password validation
            const passwordInput = document.getElementById("password");
            const passwordConfirmInput = document.getElementById("password-confirm");
            const passwordRequirements = document.getElementById("password-requirements");
            const form = document.getElementById("kc-register-form");

            const requirements = {
                length: {
                    element: document.getElementById("req-length"),
                    test: (password) => password.length >= 8 && password.length <= 20
                },
                lowercase: {
                    element: document.getElementById("req-lowercase"),
                    test: (password) => /[a-z]/.test(password)
                },
                uppercase: {
                    element: document.getElementById("req-uppercase"),
                    test: (password) => /[A-Z]/.test(password)
                },
                number: {
                    element: document.getElementById("req-number"),
                    test: (password) => /[0-9]/.test(password)
                },
                special: {
                    element: document.getElementById("req-special"),
                    test: (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
                }
            };

            function validatePassword(password) {
                let allValid = true;
                
                for (const key in requirements) {
                    const req = requirements[key];
                    const isValid = req.test(password);
                    const icon = req.element.querySelector(".req-icon");
                    
                    if (isValid) {
                        req.element.classList.add("valid");
                        req.element.classList.remove("invalid", "attempted");
                        icon.textContent = "✓";
                    } else {
                        req.element.classList.add("invalid");
                        req.element.classList.remove("valid");
                        if (password.length > 0) {
                            req.element.classList.add("attempted");
                        } else {
                            req.element.classList.remove("attempted");
                        }
                        icon.textContent = password.length > 0 ? "✗" : "○";
                        allValid = false;
                    }
                }
                
                // Hide requirements div when all conditions are satisfied, show when not satisfied
                if (passwordRequirements && password.length > 0) {
                    if (allValid) {
                        passwordRequirements.style.display = "none";
                    } else {
                        passwordRequirements.style.display = "block";
                    }
                }
                
                return allValid;
            }

            // Real-time validation
            if (passwordInput) {
                passwordInput.addEventListener("input", function () {
                    const password = this.value;
                    
                    // Hide requirements if password is empty
                    if (passwordRequirements && password.length === 0) {
                        passwordRequirements.style.display = "none";
                    }
                    
                    // Validate password (will handle showing/hiding based on validity)
                    const isValid = validatePassword(password);
                    clearFieldError(passwordConfirmInput, "custom-error-password-mismatch");
                });
            }

            if (passwordConfirmInput) {
                const confirmHandler = function () {
                    if (passwordConfirmInput.value.trim()) {
                        clearFieldError(passwordConfirmInput, "custom-error-password-confirm");
                    }

                    if (passwordInput && passwordConfirmInput.value === passwordInput.value) {
                        clearFieldError(passwordConfirmInput, "custom-error-password-mismatch");
                    }
                };

                passwordConfirmInput.addEventListener("input", confirmHandler);
                passwordConfirmInput.addEventListener("blur", confirmHandler);
            }

            // Form submission validation
            if (form) {
                form.addEventListener("submit", function (event) {
                    let hasErrors = false;

                    requiredFields.forEach(function (field) {
                        const input = document.getElementById(field.id);

                        if (!input) {
                            return;
                        }

                        const value = input.type === "checkbox" ? input.checked : input.value.trim();

                        if (!value) {
                            showFieldError(input, field.message, field.errorId);
                            if (!hasErrors) {
                                input.focus();
                            }
                            hasErrors = true;
                        } else {
                            clearFieldError(input, field.errorId);
                        }
                    });

                    if (passwordInput && passwordConfirmInput && passwordInput.value && passwordConfirmInput.value && passwordInput.value !== passwordConfirmInput.value) {
                        showFieldError(passwordConfirmInput, "Passwords do not match.", "custom-error-password-mismatch");
                        if (!hasErrors) {
                            passwordConfirmInput.focus();
                        }
                        hasErrors = true;
                    } else if (passwordConfirmInput) {
                        clearFieldError(passwordConfirmInput, "custom-error-password-mismatch");
                    }

                    if (passwordInput) {
                        const passwordValid = validatePassword(passwordInput.value);
                        if (!passwordValid) {
                            passwordInput.setAttribute("aria-invalid", "true");
                            if (!hasErrors) {
                                passwordInput.focus();
                            }
                            hasErrors = true;
                        } else {
                            passwordInput.removeAttribute("aria-invalid");
                        }
                    }

                    // Additional email format validation on submit
                    const emailInput = document.getElementById('email');
                    if (emailInput) {
                        const emailVal = emailInput.value.trim();
                        if (emailVal && !isValidEmail(emailVal)) {
                            showFieldError(emailInput, clientInvalidEmailMessage, 'custom-error-email-format');
                            if (!hasErrors) {
                                emailInput.focus();
                            }
                            hasErrors = true;
                        }
                    }

                    if (hasErrors) {
                        event.preventDefault();
                        return false;
                    }
                });
            }
        });
        </script>
    </#if>
</@layout.registrationLayout>
