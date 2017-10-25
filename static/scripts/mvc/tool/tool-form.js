define("mvc/tool/tool-form",["exports","utils/utils","mvc/ui/ui-misc","mvc/ui/ui-modal","mvc/tool/tool-form-base","mvc/webhooks"],function(e,t,o,i,a,l){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0});var s=r(t),n=r(o),d=r(i),u=r(a),f=r(l),c=Backbone.View.extend({initialize:function(e){var t=this;this.modal=parent.Galaxy.modal||new d.default.View,this.form=new u.default(s.default.merge({listen_to_history:!0,always_refresh:!1,buildmodel:function(e,o){var i=o.model.attributes,a="",l={},r=i.job_id;r?a=Galaxy.root+"api/jobs/"+r+"/build_for_rerun":(a=Galaxy.root+"api/tools/"+i.id+"/build",(l=$.extend({},Galaxy.params)).tool_id&&delete l.tool_id),i.version&&(l.tool_version=i.version),s.default.get({url:a,data:l,success:function(i){i.display?(o.model.set(i),t._customize(o),Galaxy.emit.debug("tool-form-base::_buildModel()","Initial tool model ready.",i),e.resolve()):window.location=Galaxy.root},error:function(t,a){var l=t&&t.err_msg||"Uncaught error.";401==a?window.location=Galaxy.root+"user/login?"+$.param({redirect:Galaxy.root+"?tool_id="+i.id}):o.$el.is(":empty")?o.$el.prepend(new n.default.Message({message:l,status:"danger",persistent:!0,large:!0}).$el):Galaxy.modal&&Galaxy.modal.show({title:"Tool request failed",body:l,buttons:{Close:function(){Galaxy.modal.hide()}}}),Galaxy.emit.debug("tool-form-base::_buildModel()","Initial tool model request failed.",t),e.reject()}})},postchange:function(e,t){var o={tool_id:t.model.get("id"),tool_version:t.model.get("version"),inputs:$.extend(!0,{},t.data.create())};t.wait(!0),Galaxy.emit.debug("tool-form::postchange()","Sending current state.",o),s.default.request({type:"POST",url:Galaxy.root+"api/tools/"+t.model.get("id")+"/build",data:o,success:function(o){t.update(o),t.wait(!1),Galaxy.emit.debug("tool-form::postchange()","Received new model.",o),e.resolve()},error:function(t){Galaxy.emit.debug("tool-form::postchange()","Refresh request failed.",t),e.reject()}})}},e)),this.deferred=this.form.deferred,this.setElement("<div/>"),this.$el.append(this.form.$el)},_customize:function(e){var t=this,o=e.model.attributes,i=new n.default.Button({icon:"fa-check",tooltip:"Execute: "+o.name+" ("+o.version+")",title:"Execute",cls:"btn btn-primary ui-clear-float",wait_cls:"btn btn-info ui-clear-float",onclick:function(){i.wait(),e.portlet.disable(),t.submit(o,function(){i.unwait(),e.portlet.enable()})}});o.buttons={execute:i},o.job_id&&o.job_remap&&o.inputs.push({label:"Resume dependencies from this job",name:"rerun_remap_job_id",type:"select",display:"radio",ignore:"__ignore__",value:"__ignore__",options:[["Yes",o.job_id],["No","__ignore__"]],help:"The previous run of this tool failed and other tools were waiting for it to finish successfully. Use this option to resume those tools using the new output(s) of this tool run."})},submit:function(e,t){var o=this,i={tool_id:e.id,tool_version:e.version,inputs:this.form.data.create()};if(this.form.trigger("reset"),!o.validate(i))return Galaxy.emit.debug("tool-form::submit()","Submission canceled. Validation failed."),void(t&&t());if(e.action!==Galaxy.root+"tool_runner/index"){var a=$("<form/>").attr({action:e.action,method:e.method,enctype:e.enctype});return _.each(i.inputs,function(e,t){a.append($("<input/>").attr({name:t,value:e}))}),a.hide().appendTo("body").submit().remove(),void(t&&t())}Galaxy.emit.debug("tool-form::submit()","Validation complete.",i),s.default.request({type:"POST",url:Galaxy.root+"api/tools",data:i,success:function(e){if(t&&t(),o.$el.children().hide(),o.$el.append(o._templateSuccess(e)),e.jobs&&e.jobs.length>0){o.$el.append($("<div/>",{id:"webhook-view"}));new f.default.WebhookView({urlRoot:Galaxy.root+"api/webhooks/tool",toolId:i.tool_id})}parent.Galaxy&&parent.Galaxy.currHistoryPanel&&parent.Galaxy.currHistoryPanel.refreshContents()},error:function(e){t&&t(),Galaxy.emit.debug("tool-form::submit","Submission failed.",e);var a=!1;if(e&&e.err_data){var l=o.form.data.matchResponse(e.err_data);for(var r in l){o.form.highlight(r,l[r]),a=!0;break}}a||o.modal.show({title:"Job submission failed",body:o._templateError(i,e&&e.err_msg),buttons:{Close:function(){o.modal.hide()}}})}})},validate:function(e){var t=e.inputs,o=-1,i=null;for(var a in t){var l=t[a],r=this.form.data.match(a),s=this.form.field_list[r],n=this.form.input_list[r];if(r&&n&&s){if(!n.optional&&null==l)return this.form.highlight(r),!1;if(l&&l.batch){var d=l.values.length,u=d>0&&l.values[0]&&l.values[0].src;if(u)if(null===i)i=u;else if(i!==u)return this.form.highlight(r,"Please select either dataset or dataset list fields for all batch mode fields."),!1;if(-1===o)o=d;else if(o!==d)return this.form.highlight(r,"Please make sure that you select the same number of inputs for all batch mode fields. This field contains <b>"+d+"</b> selection(s) while a previous field contains <b>"+o+"</b>."),!1}}else Galaxy.emit.debug("tool-form::validate()","Retrieving input objects failed.")}return!0},_templateSuccess:function(e){if(e.jobs&&e.jobs.length>0){var t=e.jobs.length,o=1==t?"1 job has":t+" jobs have",i=$("<div/>").addClass("donemessagelarge").append($("<p/>").text(o+" been successfully added to the queue - resulting in the following datasets:"));return _.each(e.outputs,function(e){i.append($("<p/>").addClass("messagerow").append($("<b/>").text(e.hid+": "+e.name)))}),i.append($("<p/>").append("<b/>").text("You can check the status of queued jobs and view the resulting data by refreshing the History pane. When the job has been run the status will change from 'running' to 'finished' if completed successfully or 'error' if problems were encountered.")),i}return this._templateError(e,"Invalid success response. No jobs found.")},_templateError:function(e,t){return $("<div/>").addClass("errormessagelarge").append($("<p/>").text("The server could not complete the request. Please contact the Galaxy Team if this error persists. "+(t||""))).append($("<pre/>").text(JSON.stringify(e,null,4)))}});e.default={View:c}});
//# sourceMappingURL=../../../maps/mvc/tool/tool-form.js.map
