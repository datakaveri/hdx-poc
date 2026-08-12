<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username'); section>
    <#if section = "header">
        <span class="kc-page-title-block page-header-padded" style="display: block;">
            Reset password
        </span>
    <#elseif section = "form">
        <div id="kc-form">
            <div id="kc-form-wrapper">
                <p id="kc-info-message">
                    Enter your email to reset your password.
                </p>
                <form id="kc-reset-password-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">
                    <div class="${properties.kcFormGroupClass!}">
                        <label for="username" class="${properties.kcLabelClass!}">Email</label>

                        <input type="text" id="username" name="username" class="${properties.kcInputClass!}"
                               autofocus value="${(auth.attemptedUsername!'')}"
                               aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"
                               placeholder="Enter Email"
                        />

                        <#if messagesPerField.existsError('username')>
                            <span id="input-error-username" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                ${kcSanitize(messagesPerField.get('username'))?no_esc}
                            </span>
                        </#if>
                    </div>

                    <div class="${properties.kcFormGroupClass!} ${properties.kcFormSettingClass!}">
                        <div id="kc-form-options">
                            <div class="${properties.kcFormOptionsWrapperClass!}">
                                <span><a href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a></span>
                            </div>
                        </div>
                    </div>

                    <div id="kc-form-buttons" class="${properties.kcFormGroupClass!}">
                        <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doSubmit")}"/>
                    </div>
                </form>
            </div>
        </div>

        <script>
        document.addEventListener("DOMContentLoaded", function () {
            const form = document.getElementById("kc-reset-password-form");
            const usernameInput = document.getElementById("username");

            function isValidEmail(email) {
                if (!email) return false;
                // Minimum validation: must contain @ and .
                return email.includes("@") && email.includes(".");
            }

            function showFieldError(input, message, errorId) {
                if (!input) return;

                let errorSpan = document.getElementById(errorId);
                if (!errorSpan) {
                    errorSpan = document.createElement("span");
                    errorSpan.id = errorId;
                    errorSpan.className = "${properties.kcInputErrorMessageClass!}";
                    errorSpan.style.display = "block";
                    errorSpan.style.fontSize = "12px";
                    errorSpan.setAttribute("role", "alert");
                    input.parentElement.appendChild(errorSpan);
                }

                errorSpan.textContent = message;
                input.setAttribute("aria-invalid", "true");
            }

            function clearFieldError(input, errorId) {
                if (!input) return;

                const errorSpan = document.getElementById(errorId);
                if (errorSpan && errorSpan.parentElement) {
                    errorSpan.parentElement.removeChild(errorSpan);
                }
                input.removeAttribute("aria-invalid");
            }

            // Real-time validation
            if (usernameInput) {
                usernameInput.addEventListener("input", function () {
                    const value = this.value.trim();
                    if (value && !isValidEmail(value)) {
                        showFieldError(this, "Email must contain @", "custom-error-email-format");
                    } else {
                        clearFieldError(this, "custom-error-email-format");
                    }
                });
            }

            // Form submission validation
            if (form) {
                form.addEventListener("submit", function (event) {
                    if (!usernameInput) return;

                    const value = usernameInput.value.trim();
                    if (value && !isValidEmail(value)) {
                        showFieldError(usernameInput, "Email must contain @", "custom-error-email-format");
                        event.preventDefault();
                        usernameInput.focus();
                        return false;
                    } else {
                        clearFieldError(usernameInput, "custom-error-email-format");
                    }
                });
            }
        });
        </script>
    </#if>
</@layout.registrationLayout>