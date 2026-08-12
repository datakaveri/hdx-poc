<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
    <#if section = "header">
        <span style="display: block; padding-top: 50px;">${msg("emailVerifyTitle")}</span>
    <#elseif section = "form">
        <p id="${properties.instructionOne!}">${msg("emailVerifyInstruction1")}</p>
    <#elseif section = "info">
        <p id="${properties.instructionTwo!}">
            ${msg("emailVerifyInstruction2")}
            <br/>
            <a href="${url.loginAction}" id="resend-email-link">${msg("doClickHere")}</a> ${msg("emailVerifyInstruction3")}
        </p>
        <#-- Toaster: top middle, same design as reset-password -->
        <div id="verify-email-toaster" class="verify-email-toaster" role="alert" aria-live="polite" style="display: none;">
            <span class="verify-email-toaster-icon">✓</span>
            <span class="verify-email-toaster-message">Verify Email sent successfully to your registered email</span>
        </div>
        <style>
            .verify-email-toaster {
                position: fixed;
                top: 0;
                left: 50%;
                transform: translate(-50%, -100%);
                z-index: 9999;
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 14px 20px;
                min-width: 280px;
                max-width: 90vw;
                background: #283a89;
                color: #fff;
                font-size: 14px;
                font-weight: 500;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.1);
                transition: transform 0.35s ease-out;
            }
            .verify-email-toaster.show {
                transform: translate(-50%, 20px);
            }
            .verify-email-toaster-icon {
                flex-shrink: 0;
                width: 22px;
                height: 22px;
                background: rgba(255,255,255,0.25);
                border-radius: 50%;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
            }
            .verify-email-toaster-message {
                flex: 1;
            }
        </style>
        <script>
            (function() {
                var TOASTER_KEY = "showVerifyEmailToaster";
                function showVerifyEmailToaster() {
                    var toaster = document.getElementById("verify-email-toaster");
                    if (!toaster) return;
                    toaster.style.display = "flex";
                    requestAnimationFrame(function() {
                        toaster.classList.add("show");
                    });
                    setTimeout(function() {
                        toaster.classList.remove("show");
                        setTimeout(function() { toaster.style.display = "none"; }, 400);
                    }, 5000);
                }
                document.addEventListener("DOMContentLoaded", function () {
                    var resendLink = document.getElementById("resend-email-link");
                    if (resendLink) {
                        resendLink.addEventListener("click", function () {
                            try { sessionStorage.setItem(TOASTER_KEY, "1"); } catch (e) {}
                        });
                    }
                    try {
                        if (sessionStorage.getItem(TOASTER_KEY) === "1") {
                            sessionStorage.removeItem(TOASTER_KEY);
                            showVerifyEmailToaster();
                        }
                    } catch (e) {}
                });
            })();
        </script>
    </#if>
</@layout.registrationLayout>