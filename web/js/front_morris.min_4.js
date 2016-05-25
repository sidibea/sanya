(function(){var r,q,p,o,n=[].slice,m=function(d,c){return function(){return d.apply(c,arguments)}},l={}.hasOwnProperty,k=function(f,e){function h(){this.constructor=f}for(var g in e){l.call(e,g)&&(f[g]=e[g])}return h.prototype=e.prototype,f.prototype=new h,f.__super__=e.prototype,f},j=[].indexOf||function(e){for(var d=0,f=this.length;f>d;d++){if(d in this&&this[d]===e){return d}}return -1};q=window.Morris={},r=jQuery,q.EventEmitter=function(){function b(){}return b.prototype.on=function(d,c){return null==this.handlers&&(this.handlers={}),null==this.handlers[d]&&(this.handlers[d]=[]),this.handlers[d].push(c),this},b.prototype.fire=function(){var i,e,w,v,u,t,s;if(w=arguments[0],i=2<=arguments.length?n.call(arguments,1):[],null!=this.handlers&&null!=this.handlers[w]){for(t=this.handlers[w],s=[],v=0,u=t.length;u>v;v++){e=t[v],s.push(e.apply(null,i))}return s}},b}(),q.commas=function(g){var f,s,i,h;return null!=g?(i=0>g?"-":"",f=Math.abs(g),s=Math.floor(f).toFixed(0),i+=s.replace(/(?=(?:\d{3})+$)(?!^)/g,","),h=f.toString(),h.length>s.length&&(i+=h.slice(s.length)),i):"-"},q.pad2=function(b){return(10>b?"0":"")+b},q.Grid=function(b){function a(d){this.resizeHandler=m(this.resizeHandler,this);var e=this;if(this.el="string"==typeof d.element?r(document.getElementById(d.element)):r(d.element),null==this.el||0===this.el.length){throw new Error("Graph container element not found")}"static"===this.el.css("position")&&this.el.css("position","relative"),this.options=r.extend({},this.gridDefaults,this.defaults||{},d),"string"==typeof this.options.units&&(this.options.postUnits=d.units),this.raphael=new Raphael(this.el[0]),this.elementWidth=null,this.elementHeight=null,this.dirty=!1,this.selectFrom=null,this.init&&this.init(),this.setData(this.options.data),this.el.bind("mousemove",function(h){var c,u,t,s,i;return u=e.el.offset(),i=h.pageX-u.left,e.selectFrom?(c=e.data[e.hitTest(Math.min(i,e.selectFrom))]._x,t=e.data[e.hitTest(Math.max(i,e.selectFrom))]._x,s=t-c,e.selectionRect.attr({x:c,width:s})):e.fire("hovermove",i,h.pageY-u.top)}),this.el.bind("mouseleave",function(){return e.selectFrom&&(e.selectionRect.hide(),e.selectFrom=null),e.fire("hoverout")}),this.el.bind("touchstart touchmove touchend",function(f){var c,g;return g=f.originalEvent.touches[0]||f.originalEvent.changedTouches[0],c=e.el.offset(),e.fire("hovermove",g.pageX-c.left,g.pageY-c.top)}),this.el.bind("click",function(f){var c;return c=e.el.offset(),e.fire("gridclick",f.pageX-c.left,f.pageY-c.top)}),this.options.rangeSelect&&(this.selectionRect=this.raphael.rect(0,0,0,this.el.innerHeight()).attr({fill:this.options.rangeSelectColor,stroke:!1}).toBack().hide(),this.el.bind("mousedown",function(f){var c;return c=e.el.offset(),e.startRange(f.pageX-c.left)}),this.el.bind("mouseup",function(f){var c;return c=e.el.offset(),e.endRange(f.pageX-c.left),e.fire("hovermove",f.pageX-c.left,f.pageY-c.top)})),this.options.resize&&r(window).bind("resize",function(){return null!=e.timeoutId&&window.clearTimeout(e.timeoutId),e.timeoutId=window.setTimeout(e.resizeHandler,100)}),this.el.css("-webkit-tap-highlight-color","rgba(0,0,0,0)"),this.postInit&&this.postInit()}return k(a,b),a.prototype.gridDefaults={dateFormat:null,axes:!0,grid:!0,gridLineColor:"#aaa",gridStrokeWidth:0.5,gridTextColor:"#888",gridTextSize:12,gridTextFamily:"sans-serif",gridTextWeight:"normal",hideHover:!1,yLabelFormat:null,xLabelAngle:0,numLines:5,padding:25,parseTime:!0,postUnits:"",preUnits:"",ymax:"auto",ymin:"auto 0",goals:[],goalStrokeWidth:1,goalLineColors:["#666633","#999966","#cc6666","#663333"],events:[],eventStrokeWidth:1,eventLineColors:["#005a04","#ccffbb","#3a5f0b","#005502"],rangeSelect:null,rangeSelectColor:"#eef",resize:!1},a.prototype.setData=function(I,H){var G,F,E,D,C,B,A,z,y,x,w,v,u,t,s;return null==H&&(H=!0),this.options.data=I,null==I||0===I.length?(this.data=[],this.raphael.clear(),null!=this.hover&&this.hover.hide(),void 0):(v=this.cumulative?0:null,u=this.cumulative?0:null,this.options.goals.length>0&&(C=Math.min.apply(Math,this.options.goals),D=Math.max.apply(Math,this.options.goals),u=null!=u?Math.min(u,C):C,v=null!=v?Math.max(v,D):D),this.data=function(){var h,f,e;for(e=[],E=h=0,f=I.length;f>h;E=++h){A=I[E],B={src:A},B.label=A[this.options.xkey],this.options.parseTime?(B.x=q.parseDate(B.label),this.options.dateFormat?B.label=this.options.dateFormat(B.x):"number"==typeof B.label&&(B.label=new Date(B.label).toString())):(B.x=E,this.options.xLabelFormat&&(B.label=this.options.xLabelFormat(B))),y=0,B.y=function(){var i,g,K,J;for(K=this.options.ykeys,J=[],F=i=0,g=K.length;g>i;F=++i){w=K[F],t=A[w],"string"==typeof t&&(t=parseFloat(t)),null!=t&&"number"!=typeof t&&(t=null),null!=t&&(this.cumulative?y+=t:null!=v?(v=Math.max(t,v),u=Math.min(t,u)):v=u=t),this.cumulative&&null!=y&&(v=Math.max(y,v),u=Math.min(y,u)),J.push(t)}return J}.call(this),e.push(B)}return e}.call(this),this.options.parseTime&&(this.data=this.data.sort(function(d,c){return(d.x>c.x)-(c.x>d.x)})),this.xmin=this.data[0].x,this.xmax=this.data[this.data.length-1].x,this.events=[],this.options.events.length>0&&(this.events=this.options.parseTime?function(){var d,i,h,g;for(h=this.options.events,g=[],d=0,i=h.length;i>d;d++){G=h[d],g.push(q.parseDate(G))}return g}.call(this):this.options.events,this.xmax=Math.max(this.xmax,Math.max.apply(Math,this.events)),this.xmin=Math.min(this.xmin,Math.min.apply(Math,this.events))),this.xmin===this.xmax&&(this.xmin-=1,this.xmax+=1),this.ymin=this.yboundary("min",u),this.ymax=this.yboundary("max",v),this.ymin===this.ymax&&(u&&(this.ymin-=1),this.ymax+=1),((s=this.options.axes)===!0||"both"===s||"y"===s||this.options.grid===!0)&&(this.options.ymax===this.gridDefaults.ymax&&this.options.ymin===this.gridDefaults.ymin?(this.grid=this.autoGridLines(this.ymin,this.ymax,this.options.numLines),this.ymin=Math.min(this.ymin,this.grid[0]),this.ymax=Math.max(this.ymax,this.grid[this.grid.length-1])):(z=(this.ymax-this.ymin)/(this.options.numLines-1),this.grid=function(){var f,e,h,g;for(g=[],x=f=e=this.ymin,h=this.ymax;z>0?h>=f:f>=h;x=f+=z){g.push(x)}return g}.call(this))),this.dirty=!0,H?this.redraw():void 0)},a.prototype.yboundary=function(f,e){var h,g;return h=this.options["y"+f],"string"==typeof h?"auto"===h.slice(0,4)?h.length>5?(g=parseInt(h.slice(5),10),null==e?g:Math[f](e,g)):null!=e?e:0:parseInt(h,10):h},a.prototype.autoGridLines=function(D,C,B){var A,z,y,x,w,v,u,t,s;return w=C-D,s=Math.floor(Math.log(w)/Math.log(10)),u=Math.pow(10,s),z=Math.floor(D/u)*u,A=Math.ceil(C/u)*u,v=(A-z)/(B-1),1===u&&v>1&&Math.ceil(v)!==v&&(v=Math.ceil(v),A=z+v*(B-1)),0>z&&A>0&&(z=Math.floor(D/v)*v,A=Math.ceil(C/v)*v),1>v?(x=Math.floor(Math.log(v)/Math.log(10)),y=function(){var d,c;for(c=[],t=d=z;v>0?A>=d:d>=A;t=d+=v){c.push(parseFloat(t.toFixed(1-x)))}return c}()):y=function(){var d,c;for(c=[],t=d=z;v>0?A>=d:d>=A;t=d+=v){c.push(t)}return c}(),y},a.prototype._calc=function(){var s,i,y,x,w,v,u,t;return w=this.el.width(),y=this.el.height(),(this.elementWidth!==w||this.elementHeight!==y||this.dirty)&&(this.elementWidth=w,this.elementHeight=y,this.dirty=!1,this.left=this.options.padding,this.right=this.elementWidth-this.options.padding,this.top=this.options.padding,this.bottom=this.elementHeight-this.options.padding,((u=this.options.axes)===!0||"both"===u||"y"===u)&&(v=function(){var f,z,h,g;for(h=this.grid,g=[],f=0,z=h.length;z>f;f++){i=h[f],g.push(this.measureText(this.yAxisFormat(i)).width)}return g}.call(this),this.left+=Math.max.apply(Math,v)),((t=this.options.axes)===!0||"both"===t||"x"===t)&&(s=function(){var e,d,f;for(f=[],x=e=0,d=this.data.length;d>=0?d>e:e>d;x=d>=0?++e:--e){f.push(this.measureText(this.data[x].text,-this.options.xLabelAngle).height)}return f}.call(this),this.bottom-=Math.max.apply(Math,s)),this.width=Math.max(1,this.right-this.left),this.height=Math.max(1,this.bottom-this.top),this.dx=this.width/(this.xmax-this.xmin),this.dy=this.height/(this.ymax-this.ymin),this.calc)?this.calc():void 0},a.prototype.transY=function(c){return this.bottom-(c-this.ymin)*this.dy},a.prototype.transX=function(c){return 1===this.data.length?(this.left+this.right)/2:this.left+(c-this.xmin)*this.dx},a.prototype.redraw=function(){return this.raphael.clear(),this._calc(),this.drawGrid(),this.drawGoals(),this.drawEvents(),this.draw?this.draw():void 0},a.prototype.measureText=function(f,e){var h,g;return null==e&&(e=0),g=this.raphael.text(100,100,f).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).rotate(e),h=g.getBBox(),g.remove(),h},a.prototype.yAxisFormat=function(c){return this.yLabelFormat(c)},a.prototype.yLabelFormat=function(c){return"function"==typeof this.options.yLabelFormat?this.options.yLabelFormat(c):""+this.options.preUnits+q.commas(c)+this.options.postUnits},a.prototype.drawGrid=function(){var s,i,y,x,w,v,u,t;if(this.options.grid!==!1||(w=this.options.axes)===!0||"both"===w||"y"===w){for(v=this.grid,t=[],y=0,x=v.length;x>y;y++){s=v[y],i=this.transY(s),((u=this.options.axes)===!0||"both"===u||"y"===u)&&this.drawYAxisLabel(this.left-this.options.padding/2,i,this.yAxisFormat(s)),this.options.grid?t.push(this.drawGridLine("M"+this.left+","+i+"H"+(this.left+this.width))):t.push(void 0)}return t}},a.prototype.drawGoals=function(){var i,h,w,v,u,t,s;for(t=this.options.goals,s=[],w=v=0,u=t.length;u>v;w=++v){h=t[w],i=this.options.goalLineColors[w%this.options.goalLineColors.length],s.push(this.drawGoal(h,i))}return s},a.prototype.drawEvents=function(){var i,h,w,v,u,t,s;for(t=this.events,s=[],w=v=0,u=t.length;u>v;w=++v){h=t[w],i=this.options.eventLineColors[w%this.options.eventLineColors.length],s.push(this.drawEvent(h,i))}return s},a.prototype.drawGoal=function(d,c){return this.raphael.path("M"+this.left+","+this.transY(d)+"H"+this.right).attr("stroke",c).attr("stroke-width",this.options.goalStrokeWidth)},a.prototype.drawEvent=function(d,c){return this.raphael.path("M"+this.transX(d)+","+this.bottom+"V"+this.top).attr("stroke",c).attr("stroke-width",this.options.eventStrokeWidth)},a.prototype.drawYAxisLabel=function(e,d,f){return this.raphael.text(e,d,f).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor).attr("text-anchor","end")},a.prototype.drawGridLine=function(c){return this.raphael.path(c).attr("stroke",this.options.gridLineColor).attr("stroke-width",this.options.gridStrokeWidth)},a.prototype.startRange=function(c){return this.hover.hide(),this.selectFrom=c,this.selectionRect.attr({x:c,width:0}).show()},a.prototype.endRange=function(e){var d,f;return this.selectFrom?(f=Math.min(this.selectFrom,e),d=Math.max(this.selectFrom,e),this.options.rangeSelect.call(this.el,{start:this.data[this.hitTest(f)].x,end:this.data[this.hitTest(d)].x}),this.selectFrom=null):void 0},a.prototype.resizeHandler=function(){return this.timeoutId=null,this.raphael.setSize(this.el.width(),this.el.height()),this.redraw()},a}(q.EventEmitter),q.parseDate=function(D){var C,B,A,z,y,x,w,v,u,t,s;return"number"==typeof D?D:(B=D.match(/^(\d+) Q(\d)$/),z=D.match(/^(\d+)-(\d+)$/),y=D.match(/^(\d+)-(\d+)-(\d+)$/),w=D.match(/^(\d+) W(\d+)$/),v=D.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)(Z|([+-])(\d\d):?(\d\d))?$/),u=D.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+):(\d+(\.\d+)?)(Z|([+-])(\d\d):?(\d\d))?$/),B?new Date(parseInt(B[1],10),3*parseInt(B[2],10)-1,1).getTime():z?new Date(parseInt(z[1],10),parseInt(z[2],10)-1,1).getTime():y?new Date(parseInt(y[1],10),parseInt(y[2],10)-1,parseInt(y[3],10)).getTime():w?(t=new Date(parseInt(w[1],10),0,1),4!==t.getDay()&&t.setMonth(0,1+(4-t.getDay()+7)%7),t.getTime()+604800000*parseInt(w[2],10)):v?v[6]?(x=0,"Z"!==v[6]&&(x=60*parseInt(v[8],10)+parseInt(v[9],10),"+"===v[7]&&(x=0-x)),Date.UTC(parseInt(v[1],10),parseInt(v[2],10)-1,parseInt(v[3],10),parseInt(v[4],10),parseInt(v[5],10)+x)):new Date(parseInt(v[1],10),parseInt(v[2],10)-1,parseInt(v[3],10),parseInt(v[4],10),parseInt(v[5],10)).getTime():u?(s=parseFloat(u[6]),C=Math.floor(s),A=Math.round(1000*(s-C)),u[8]?(x=0,"Z"!==u[8]&&(x=60*parseInt(u[10],10)+parseInt(u[11],10),"+"===u[9]&&(x=0-x)),Date.UTC(parseInt(u[1],10),parseInt(u[2],10)-1,parseInt(u[3],10),parseInt(u[4],10),parseInt(u[5],10)+x,C,A)):new Date(parseInt(u[1],10),parseInt(u[2],10)-1,parseInt(u[3],10),parseInt(u[4],10),parseInt(u[5],10),C,A).getTime()):new Date(parseInt(D,10),0,1).getTime())},q.Hover=function(){function a(b){null==b&&(b={}),this.options=r.extend({},q.Hover.defaults,b),this.el=r("<div class='"+this.options["class"]+"'></div>"),this.el.hide(),this.options.parent.append(this.el)}return a.defaults={"class":"morris-hover morris-default-style"},a.prototype.update=function(e,d,f){return e?(this.html(e),this.show(),this.moveTo(d,f)):this.hide()},a.prototype.html=function(b){return this.el.html(b)},a.prototype.moveTo=function(s,i){var y,x,w,v,u,t;return u=this.options.parent.innerWidth(),v=this.options.parent.innerHeight(),x=this.el.outerWidth(),y=this.el.outerHeight(),w=Math.min(Math.max(0,s-x/2),u-x),null!=i?(t=i-y-10,0>t&&(t=i+10,t+y>v&&(t=v/2-y/2))):t=v/2-y/2,this.el.css({left:w+"px",top:parseInt(t)+"px"})},a.prototype.show=function(){return this.el.show()},a.prototype.hide=function(){return this.el.hide()},a}(),q.Line=function(b){function d(c){return this.hilight=m(this.hilight,this),this.onHoverOut=m(this.onHoverOut,this),this.onHoverMove=m(this.onHoverMove,this),this.onGridClick=m(this.onGridClick,this),this instanceof q.Line?(d.__super__.constructor.call(this,c),void 0):new q.Line(c)}return k(d,b),d.prototype.init=function(){return"always"!==this.options.hideHover?(this.hover=new q.Hover({parent:this.el}),this.on("hovermove",this.onHoverMove),this.on("hoverout",this.onHoverOut),this.on("gridclick",this.onGridClick)):void 0},d.prototype.defaults={lineWidth:3,pointSize:4,lineColors:["#0b62a4","#7A92A3","#4da74d","#afd8f8","#edc240","#cb4b4b","#9440ed"],pointStrokeWidths:[1],pointStrokeColors:["#ffffff"],pointFillColors:[],smooth:!0,xLabels:"auto",xLabelFormat:null,xLabelMargin:24,hideHover:!1},d.prototype.calc=function(){return this.calcPoints(),this.generatePaths()},d.prototype.calcPoints=function(){var h,g,u,t,s,i;for(s=this.data,i=[],u=0,t=s.length;t>u;u++){h=s[u],h._x=this.transX(h.x),h._y=function(){var x,w,v,a;for(v=h.y,a=[],x=0,w=v.length;w>x;x++){g=v[x],null!=g?a.push(this.transY(g)):a.push(g)}return a}.call(this),i.push(h._ymax=Math.min.apply(Math,[this.bottom].concat(function(){var x,w,v,a;for(v=h._y,a=[],x=0,w=v.length;w>x;x++){g=v[x],null!=g&&a.push(g)}return a}())))}return i},d.prototype.hitTest=function(h){var g,u,t,s,i;if(0===this.data.length){return null}for(i=this.data.slice(1),g=t=0,s=i.length;s>t&&(u=i[g],!(h<(u._x+this.data[g]._x)/2));g=++t){}return g},d.prototype.onGridClick=function(f,e){var g;return g=this.hitTest(f),this.fire("click",g,this.data[g].src,f,e)},d.prototype.onHoverMove=function(e){var c;return c=this.hitTest(e),this.displayHoverForRow(c)},d.prototype.onHoverOut=function(){return this.options.hideHover!==!1?this.displayHoverForRow(null):void 0},d.prototype.displayHoverForRow=function(e){var c;return null!=e?((c=this.hover).update.apply(c,this.hoverContentForRow(e)),this.hilight(e)):(this.hover.hide(),this.hilight())},d.prototype.hoverContentForRow=function(s){var i,y,x,w,v,u,t;for(x=this.data[s],i="<div class='morris-hover-row-label'>"+x.label+"</div>",t=x.y,y=v=0,u=t.length;u>v;y=++v){w=t[y],i+="<div class='morris-hover-point' style='color: "+this.colorFor(x,y,"label")+"'>\n  "+this.options.labels[y]+":\n  "+this.yLabelFormat(w)+"\n</div>"}return"function"==typeof this.options.hoverCallback&&(i=this.options.hoverCallback(s,this.options,i,x.src)),[i,x._x,x._ymax]},d.prototype.generatePaths=function(){var f,i,h,g;return this.paths=function(){var s,e,c,a;for(a=[],i=s=0,e=this.options.ykeys.length;e>=0?e>s:s>e;i=e>=0?++s:--s){g="boolean"==typeof this.options.smooth?this.options.smooth:(c=this.options.ykeys[i],j.call(this.options.smooth,c)>=0),f=function(){var u,t,w,v;for(w=this.data,v=[],u=0,t=w.length;t>u;u++){h=w[u],void 0!==h._y[i]&&v.push({x:h._x,y:h._y[i]})}return v}.call(this),f.length>1?a.push(q.Line.createPath(f,g,this.bottom)):a.push(null)}return a}.call(this)},d.prototype.draw=function(){var c;return((c=this.options.axes)===!0||"both"===c||"x"===c)&&this.drawXAxis(),this.drawSeries(),this.options.hideHover===!1?this.displayHoverForRow(this.data.length-1):void 0},d.prototype.drawXAxis=function(){var C,B,A,z,y,x,w,v,u,t,s=this;for(w=this.bottom+this.options.padding/2,y=null,z=null,C=function(f,e){var G,F,E,D,h;return G=s.drawXAxisLabel(s.transX(e),w,f),h=G.getBBox(),G.transform("r"+-s.options.xLabelAngle),F=G.getBBox(),G.transform("t0,"+F.height/2+"..."),0!==s.options.xLabelAngle&&(D=-0.5*h.width*Math.cos(s.options.xLabelAngle*Math.PI/180),G.transform("t"+D+",0...")),F=G.getBBox(),(null==y||y>=F.x+F.width||null!=z&&z>=F.x)&&F.x>=0&&F.x+F.width<s.el.width()?(0!==s.options.xLabelAngle&&(E=1.25*s.options.gridTextSize/Math.sin(s.options.xLabelAngle*Math.PI/180),z=F.x-E),y=F.x-s.options.xLabelMargin):G.remove()},A=this.options.parseTime?1===this.data.length&&"auto"===this.options.xLabels?[[this.data[0].label,this.data[0].x]]:q.labelSeries(this.xmin,this.xmax,this.width,this.options.xLabels,this.options.xLabelFormat):function(){var f,e,h,g;for(h=this.data,g=[],f=0,e=h.length;e>f;f++){x=h[f],g.push([x.label,x.x])}return g}.call(this),A.reverse(),t=[],v=0,u=A.length;u>v;v++){B=A[v],t.push(C(B[0],B[1]))}return t},d.prototype.drawSeries=function(){var h,g,u,t,s,i;for(this.seriesPoints=[],h=g=t=this.options.ykeys.length-1;0>=t?0>=g:g>=0;h=0>=t?++g:--g){this._drawLineFor(h)}for(i=[],h=u=s=this.options.ykeys.length-1;0>=s?0>=u:u>=0;h=0>=s?++u:--u){i.push(this._drawPointFor(h))}return i},d.prototype._drawPointFor=function(i){var h,w,v,u,t,s;for(this.seriesPoints[i]=[],t=this.data,s=[],v=0,u=t.length;u>v;v++){w=t[v],h=null,null!=w._y[i]&&(h=this.drawLinePoint(w._x,w._y[i],this.colorFor(w,i,"point"),i)),s.push(this.seriesPoints[i].push(h))}return s},d.prototype._drawLineFor=function(e){var c;return c=this.paths[e],null!==c?this.drawLinePath(c,this.colorFor(null,e,"line"),e):void 0},d.createPath=function(I,H,G){var F,E,D,C,B,A,z,y,x,w,v,u,t,s;for(z="",H&&(D=q.Line.gradients(I)),y={y:null},C=t=0,s=I.length;s>t;C=++t){F=I[C],null!=F.y&&(null!=y.y?H?(E=D[C],A=D[C-1],B=(F.x-y.x)/4,x=y.x+B,v=Math.min(G,y.y+B*A),w=F.x-B,u=Math.min(G,F.y-B*E),z+="C"+x+","+v+","+w+","+u+","+F.x+","+F.y):z+="L"+F.x+","+F.y:H&&null==D[C]||(z+="M"+F.x+","+F.y)),y=F}return z},d.gradients=function(A){var z,y,x,w,v,u,t,s;for(y=function(e,c){return(e.y-c.y)/(e.x-c.x)},s=[],x=u=0,t=A.length;t>u;x=++u){z=A[x],null!=z.y?(w=A[x+1]||{y:null},v=A[x-1]||{y:null},null!=v.y&&null!=w.y?s.push(y(v,w)):null!=v.y?s.push(y(v,z)):null!=w.y?s.push(y(z,w)):s.push(null)):s.push(null)}return s},d.prototype.hilight=function(h){var g,u,t,s,i;if(null!==this.prevHilight&&this.prevHilight!==h){for(g=u=0,s=this.seriesPoints.length-1;s>=0?s>=u:u>=s;g=s>=0?++u:--u){this.seriesPoints[g][this.prevHilight]&&this.seriesPoints[g][this.prevHilight].animate(this.pointShrinkSeries(g))}}if(null!==h&&this.prevHilight!==h){for(g=t=0,i=this.seriesPoints.length-1;i>=0?i>=t:t>=i;g=i>=0?++t:--t){this.seriesPoints[g][h]&&this.seriesPoints[g][h].animate(this.pointGrowSeries(g))}}return this.prevHilight=h},d.prototype.colorFor=function(f,e,g){return"function"==typeof this.options.lineColors?this.options.lineColors.call(this,f,e,g):"point"===g?this.options.pointFillColors[e%this.options.pointFillColors.length]||this.options.lineColors[e%this.options.lineColors.length]:this.options.lineColors[e%this.options.lineColors.length]},d.prototype.drawXAxisLabel=function(f,e,g){return this.raphael.text(f,e,g).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor)},d.prototype.drawLinePath=function(f,e,g){return this.raphael.path(f).attr("stroke",e).attr("stroke-width",this.lineWidthForSeries(g))},d.prototype.drawLinePoint=function(f,e,h,g){return this.raphael.circle(f,e,this.pointSizeForSeries(g)).attr("fill",h).attr("stroke-width",this.pointStrokeWidthForSeries(g)).attr("stroke",this.pointStrokeColorForSeries(g))},d.prototype.pointStrokeWidthForSeries=function(c){return this.options.pointStrokeWidths[c%this.options.pointStrokeWidths.length]},d.prototype.pointStrokeColorForSeries=function(c){return this.options.pointStrokeColors[c%this.options.pointStrokeColors.length]},d.prototype.lineWidthForSeries=function(c){return this.options.lineWidth instanceof Array?this.options.lineWidth[c%this.options.lineWidth.length]:this.options.lineWidth},d.prototype.pointSizeForSeries=function(c){return this.options.pointSize instanceof Array?this.options.pointSize[c%this.options.pointSize.length]:this.options.pointSize},d.prototype.pointGrowSeries=function(c){return Raphael.animation({r:this.pointSizeForSeries(c)+3},25,"linear")},d.prototype.pointShrinkSeries=function(c){return Raphael.animation({r:this.pointSizeForSeries(c)},25,"linear")},d}(q.Grid),q.labelSeries=function(F,E,D,C,B){var A,z,y,x,w,v,u,t,s,b,a;if(y=200*(E-F)/D,z=new Date(F),u=q.LABEL_SPECS[C],void 0===u){for(a=q.AUTO_LABEL_ORDER,s=0,b=a.length;b>s;s++){if(x=a[s],v=q.LABEL_SPECS[x],y>=v.span){u=v;break}}}for(void 0===u&&(u=q.LABEL_SPECS.second),B&&(u=r.extend({},u,{fmt:B})),A=u.start(z),w=[];(t=A.getTime())<=E;){t>=F&&w.push([u.fmt(A),t]),u.incr(A)}return w},p=function(b){return{span:60*b*1000,start:function(c){return new Date(c.getFullYear(),c.getMonth(),c.getDate(),c.getHours())},fmt:function(c){return""+q.pad2(c.getHours())+":"+q.pad2(c.getMinutes())},incr:function(a){return a.setUTCMinutes(a.getUTCMinutes()+b)}}},o=function(b){return{span:1000*b,start:function(c){return new Date(c.getFullYear(),c.getMonth(),c.getDate(),c.getHours(),c.getMinutes())},fmt:function(c){return""+q.pad2(c.getHours())+":"+q.pad2(c.getMinutes())+":"+q.pad2(c.getSeconds())},incr:function(a){return a.setUTCSeconds(a.getUTCSeconds()+b)}}},q.LABEL_SPECS={decade:{span:172800000000,start:function(b){return new Date(b.getFullYear()-b.getFullYear()%10,0,1)},fmt:function(b){return""+b.getFullYear()},incr:function(b){return b.setFullYear(b.getFullYear()+10)}},year:{span:17280000000,start:function(b){return new Date(b.getFullYear(),0,1)},fmt:function(b){return""+b.getFullYear()},incr:function(b){return b.setFullYear(b.getFullYear()+1)}},month:{span:2419200000,start:function(b){return new Date(b.getFullYear(),b.getMonth(),1)},fmt:function(b){return""+b.getFullYear()+"-"+q.pad2(b.getMonth()+1)},incr:function(b){return b.setMonth(b.getMonth()+1)}},week:{span:604800000,start:function(b){return new Date(b.getFullYear(),b.getMonth(),b.getDate())},fmt:function(b){return""+b.getFullYear()+"-"+q.pad2(b.getMonth()+1)+"-"+q.pad2(b.getDate())},incr:function(b){return b.setDate(b.getDate()+7)}},day:{span:86400000,start:function(b){return new Date(b.getFullYear(),b.getMonth(),b.getDate())},fmt:function(b){return""+b.getFullYear()+"-"+q.pad2(b.getMonth()+1)+"-"+q.pad2(b.getDate())},incr:function(b){return b.setDate(b.getDate()+1)}},hour:p(60),"30min":p(30),"15min":p(15),"10min":p(10),"5min":p(5),minute:p(1),"30sec":o(30),"15sec":o(15),"10sec":o(10),"5sec":o(5),second:o(1)},q.AUTO_LABEL_ORDER=["decade","year","month","week","day","hour","30min","15min","10min","5min","minute","30sec","15sec","10sec","5sec","second"],q.Area=function(f){function b(e){var d;return this instanceof q.Area?(d=r.extend({},a,e),this.cumulative=!d.behaveLikeLine,"auto"===d.fillOpacity&&(d.fillOpacity=d.behaveLikeLine?0.8:1),b.__super__.constructor.call(this,d),void 0):new q.Area(e)}var a;return k(b,f),a={fillOpacity:"auto",behaveLikeLine:!1},b.prototype.calcPoints=function(){var i,h,w,v,u,t,s;for(t=this.data,s=[],v=0,u=t.length;u>v;v++){i=t[v],i._x=this.transX(i.x),h=0,i._y=function(){var z,y,x,c;for(x=i.y,c=[],z=0,y=x.length;y>z;z++){w=x[z],this.options.behaveLikeLine?c.push(this.transY(w)):(h+=w||0,c.push(this.transY(h)))}return c}.call(this),s.push(i._ymax=Math.max.apply(Math,i._y))}return s},b.prototype.drawSeries=function(){var s,i,y,x,w,v,u,t;for(this.seriesPoints=[],i=this.options.behaveLikeLine?function(){v=[];for(var d=0,c=this.options.ykeys.length-1;c>=0?c>=d:d>=c;c>=0?d++:d--){v.push(d)}return v}.apply(this):function(){u=[];for(var c=w=this.options.ykeys.length-1;0>=w?0>=c:c>=0;0>=w?c++:c--){u.push(c)}return u}.apply(this),t=[],y=0,x=i.length;x>y;y++){s=i[y],this._drawFillFor(s),this._drawLineFor(s),t.push(this._drawPointFor(s))}return t},b.prototype._drawFillFor=function(d){var c;return c=this.paths[d],null!==c?(c+="L"+this.transX(this.xmax)+","+this.bottom+"L"+this.transX(this.xmin)+","+this.bottom+"Z",this.drawFilledPath(c,this.fillForSeries(d))):void 0},b.prototype.fillForSeries=function(d){var c;return c=Raphael.rgb2hsl(this.colorFor(this.data[d],d,"line")),Raphael.hsl(c.h,this.options.behaveLikeLine?0.9*c.s:0.75*c.s,Math.min(0.98,this.options.behaveLikeLine?1.2*c.l:1.25*c.l))},b.prototype.drawFilledPath=function(d,c){return this.raphael.path(d).attr("fill",c).attr("fill-opacity",this.options.fillOpacity).attr("stroke","none")},b}(q.Line),q.Bar=function(b){function a(d){return this.onHoverOut=m(this.onHoverOut,this),this.onHoverMove=m(this.onHoverMove,this),this.onGridClick=m(this.onGridClick,this),this instanceof q.Bar?(a.__super__.constructor.call(this,r.extend({},d,{parseTime:!1})),void 0):new q.Bar(d)}return k(a,b),a.prototype.init=function(){return this.cumulative=this.options.stacked,"always"!==this.options.hideHover?(this.hover=new q.Hover({parent:this.el}),this.on("hovermove",this.onHoverMove),this.on("hoverout",this.onHoverOut),this.on("gridclick",this.onGridClick)):void 0},a.prototype.defaults={barSizeRatio:0.75,barGap:3,barColors:["#0b62a4","#7a92a3","#4da74d","#afd8f8","#edc240","#cb4b4b","#9440ed"],barOpacity:1,barRadius:[0,0,0,0],xLabelMargin:50},a.prototype.calc=function(){var c;return this.calcBars(),this.options.hideHover===!1?(c=this.hover).update.apply(c,this.hoverContentForRow(this.data.length-1)):void 0},a.prototype.calcBars=function(){var i,h,w,v,u,t,s;for(t=this.data,s=[],i=v=0,u=t.length;u>v;i=++v){h=t[i],h._x=this.left+this.width*(i+0.5)/this.data.length,s.push(h._y=function(){var c,y,x,g;for(x=h.y,g=[],c=0,y=x.length;y>c;c++){w=x[c],null!=w?g.push(this.transY(w)):g.push(null)}return g}.call(this))}return s},a.prototype.draw=function(){var c;return((c=this.options.axes)===!0||"both"===c||"x"===c)&&this.drawXAxis(),this.drawSeries()},a.prototype.drawXAxis=function(){var E,D,C,B,A,z,y,x,w,v,u,t,s;for(v=this.bottom+(this.options.xAxisLabelTopPadding||this.options.padding/2),y=null,z=null,s=[],E=u=0,t=this.data.length;t>=0?t>u:u>t;E=t>=0?++u:--u){x=this.data[this.data.length-1-E],D=this.drawXAxisLabel(x._x,v,x.label),w=D.getBBox(),D.transform("r"+-this.options.xLabelAngle),C=D.getBBox(),D.transform("t0,"+C.height/2+"..."),0!==this.options.xLabelAngle&&(A=-0.5*w.width*Math.cos(this.options.xLabelAngle*Math.PI/180),D.transform("t"+A+",0...")),(null==y||y>=C.x+C.width||null!=z&&z>=C.x)&&C.x>=0&&C.x+C.width<this.el.width()?(0!==this.options.xLabelAngle&&(B=1.25*this.options.gridTextSize/Math.sin(this.options.xLabelAngle*Math.PI/180),z=C.x-B),s.push(y=C.x-this.options.xLabelMargin)):s.push(D.remove())}return s},a.prototype.drawSeries=function(){var G,F,E,D,C,B,A,z,y,x,w,v,u,t,s;return E=this.width/this.options.data.length,z=this.options.stacked?1:this.options.ykeys.length,G=(E*this.options.barSizeRatio-this.options.barGap*(z-1))/z,this.options.barSize&&(G=Math.min(G,this.options.barSize)),v=E-G*z-this.options.barGap*(z-1),A=v/2,s=this.ymin<=0&&this.ymax>=0?this.transY(0):null,this.bars=function(){var d,c,f,e;for(f=this.data,e=[],D=d=0,c=f.length;c>d;D=++d){y=f[D],C=0,e.push(function(){var i,g,I,H;for(I=y._y,H=[],x=i=0,g=I.length;g>i;x=++i){t=I[x],null!==t?(s?(u=Math.min(t,s),F=Math.max(t,s)):(u=t,F=this.bottom),B=this.left+D*E+A,this.options.stacked||(B+=x*(G+this.options.barGap)),w=F-u,this.options.verticalGridCondition&&this.options.verticalGridCondition(y.x)&&this.drawBar(this.left+D*E,this.top,E,Math.abs(this.top-this.bottom),this.options.verticalGridColor,this.options.verticalGridOpacity,this.options.barRadius),this.options.stacked&&(u-=C),this.drawBar(B,u,G,w,this.colorFor(y,x,"bar"),this.options.barOpacity,this.options.barRadius),H.push(C+=w)):H.push(null)}return H}.call(this))}return e}.call(this)},a.prototype.colorFor=function(g,f,s){var i,h;return"function"==typeof this.options.barColors?(i={x:g.x,y:g.y[f],label:g.label},h={index:f,key:this.options.ykeys[f],label:this.options.labels[f]},this.options.barColors.call(this,i,h,s)):this.options.barColors[f%this.options.barColors.length]},a.prototype.hitTest=function(c){return 0===this.data.length?null:(c=Math.max(Math.min(c,this.right),this.left),Math.min(this.data.length-1,Math.floor((c-this.left)/(this.width/this.data.length))))},a.prototype.onGridClick=function(e,d){var f;return f=this.hitTest(e),this.fire("click",f,this.data[f].src,e,d)},a.prototype.onHoverMove=function(e){var d,f;return d=this.hitTest(e),(f=this.hover).update.apply(f,this.hoverContentForRow(d))},a.prototype.onHoverOut=function(){return this.options.hideHover!==!1?this.hover.hide():void 0},a.prototype.hoverContentForRow=function(A){var z,y,x,w,v,u,t,s;for(x=this.data[A],z="<div class='morris-hover-row-label'>"+x.label+"</div>",s=x.y,y=u=0,t=s.length;t>u;y=++u){v=s[y],z+="<div class='morris-hover-point' style='color: "+this.colorFor(x,y,"label")+"'>\n  "+this.options.labels[y]+":\n  "+this.yLabelFormat(v)+"\n</div>"}return"function"==typeof this.options.hoverCallback&&(z=this.options.hoverCallback(A,this.options,z,x.src)),w=this.left+(A+0.5)*this.width/this.data.length,[z,w]},a.prototype.drawXAxisLabel=function(f,e,h){var g;return g=this.raphael.text(f,e,h).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor)},a.prototype.drawBar=function(A,z,y,x,w,v,u){var t,s;return t=Math.max.apply(Math,u),s=0===t||t>x?this.raphael.rect(A,z,y,x):this.raphael.path(this.roundedRect(A,z,y,x,u)),s.attr("fill",w).attr("fill-opacity",v).attr("stroke","none")},a.prototype.roundedRect=function(g,f,s,i,h){return null==h&&(h=[0,0,0,0]),["M",g,h[0]+f,"Q",g,f,g+h[0],f,"L",g+s-h[1],f,"Q",g+s,f,g+s,f+h[1],"L",g+s,f+i-h[2],"Q",g+s,f+i,g+s-h[2],f+i,"L",g+h[3],f+i,"Q",g,f+i,g,f+i-h[3],"Z"]},a}(q.Grid),q.Donut=function(b){function a(f){this.resizeHandler=m(this.resizeHandler,this),this.select=m(this.select,this),this.click=m(this.click,this);var e=this;if(!(this instanceof q.Donut)){return new q.Donut(f)}if(this.options=r.extend({},this.defaults,f),this.el="string"==typeof f.element?r(document.getElementById(f.element)):r(f.element),null===this.el||0===this.el.length){throw new Error("Graph placeholder not found.")}void 0!==f.data&&0!==f.data.length&&(this.raphael=new Raphael(this.el[0]),this.options.resize&&r(window).bind("resize",function(){return null!=e.timeoutId&&window.clearTimeout(e.timeoutId),e.timeoutId=window.setTimeout(e.resizeHandler,100)}),this.setData(f.data))}return k(a,b),a.prototype.defaults={colors:["#0B62A4","#3980B5","#679DC6","#95BBD7","#B0CCE1","#095791","#095085","#083E67","#052C48","#042135"],backgroundColor:"#FFFFFF",labelColor:"#000000",formatter:q.commas,resize:!1},a.prototype.redraw=function(){var U,T,S,R,Q,P,O,N,M,L,K,J,I,H,G,F,E,D,C,B,A,z,y;for(this.raphael.clear(),T=this.el.width()/2,S=this.el.height()/2,I=(Math.min(T,S)-10)/3,K=0,B=this.values,H=0,E=B.length;E>H;H++){J=B[H],K+=J}for(N=5/(2*I),U=1.9999*Math.PI-N*this.data.length,P=0,Q=0,this.segments=[],A=this.values,R=G=0,D=A.length;D>G;R=++G){J=A[R],M=P+N+U*(J/K),L=new q.DonutSegment(T,S,2*I,I,P,M,this.data[R].color||this.options.colors[Q%this.options.colors.length],this.options.backgroundColor,Q,this.raphael),L.render(),this.segments.push(L),L.on("hover",this.select),L.on("click",this.click),P=M,Q+=1}for(this.text1=this.drawEmptyDonutLabel(T,S-10,this.options.labelColor,15,800),this.text2=this.drawEmptyDonutLabel(T,S+10,this.options.labelColor,14),O=Math.max.apply(Math,this.values),Q=0,z=this.values,y=[],F=0,C=z.length;C>F;F++){if(J=z[F],J===O){this.select(Q);break}y.push(Q+=1)}return y},a.prototype.setData=function(d){var c;return this.data=d,this.values=function(){var f,i,h,g;for(h=this.data,g=[],f=0,i=h.length;i>f;f++){c=h[f],g.push(parseFloat(c.value))}return g}.call(this),this.redraw()},a.prototype.click=function(c){return this.fire("click",c,this.data[c])},a.prototype.select=function(i){var h,w,v,u,t,s;for(s=this.segments,u=0,t=s.length;t>u;u++){w=s[u],w.deselect()}return v=this.segments[i],v.select(),h=this.data[i],this.setLabels(h.label,this.options.formatter(h.value,h))},a.prototype.setLabels=function(B,A){var z,y,x,w,v,u,t,s;return z=2*(Math.min(this.el.width()/2,this.el.height()/2)-10)/3,w=1.8*z,x=z/2,y=z/3,this.text1.attr({text:B,transform:""}),v=this.text1.getBBox(),u=Math.min(w/v.width,x/v.height),this.text1.attr({transform:"S"+u+","+u+","+(v.x+v.width/2)+","+(v.y+v.height)}),this.text2.attr({text:A,transform:""}),t=this.text2.getBBox(),s=Math.min(w/t.width,y/t.height),this.text2.attr({transform:"S"+s+","+s+","+(t.x+t.width/2)+","+t.y})},a.prototype.drawEmptyDonutLabel=function(h,g,u,t,s){var i;return i=this.raphael.text(h,g,"").attr("font-size",t).attr("fill",u),null!=s&&i.attr("font-weight",s),i},a.prototype.resizeHandler=function(){return this.timeoutId=null,this.raphael.setSize(this.el.width(),this.el.height()),this.redraw()},a}(q.EventEmitter),q.DonutSegment=function(d){function c(A,z,y,x,w,v,u,t,s,f){this.cx=A,this.cy=z,this.inner=y,this.outer=x,this.color=u,this.backgroundColor=t,this.index=s,this.raphael=f,this.deselect=m(this.deselect,this),this.select=m(this.select,this),this.sin_p0=Math.sin(w),this.cos_p0=Math.cos(w),this.sin_p1=Math.sin(v),this.cos_p1=Math.cos(v),this.is_long=v-w>Math.PI?1:0,this.path=this.calcSegment(this.inner+3,this.inner+this.outer-5),this.selectedPath=this.calcSegment(this.inner+3,this.inner+this.outer),this.hilight=this.calcArc(this.inner)}return k(c,d),c.prototype.calcArcPoints=function(b){return[this.cx+b*this.sin_p0,this.cy+b*this.cos_p0,this.cx+b*this.sin_p1,this.cy+b*this.cos_p1]},c.prototype.calcSegment=function(D,C){var B,A,z,y,x,w,v,u,t,s;return t=this.calcArcPoints(D),B=t[0],z=t[1],A=t[2],y=t[3],s=this.calcArcPoints(C),x=s[0],v=s[1],w=s[2],u=s[3],"M"+B+","+z+("A"+D+","+D+",0,"+this.is_long+",0,"+A+","+y)+("L"+w+","+u)+("A"+C+","+C+",0,"+this.is_long+",1,"+x+","+v)+"Z"},c.prototype.calcArc=function(h){var g,u,t,s,i;return i=this.calcArcPoints(h),g=i[0],t=i[1],u=i[2],s=i[3],"M"+g+","+t+("A"+h+","+h+",0,"+this.is_long+",0,"+u+","+s)},c.prototype.render=function(){var b=this;return this.arc=this.drawDonutArc(this.hilight,this.color),this.seg=this.drawDonutSegment(this.path,this.color,this.backgroundColor,function(){return b.fire("hover",b.index)},function(){return b.fire("click",b.index)})},c.prototype.drawDonutArc=function(f,e){return this.raphael.path(f).attr({stroke:e,"stroke-width":2,opacity:0})},c.prototype.drawDonutSegment=function(g,f,s,i,h){return this.raphael.path(g).attr({fill:f,stroke:s,"stroke-width":3}).hover(i).click(h)},c.prototype.select=function(){return this.selected?void 0:(this.seg.animate({path:this.selectedPath},150,"<>"),this.arc.animate({opacity:1},150,"<>"),this.selected=!0)},c.prototype.deselect=function(){return this.selected?(this.seg.animate({path:this.path},150,"<>"),this.arc.animate({opacity:0},150,"<>"),this.selected=!1):void 0},c}(q.EventEmitter)}).call(this);