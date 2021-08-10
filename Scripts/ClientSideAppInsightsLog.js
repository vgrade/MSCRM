var thisEntity = window.NameSpace || {};
if (ApplicationInsights === "undefined") {
 var ApplicationInsights = {};
}

ApplicationInsights = {
 trackApplicationInsight: function (entityName, properties) {
 var appInsights = window.appInsights || function (config) { function i(config) { t[config] = function () { var i = arguments; t.queue.push(function () { t[config].apply(t, i) }) } } var t = { config: config }, u = document, e = window, o = "script", s = "AuthenticatedUserContext", h = "start", c = "stop", l = "Track", a = l + "Event", v = l + "Page", y = u.createElement(o), r, f; y.src = config.url || "https://az416426.vo.msecnd.net/scripts/a/ai.0.js"; u.getElementsByTagName(o)[0].parentNode.appendChild(y); try { t.cookie = u.cookie } catch (p) { } for (t.queue = [], t.version = "1.0", r = ["Event", "Exception", "Metric", "PageView", "Trace", "Dependency"]; r.length;) i("track" + r.pop()); return i("set" + s), i("clear" + s), i(h + a), i(c + a), i(h + v), i(c + v), i("flush"), config.disableExceptionTracking || (r = "onerror", i("_" + r), f = e[r], e[r] = function (config, i, u, e, o) { var s = f && f(config, i, u, e, o); return s !== !0 && t["_" + r](config, i, u, e, o), s }), t }(
 {
 instrumentationKey: "<Your_Application_Insights_Instrumenatation_Key_Here>"//Recommended not to hardcode here but bring it from configuration/Envirnment variable
 });
 window.appInsights = appInsights;

appInsights.trackPageView(entityName, Xrm.Utility.getGlobalContext().getClientUrl() , properties);
 }
}
 
//Add eventhandler in ms crm form on load of your form and pass execution context and entityName parameter
thisEntity.formOnLoad = function (executionContext,entityName) {
    "use strict";
var formContext = executionContext.getFormContext(); 
var operationType = '';
 if (formContext.ui.getFormType() == 1) { operationType = 'Create'; } else { operationType = 'Update'; }
var userSettings = Xrm.Utility.getGlobalContext().userSettings;
var properties = { User: userSettings.userName, ObjectId: formContext.data.entity.getId(), OperationType: operationType, TriggerEvent: 'Form Load' };
 ApplicationInsights.trackApplicationInsight(entityName, properties);
};

//Add eventhandler in ms crm form on save of your form and pass execution context and entityName parameter
thisEntity.formOnSave =function(executionContext,entityName)
{
var formContext = executionContext.getFormContext(); 
 var operationType = '';
 if (formContext.ui.getFormType() == 1) { operationType = 'Create'; } else { operationType = 'Update'; }
var userSettings = Xrm.Utility.getGlobalContext().userSettings;
var properties = { User: userSettings.userName, ObjectId: formContext.data.entity.getId(), OperationType: operationType, TriggerEvent: 'Form Save' };
 ApplicationInsights.trackApplicationInsight(entityName, properties);
};
