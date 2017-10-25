define("mvc/ui/error-modal",["exports","utils/localization"],function(a,e){"use strict";function t(a,e,t){return Galaxy.modal.show({title:e,body:a,closing_events:!0,buttons:{Ok:function(){Galaxy.modal.hide()}}}),Galaxy.modal.$el.addClass("error-modal"),t&&(Galaxy.modal.$(".error-details").add(Galaxy.modal.$('button:contains("Details")')).remove(),$("<div/>").addClass("error-details").hide().appendTo(Galaxy.modal.$(".modal-content")).append([$("<p/>").text(d),$("<pre/>").text(JSON.stringify(t,null,"  "))]),$('<button id="button-1" class="pull-left">'+(0,l.default)("Details")+"</button>").appendTo(Galaxy.modal.$(".buttons")).click(function(){Galaxy.modal.$(".error-details").toggle()})),Galaxy.modal}function o(a,e,o){if(a){if(a=(0,l.default)(a),e=(0,l.default)(e)||(0,l.default)("Error:"),window.Galaxy&&Galaxy.modal)return t(a,e,o);alert(e+"\n\n"+a),console.log("error details:",JSON.stringify(o))}}function r(a,e,t){return{raven:_.result(window.Raven,"lastEventId"),userAgent:navigator.userAgent,onLine:navigator.onLine,version:_.result(Galaxy.config,"version_major"),xhr:_.omit(e,_.functions(e)),options:_.omit(t,"xhr"),url:_.result(Galaxy.lastAjax,"url"),data:_.result(Galaxy.lastAjax,"data"),model:_.result(a,"toJSON",a+""),user:_.omit(_.result(Galaxy.user,"toJSON"),"email")}}Object.defineProperty(a,"__esModule",{value:!0});var l=function(a){return a&&a.__esModule?a:{default:a}}(e),n=(0,l.default)("Please contact a Galaxy administrator if the problem persists."),i=(0,l.default)("An error occurred while updating information with the server."),d=(0,l.default)("The following information can assist the developers in finding the source of the error:");a.default={errorModal:o,offlineErrorModal:function(){return o((0,l.default)("You appear to be offline. Please check your connection and try again."),(0,l.default)("Offline?"))},badGatewayErrorModal:function(){return o((0,l.default)("Galaxy is currently unreachable. Please try again in a few minutes.")+" "+n,(0,l.default)("Cannot connect to Galaxy"))},ajaxErrorModal:function(a,e,t,d,u){return d=d||i,o(d+=" "+n,u=u||(0,l.default)("An error occurred"),r(a,e,t))}}});
//# sourceMappingURL=../../../maps/mvc/ui/error-modal.js.map
