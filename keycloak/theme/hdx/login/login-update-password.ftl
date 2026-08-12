<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('password','password-confirm'); section>
    <#if section = "header">
        <span style="display: block;">${msg("updatePasswordTitle")}</span>
    <#elseif section = "form">
        <form id="custom-kc-passwd-update-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">
            <input type="text" id="username" name="username" value="${username}" autocomplete="username"
                   readonly="readonly" style="display:none;"/>
            <input type="password" id="password" name="password" autocomplete="current-password" style="display:none;"/>

            <div class="pw-update-form-group">
                <div class="label-wrapper">
                    <label for="password-new" class="${properties.kcLabelClass!}">${msg("passwordNew")}</label>
                </div>
                <div style="position: relative;">
                    <input type="password" id="password-new" name="password-new" class="${properties.kcInputClass!}"
                           autofocus autocomplete="new-password"
                           aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>"
                           placeholder="Enter new password"
                           style="padding-right: 40px;"
                    />
                    <button type="button" id="togglePasswordNew" class="password-toggle-btn"
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
            </div>

            <div class="pw-update-form-group">
                <div class="label-wrapper">
                    <label for="password-confirm" class="${properties.kcLabelClass!}">${msg("passwordConfirm")}</label>
                </div>
                <div class="label-wrapper">
                    <div style="position: relative;">
                        <input type="password" id="password-confirm" name="password-confirm"
                               class="${properties.kcInputClass!}"
                               autocomplete="new-password"
                               placeholder="Enter Confirm new password"
                               aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>"
                               style="padding-right: 40px;"
                        />
                        <button type="button" id="togglePasswordConfirm" class="password-toggle-btn"
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
            </div>
            <script>
            document.addEventListener("DOMContentLoaded", function () {
                const form = document.getElementById("custom-kc-passwd-update-form");
                const passwordInput = document.getElementById("password-new");
                const passwordConfirmInput = document.getElementById("password-confirm");
                const passwordRequirements = document.getElementById("password-requirements");
                const togglePasswordNew = document.getElementById("togglePasswordNew");
                const togglePasswordConfirm = document.getElementById("togglePasswordConfirm");

                const baseErrorClassName = "${properties.kcInputErrorMessageClass!}";
                const errorClassName = baseErrorClassName + " custom-field-error";

                // Password toggle functionality - matching login form implementation
                if (togglePasswordNew && passwordInput) {
                    togglePasswordNew.addEventListener("click", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        const isPassword = passwordInput.type === "password";
                        passwordInput.type = isPassword ? "text" : "password";
                    });
                }

                if (togglePasswordConfirm && passwordConfirmInput) {
                    togglePasswordConfirm.addEventListener("click", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        const isPassword = passwordConfirmInput.type === "password";
                        passwordConfirmInput.type = isPassword ? "text" : "password";
                    });
                }

                function getContainer(input) {
                    if (!input) {
                        return null;
                    }
                    return input.closest(".label-wrapper") || input.parentElement;
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
                        const icon = req.element ? req.element.querySelector(".req-icon") : null;
                        if (req.element) {
                            if (isValid) {
                                req.element.classList.add("valid");
                                req.element.classList.remove("invalid", "attempted");
                                if (icon) {
                                    icon.textContent = "✓";
                                }
                            } else {
                                req.element.classList.add("invalid");
                                req.element.classList.remove("valid");
                                if (password.length > 0) {
                                    req.element.classList.add("attempted");
                                } else {
                                    req.element.classList.remove("attempted");
                                }
                                if (icon) {
                                    icon.textContent = password.length > 0 ? "✗" : "○";
                                }
                                allValid = false;
                            }
                        }
                    }
                    // Hide requirements when all conditions satisfied, show when not (match register page behavior)
                    if (passwordRequirements && password.length > 0) {
                        if (allValid) {
                            passwordRequirements.style.display = "none";
                        } else {
                            passwordRequirements.style.display = "block";
                        }
                    }
                    return allValid;
                }

                if (passwordInput) {
                    passwordInput.addEventListener("input", function () {
                        if (passwordRequirements && this.value.length === 0) {
                            passwordRequirements.style.display = "none";
                        }
                        validatePassword(this.value);
                        clearFieldError(passwordInput, "custom-error-password");
                        if (passwordConfirmInput && passwordConfirmInput.value) {
                            clearFieldError(passwordConfirmInput, "custom-error-password-mismatch");
                        }
                    });
                    passwordInput.addEventListener("blur", function () {
                        if (!this.value.trim()) {
                            showFieldError(passwordInput, "Please enter a new password.", "custom-error-password");
                        }
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

                if (form) {
                    form.addEventListener("submit", function (event) {
                        let hasErrors = false;

                        if (!passwordInput || !passwordInput.value.trim()) {
                            showFieldError(passwordInput, "Please enter a new password.", "custom-error-password");
                            if (!hasErrors) {
                                passwordInput.focus();
                            }
                            hasErrors = true;
                        } else if (!validatePassword(passwordInput.value)) {
                            passwordInput.setAttribute("aria-invalid", "true");
                            if (!hasErrors) {
                                passwordInput.focus();
                            }
                            hasErrors = true;
                        }

                        if (!passwordConfirmInput || !passwordConfirmInput.value.trim()) {
                            showFieldError(passwordConfirmInput, "Please confirm your new password.", "custom-error-password-confirm");
                            if (!hasErrors) {
                                passwordConfirmInput.focus();
                            }
                            hasErrors = true;
                        } else if (passwordInput && passwordInput.value !== passwordConfirmInput.value) {
                            showFieldError(passwordConfirmInput, "Passwords do not match.", "custom-error-password-mismatch");
                            if (!hasErrors) {
                                passwordConfirmInput.focus();
                            }
                            hasErrors = true;
                        }

                        if (hasErrors) {
                            event.preventDefault();
                            return false;
                        }
                    });
                }
            });
            </script>
            <div class="pw-update-form-group">
                <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                    <div class="${properties.kcFormOptionsWrapperClass!}">
                        <#if isAppInitiatedAction??>
                            <div class="checkbox">
                                <label><input type="checkbox" id="logout-sessions" name="logout-sessions" value="on" checked> ${msg("logoutOtherSessions")}</label>
                            </div>
                        </#if>
                    </div>
                </div>

                <div id="custom-kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                    <#if isAppInitiatedAction??>
                        <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doSubmit")}" />
                    <#else>
                        <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doSubmit")}" />
                    </#if>
                </div>
            </div>
        </form>
    </#if>
</@layout.registrationLayout>