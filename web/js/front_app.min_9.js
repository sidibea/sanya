/*! AdminLTE app.js
 * ================
 * Main JS application file for AdminLTE v2. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive AdminLTE plugins.
 *
 * @Author  Almsaeed Studio
 * @Support <http://www.almsaeedstudio.com>
 * @Email   <support@almsaeedstudio.com>
 * @version 2.0.4
 * @license MIT <http://opensource.org/licenses/MIT>
 */
;"use strict";if("undefined"==typeof jQuery){throw new Error("AdminLTE requires jQuery")}$.AdminLTE={},$.AdminLTE.options={navbarMenuSlimscroll:!0,navbarMenuSlimscrollWidth:"3px",navbarMenuHeight:"200px",sidebarToggleSelector:"[data-toggle='offcanvas']",sidebarPushMenu:!0,sidebarSlimScroll:!0,enableBoxRefresh:!0,enableBSToppltip:!0,BSTooltipSelector:"[data-toggle='tooltip']",enableFastclick:!0,enableBoxWidget:!0,boxWidgetOptions:{boxWidgetIcons:{collapse:"fa fa-minus",open:"fa fa-plus",remove:"fa fa-times"},boxWidgetSelectors:{remove:'[data-widget="remove"]',collapse:'[data-widget="collapse"]'}},directChat:{enable:!0,contactToggleSelector:'[data-widget="chat-pane-toggle"]'},colors:{lightBlue:"#3c8dbc",red:"#f56954",green:"#00a65a",aqua:"#00c0ef",yellow:"#f39c12",blue:"#0073b7",navy:"#001F3F",teal:"#39CCCC",olive:"#3D9970",lime:"#01FF70",orange:"#FF851B",fuchsia:"#F012BE",purple:"#8E24AA",maroon:"#D81B60",black:"#222222",gray:"#d2d6de"},screenSizes:{xs:480,sm:768,md:992,lg:1200}},$(function(){var b=$.AdminLTE.options;$.AdminLTE.layout.activate(),$.AdminLTE.tree(".sidebar"),b.navbarMenuSlimscroll&&"undefined"!=typeof $.fn.slimscroll&&$(".navbar .menu").slimscroll({height:"200px",alwaysVisible:!1,size:"3px"}).css("width","100%"),b.sidebarPushMenu&&$.AdminLTE.pushMenu(b.sidebarToggleSelector),b.enableBSToppltip&&$(b.BSTooltipSelector).tooltip(),b.enableBoxWidget&&$.AdminLTE.boxWidget.activate(),b.enableFastclick&&"undefined"!=typeof FastClick&&FastClick.attach(document.body),b.directChat.enable&&$(b.directChat.contactToggleSelector).click(function(){var c=$(this).parents(".direct-chat").first();c.toggleClass("direct-chat-contacts-open")}),$('.btn-group[data-toggle="btn-toggle"]').each(function(){var c=$(this);$(this).find(".btn").click(function(a){c.find(".btn.active").removeClass("active"),$(this).addClass("active"),a.preventDefault()})})}),$.AdminLTE.layout={activate:function(){var b=this;b.fix(),b.fixSidebar(),$(window,".wrapper").resize(function(){b.fix(),b.fixSidebar()})},fix:function(){var e=$(".main-header").outerHeight()+$(".main-footer").outerHeight(),d=$(window).height(),f=$(".sidebar").height();$("body").hasClass("fixed")?$(".content-wrapper, .right-side").css("min-height",d-$(".main-footer").outerHeight()):d>=f?$(".content-wrapper, .right-side").css("min-height",d-e):$(".content-wrapper, .right-side").css("min-height",f)},fixSidebar:function(){return $("body").hasClass("fixed")?("undefined"==typeof $.fn.slimScroll&&console&&console.error("Error: the fixed layout requires the slimscroll plugin!"),void ($.AdminLTE.options.sidebarSlimScroll&&"undefined"!=typeof $.fn.slimScroll&&($(".sidebar").slimScroll({destroy:!0}).height("auto"),$(".sidebar").slimscroll({height:$(window).height()-$(".main-header").height()+"px",color:"rgba(0,0,0,0.2)",size:"3px"})))):void ("undefined"!=typeof $.fn.slimScroll&&$(".sidebar").slimScroll({destroy:!0}).height("auto"))}},$.AdminLTE.pushMenu=function(d){var c=this.options.screenSizes;$(d).click(function(b){b.preventDefault(),$(window).width()>c.sm-1?$("body").toggleClass("sidebar-collapse"):$("body").hasClass("sidebar-open")?($("body").removeClass("sidebar-open"),$("body").removeClass("sidebar-collapse")):$("body").addClass("sidebar-open")}),$(".content-wrapper").click(function(){$(window).width()<=c.sm-1&&$("body").hasClass("sidebar-open")&&$("body").removeClass("sidebar-open")})},$.AdminLTE.tree=function(d){var c=this;$("li a",$(d)).click(function(b){var l=$(this),k=l.next();if(k.is(".treeview-menu")&&k.is(":visible")){k.slideUp("normal",function(){k.removeClass("menu-open")}),k.parent("li").removeClass("active")}else{if(k.is(".treeview-menu")&&!k.is(":visible")){var j=l.parents("ul").first(),i=j.find("ul:visible").slideUp("normal");i.removeClass("menu-open");var h=l.parent("li");k.slideDown("normal",function(){k.addClass("menu-open"),j.find("li.active").removeClass("active"),h.addClass("active"),c.layout.fix()})}}k.is(".treeview-menu")&&b.preventDefault()})},$.AdminLTE.boxWidget={activate:function(){var d=$.AdminLTE.options,c=this;$(d.boxWidgetOptions.boxWidgetSelectors.collapse).click(function(b){b.preventDefault(),c.collapse($(this))}),$(d.boxWidgetOptions.boxWidgetSelectors.remove).click(function(b){b.preventDefault(),c.remove($(this))})},collapse:function(e){var d=e.parents(".box").first(),f=d.find(".box-body, .box-footer");d.hasClass("collapsed-box")?(e.children(".fa-plus").removeClass("fa-plus").addClass("fa-minus"),f.slideDown(300,function(){d.removeClass("collapsed-box")})):(e.children(".fa-minus").removeClass("fa-minus").addClass("fa-plus"),f.slideUp(300,function(){d.addClass("collapsed-box")}))},remove:function(d){var c=d.parents(".box").first();c.slideUp()},options:$.AdminLTE.options.boxWidgetOptions},function(b){b.fn.boxRefresh=function(a){function j(c){c.append(g),h.onLoadStart.call(c)}function i(c){c.find(g).remove(),h.onLoadDone.call(c)}var h=b.extend({trigger:".refresh-btn",source:"",onLoadStart:function(){},onLoadDone:function(){}},a),g=b('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');return this.each(function(){if(""===h.source){return void (console&&console.log("Please specify a source first - boxRefresh()"))}var c=b(this),d=c.find(h.trigger).first();d.click(function(e){e.preventDefault(),j(c),c.find(".box-body").load(h.source,function(){i(c)})})})}}(jQuery),function(b){b.fn.todolist=function(a){var d=b.extend({onCheck:function(){},onUncheck:function(){}},a);return this.each(function(){"undefined"!=typeof b.fn.iCheck?(b("input",this).on("ifChecked",function(){var c=b(this).parents("li").first();c.toggleClass("done"),d.onCheck.call(c)}),b("input",this).on("ifUnchecked",function(){var c=b(this).parents("li").first();c.toggleClass("done"),d.onUncheck.call(c)})):b("input",this).on("change",function(){var c=b(this).parents("li").first();c.toggleClass("done"),d.onCheck.call(c)})})}}(jQuery);