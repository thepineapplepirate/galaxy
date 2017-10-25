define("mvc/toolshed/categories-view",[],function(){"use strict";define(["mvc/toolshed/toolshed-model","mvc/toolshed/util"],function(e,t){return{CategoryView:Backbone.View.extend({el:"#center",defaults:{tool_shed:"https://toolshed.g2.bx.psu.edu/"},initialize:function(t){var o=t.tool_shed.replace(/\//g,"%2f");this.options=_.defaults(this.options||t,this.defaults),this.model=new e.Categories,this.listenTo(this.model,"sync",this.render),this.model.url=this.model.url+"?tool_shed_url="+this.options.tool_shed,this.model.tool_shed=o,this.model.fetch()},render:function(e){this.options=_.extend(this.options,e),this.options.categories=this.model.models,this.options.queue=t.queueLength();var o=this.templateCategoryList;this.$el.html(o(this.options)),$("#center").css("overflow","auto"),this.bindEvents()},bindEvents:function(){var e=this;require(["libs/jquery/jquery-ui"],function(){$("#search_box").autocomplete({source:function(o,i){var s=e.model.tool_shed.replace(/%2f/g,"/"),l=Galaxy.root+"api/tool_shed/search",r={term:o.term,tool_shed_url:s};$.post(l,r,function(e){console.log(e);var o=t.shedParser(e);i(o)})},minLength:3,select:function(t,o){var i=o.item.value,s=(Galaxy.root,e.model.tool_shed,"repository/s/"+e.model.tool_shed+"/r/"+i);Backbone.history.navigate(s,{trigger:!0,replace:!0})}})})},reDraw:function(e){this.$el.empty(),this.model.url=this.model.url+"?tool_shed_url="+this.options.tool_shed,this.initialize(e)},templateCategoryList:_.template(['<style type="text/css">',".ui-autocomplete { background-color: #fff; }","li.ui-menu-item { list-style-type: none; }","</style>",'<div class="unified-panel-header" id="panel_header" unselectable="on">','<div class="unified-panel-header-inner" style="layout: inline;">Categories in <%= tool_shed.replace(/%2f/g, "/") %></div>','<div class="unified-panel-header-inner" style="position: absolute; right: 5px; top: 0px;"><a href="#/queue">Repository Queue (<%= queue %>)</a></div>',"</div>",'<div class="unified-panel-body" id="list_categories">','<div id="standard-search" style="height: 2em; margin: 1em;">','<span class="ui-widget" >','<input class="search-box-input" id="search_box" data-shedurl="<%= tool_shed.replace(/%2f/g, "/") %>" name="search" placeholder="Search repositories by name or id" size="60" type="text" />',"</span>","</div>",'<div style="clear: both; margin-top: 1em;">','<table class="grid">','<thead id="grid-table-header">',"<tr>","<th>Name</th>","<th>Description</th>","<th>Repositories</th>","</tr>","</thead>","<% _.each(categories, function(category) { %>","<tr>","<td>",'<a href="#/category/s/<%= tool_shed %>/c/<%= category.get("id") %>"><%= category.get("name") %></a>',"</td>",'<td><%= category.get("description") %></td>','<td><%= category.get("repositories") %></td>',"</tr>","<% }); %>","</table>","</div>","</div>"].join(""))})}})});
//# sourceMappingURL=../../../maps/mvc/toolshed/categories-view.js.map
