/*! iCheck v1.0.1 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */
(function(V){function A(k,h,n){var p=k[0],m=/er/.test(n)?S:/bl/.test(n)?N:T,l=n==i?{checked:p[T],disabled:p[N],indeterminate:"true"==k.attr(S)||"false"==k.attr(j)}:p[m];if(/^(ch|di|in)/.test(n)&&!l){O(k,m)}else{if(/^(un|en|de)/.test(n)&&l){K(k,m)}else{if(n==i){for(m in l){l[m]?O(k,m,!0):K(k,m,!0)}}else{if(!h||"toggle"==n){if(!h){k[Q]("ifClicked")}l?p[R]!==B&&K(k,m):O(k,m)}}}}}function O(y,x,u){var v=y[0],t=y.parent(),q=x==T,n=x==S,m=x==N,w=n?j:q?C:"enabled",l=U(y,w+g(v[R])),s=U(y,x+g(v[R]));if(!0!==v[x]){if(!u&&x==T&&v[R]==B&&v.name){var k=y.closest("form"),h='input[name="'+v.name+'"]',h=k.length?k.find(h):V(h);h.each(function(){this!==v&&V(this).data(P)&&K(V(this),x)})}n?(v[x]=!0,v[T]&&K(y,T,"force")):(u||(v[x]=!0),q&&v[S]&&K(y,S,!1));b(y,q,x,u)}v[N]&&U(y,e,!0)&&t.find("."+f).css(e,"default");t[r](s||U(y,x)||"");m?t.attr("aria-disabled","true"):t.attr("aria-checked",n?"mixed":"true");t[c](l||U(y,w)||"")}function K(y,x,v){var w=y[0],s=y.parent(),n=x==T,m=x==S,k=x==N,l=m?j:n?C:"enabled",D=U(y,l+g(w[R])),z=U(y,x+g(w[R]));if(!1!==w[x]){if(m||!v||"force"==v){w[x]=!1}b(y,n,l,v)}!w[N]&&U(y,e,!0)&&s.find("."+f).css(e,"pointer");s[c](z||U(y,x)||"");k?s.attr("aria-disabled","false"):s.attr("aria-checked","false");s[r](D||U(y,l)||"")}function a(k,h){if(k.data(P)){k.parent().html(k.attr("style",k.data(P).s||""));if(h){k[Q](h)}k.off(".i").unwrap();V(o+'[for="'+k[0].id+'"]').add(k.closest(o)).off(".i")}}function U(k,h,l){if(k.data(P)){return k.data(P).o[h+(l?"":"Class")]}}function g(h){return h.charAt(0).toUpperCase()+h.slice(1)}function b(k,h,l,m){if(!m){if(h){k[Q]("ifToggled")}k[Q]("ifChanged")[Q]("if"+g(l))}}var P="iCheck",f=P+"-helper",B="radio",T="checked",C="un"+T,N="disabled",j="determinate",S="in"+j,i="update",R="type",r="addClass",c="removeClass",Q="trigger",o="label",e="cursor",d=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);V.fn[P]=function(D,v){var s='input[type="checkbox"], input[type="'+B+'"]',t=V(),q=function(k){k.each(function(){var w=V(this);t=w.is(s)?t.add(w):t.add(w.find(s))})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(D)){return D=D.toLowerCase(),q(this),t.each(function(){var k=V(this);"destroy"==D?a(k,"ifDestroyed"):A(k,!0,D);V.isFunction(v)&&v()})}if("object"!=typeof D&&D){return this}var p=V.extend({checkedClass:T,disabledClass:N,indeterminateClass:S,labelHover:!0,aria:!1},D),n=p.handle,m=p.hoverClass||"hover",z=p.focusClass||"focus",E=p.activeClass||"active",u=!!p.labelHover,l=p.labelHoverClass||"hover",h=(""+p.increaseArea).replace("%","")|0;if("checkbox"==n||n==B){s='input[type="'+n+'"]'}-50>h&&(h=-50);q(this);return t.each(function(){var L=V(this);a(L);var I=this,J=I.id,G=-h+"%",H=100+2*h+"%",H={position:"absolute",top:G,left:G,display:"block",width:H,height:H,margin:0,padding:0,background:"#fff",border:0,opacity:0},G=d?{position:"absolute",visibility:"hidden"}:h?H:{position:"absolute",opacity:0},y="checkbox"==I[R]?p.checkboxClass||"icheckbox":p.radioClass||"i"+B,x=V(o+'[for="'+J+'"]').add(L.closest(o)),w=!!p.aria,M=P+"-"+Math.random().toString(36).replace("0.",""),F='<div class="'+y+'" '+(w?'role="'+I[R]+'" ':"");x.length&&w&&x.each(function(){F+='aria-labelledby="';this.id?F+=this.id:(this.id=M,F+=M);F+='"'});F=L.wrap(F+"/>")[Q]("ifCreated").parent().append(p.insert);H=V('<ins class="'+f+'"/>').css(H).appendTo(F);L.data(P,{o:p,s:L.attr("style")}).css(G);p.inheritClass&&F[r](I.className||"");p.inheritID&&J&&F.attr("id",P+"-"+J);"static"==F.css("position")&&F.css("position","relative");A(L,!0,i);if(x.length){x.on("click.i mouseover.i mouseout.i touchbegin.i touchend.i",function(k){var X=k[R],W=V(this);if(!I[N]){if("click"==X){if(V(k.target).is("a")){return}A(L,!1,!0)}else{u&&(/ut|nd/.test(X)?(F[c](m),W[c](l)):(F[r](m),W[r](l)))}if(d){k.stopPropagation()}else{return !1}}})}L.on("click.i focus.i blur.i keyup.i keydown.i keypress.i",function(k){var W=k[R];k=k.keyCode;if("click"==W){return !1}if("keydown"==W&&32==k){return I[R]==B&&I[T]||(I[T]?K(L,T):O(L,T)),!1}if("keyup"==W&&I[R]==B){!I[T]&&O(L,T)}else{if(/us|ur/.test(W)){F["blur"==W?c:r](z)}}});H.on("click mousedown mouseup mouseover mouseout touchbegin.i touchend.i",function(k){var X=k[R],W=/wn|up/.test(X)?E:m;if(!I[N]){if("click"==X){A(L,!1,!0)}else{if(/wn|er|in/.test(X)){F[r](W)}else{F[c](W+" "+E)}if(x.length&&u&&W==m){x[/ut|nd/.test(X)?c:r](l)}}if(d){k.stopPropagation()}else{return !1}}})})}})(window.jQuery||window.Zepto);