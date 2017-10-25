define("mvc/toolshed/workflows-view",[],function(){"use strict";define(["mvc/toolshed/toolshed-model","mvc/toolshed/util"],function(o,t){return{Workflows:Backbone.View.extend({el:"#center",defaults:[{}],initialize:function(t){var e=this;this.model=new o.WorkflowTools,this.listenTo(this.model,"sync",this.render),this.model.fetch(),e.render()},render:function(o){var e=this,s=e.templateWorkflows,l=e.model.models;e.$el.html(s({title:"Workflows Missing Tools",workflows:l,queue:t.queueLength()})),$("#center").css("overflow","auto"),e.bindEvents()},bindEvents:function(){var o,e=this;$(".show_wf_repo").on("click",function(){var t=$(this).attr("data-toolids"),e=$(this).attr("data-shed"),s=Galaxy.root+"api/tool_shed/repository",l={tool_ids:t};$.get(s,l,function(t){o=t.repository.id;var s="repository/s/"+e.replace(/:/g,"%3a").replace(/\//g,"%2f")+"/r/"+t.repository.id;Backbone.history.navigate(s,{trigger:!0,replace:!0})})}),$(".queue_wf_repo").on("click",function(){var e=$(this),s=e.attr("data-toolids"),l=e.attr("data-shed"),a=Galaxy.root+"api/tool_shed/repository",r={tool_ids:s};$.get(a,r,function(s){o=s.repository.id,r={tool_shed_url:l,repository_id:o},$.get(a,r,function(o){var s=Object.keys(o.repository.metadata)[0],a=o.repository.metadata[s];a.tool_shed_url=l,t.addToQueue(a),e.remove()})})}),$("#from_workflow").on("click",e.loadWorkflows)},reDraw:function(o){this.$el.empty(),this.initialize(o)},templateWorkflows:_.template(['<div class="unified-panel-header" id="panel_header" unselectable="on">','<div class="unified-panel-header-inner"><%= title %></div>','<div class="unified-panel-header-inner" style="position: absolute; right: 5px; top: 0px;"><a href="#/queue">Repository Queue (<%= queue %>)</a></div>',"</div>",'<style type="text/css">',".workflow_names, .workflow_tools { list-style-type: none; } ul.workflow_tools, ul.workflow_names {  padding-left: 0px; }","</style>",'<table id="workflows_missing_tools" class="grid" border="0" cellpadding="2" cellspacing="2" width="100%">','<thead id="grid-table-header">',"<tr>",'<th class="datasetRow">Workflows</th>','<th class="datasetRow">Tool IDs</th>','<th class="datasetRow">Shed</th>','<th class="datasetRow">Name</th>','<th class="datasetRow">Owner</th>','<th class="datasetRow">Actions</th>',"</tr>","</thead>","<tbody>","<% _.each(workflows, function(workflow) { %>","<tr>",'<td class="datasetRow">','<ul class="workflow_names">','<% _.each(workflow.get("workflows"), function(name) { %>','<li class="workflow_names"><%= name %></li>',"<% }); %>","</ul>","</td>",'<td class="datasetRow">','<ul class="workflow_tools">','<% _.each(workflow.get("tools"), function(tool) { %>','<li class="workflow_tools"><%= tool %></li>',"<% }); %>","</ul>","</td>",'<td class="datasetRow"><%= workflow.get("shed") %></td>','<td class="datasetRow"><%= workflow.get("repository") %></td>','<td class="datasetRow"><%= workflow.get("owner") %></td>','<td class="datasetRow">','<ul class="workflow_tools">','<li class="workflow_tools">','<input type="button" class="show_wf_repo btn btn-primary" data-shed="<%= workflow.get("shed") %>" data-owner="<%= workflow.get("owner") %>" data-repo="<%= workflow.get("repository") %>" data-toolids="<%= workflow.get("tools").join(",") %>" value="Show Repository" /></li>',"</ul>","</td>","</tr>","<% }); %>","</ul>","</div>"].join(""))})}})});
//# sourceMappingURL=../../../maps/mvc/toolshed/workflows-view.js.map
