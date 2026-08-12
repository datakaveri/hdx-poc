<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "header">
        <span style="display: block;">${msg("pageExpiredTitle")}</span>
    <#elseif section = "form">
        <p id="custom-instruction1" class="instruction">
            ${msg("pageExpiredMsg1")} <a id="loginRestartLink" href="${url.loginRestartFlowUrl}">${msg("doClickHere")}</a> .<br/>
            ${msg("pageExpiredMsg2")} <a id="loginContinueLink" href="${url.loginAction}">${msg("doClickHere")}</a> .
        </p>
    </#if>
</@layout.registrationLayout>
