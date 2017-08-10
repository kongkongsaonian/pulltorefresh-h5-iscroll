/**
 * pulltorefresh-h5-iscroll - 一款基于IScroll5的H5下拉刷新实现，包括多种皮肤的实现
 * @version v3.0.0
 * @author 
 */
!function(e,t){!function(){e.dataProcessFn=[],e.dataProcess=function(t,s){s=s||{};var n=[].slice.call(arguments),i={code:0,message:"",data:null,status:0,debugInfo:{type:"未知数据格式"}};if(null==s.dataPath)return t;"string"==typeof s.dataPath&&(s.dataPath=[s.dataPath]);var a=s.isDebug||!1,o=s.dataPath,r=e.dataProcessFn,l=r.length,u=o.length,c=!1;if(!t)return i.message="接口返回数据为空!",i;n.push(i);for(var h=0;!c&&h<u;h++){n[1]=o[h];for(var d=0;!c&&d<l;d++){var p=r[d],f=p.apply(this,n);if(null!=f&&(1==f.code||h==u-1)){c=!0,i=f;break}}}return c||(i.message="没有数据处理函数或者接口数据返回格式不符合要求!",i.debugInfo.data=t),a||(i.debugInfo=void 0),i}}(),function(){function s(e,s,n){if(!(s&&e&&e.ReturnInfo&&e.BusinessInfo))return null;var i={type:"v6数据格式:"+s},a=e.ReturnInfo,o=e.BusinessInfo;e.UserArea;if("1"==a.Code)if("1"==o.Code){n.code=1;var r=t.getNameSpaceObj(e,s);r?n.data=r:(n.message=n.message||"指定路径下没有找到数据",n.data=null,i.errorType="3")}else i.errorType="2",n.code=0,n.message=o.Description||"接口请求错误,后台业务逻辑处理出错!";else i.errorType="1",n.code=0,n.message=a.Description||"接口请求错误,后台程序处理出错!";return n.debugInfo=i,n}e.dataProcessFn.push(s)}(),function(){function s(e,s,n){if(!(s&&e&&e.status&&e.custom))return null;var i={type:"v7数据格式:"+s},a=e.status;if(n.status=a.code||0,n.message=a.text,"200"==a.code){n.code=1;var o=t.getNameSpaceObj(e,s);o?n.data=o:(n.message=n.message||"指定路径下没有找到数据",n.data=null,i.errorType="3")}else n.code=0,i.errorType="2",n.message=n.message||"status状态错误";return n.debugInfo=i,n}e.dataProcessFn.push(s)}(),t.namespace("dataProcess",e.dataProcess)}({},PullToRefreshTools),function(e){"use strict";function t(e){if(null==e||"string"!=typeof e)return null;var t,s=document.createElement("div"),n=document.createDocumentFragment();for(s.innerHTML=e;t=s.firstChild;)n.appendChild(t);return n}function s(t){var s=this;t=e.extend(!0,{},o,t);var n=t.template;if("string"==typeof n&&/^[.#]/.test(n)||n instanceof HTMLElement){var i=e.selector(n);i&&(n=i.innerHTML.toString()||"")}t.template=n;var a=t.skin||PullToRefreshTools.skin.defaults;if(!a)throw new Error("错误:传入的下拉刷新皮肤错误,超出范围!");var r=t.setting;r.container=t.container,r.down&&(r.down.callback=function(){s._pullDownCallback()}),r.up&&(r.up.callback=function(){s._pullUpCallback()}),this.container=e.selector(t.container),this.listContainer=e.selector(t.listContainer),this.options=t,this.setting=r,this._initParams(),this.instance=new a(r),this._addEvent()}var n=e.dataProcess,i="ontouchstart"in document,a=i?"tap":"click",o={isDebug:!1,container:"#pullrefresh",listContainer:"#listdata",type:"POST",initPageIndex:0,pageSize:10,url:null,template:"#item-template",dataRequest:null,dataChange:null,itemClick:null,success:null,error:null,refresh:null,isAutoRender:!0,itemSelector:"li",delay:0,timeout:6e3,accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:"application/json",xml:"application/xml, text/xml",html:"text/html",text:"text/plain"},contentType:"application/x-www-form-urlencoded",headers:null,setting:{down:{isSuccessTips:!0},up:{auto:!0}}};s.prototype={_initParams:function(){this.isShouldNoMoreData=!0,this.currPage=this.options.initPageIndex,this.setting.up&&this.setting.up.auto&&this.currPage--},_pullDownCallback:function(){var e=this,t=this.options;this.loadingDown||(this.isPullDown=!0,this.loadingDown=!0,this.currPage=t.initPageIndex,setTimeout(function(){e._ajaxRequest()},t.delay),t.refresh&&t.refresh(!0))},_pullUpCallback:function(){var e=this;this.loadingUp||(this.isPullDown=!1,this.loadingUp=!0,this.currPage++,setTimeout(function(){e._ajaxRequest()},this.options.delay))},_clearResponseEl:function(){this.options.isAutoRender&&this.listContainer&&(this.listContainer.innerHTML="")},_render:function(e){var s=this.options,n=0;if(s.isAutoRender)if(this.isPullDown&&this._clearResponseEl(),window.Mustache)if(e&&Array.isArray(e)&&e.length>0){for(var i="",a=0,o=e.length;a<o;a++){var r=e[a],l="";s.template&&("string"==typeof s.template?l=s.template:"function"==typeof s.template&&(l=s.template(r))),i+=Mustache.render(l,r),n++}""!=i&&this.listContainer.appendChild(t(i))}else this.isShouldNoMoreData=!1;else this.isShouldNoMoreData=!1,s.isDebug&&console.error("error***没有包含mustache文件,无法进行模板渲染");return n},_dataChangeDefault:function(e){var t=n(e,{dataPath:["custom.infolist","custom.infoList","UserArea.InfoList"]});return t.data},_ajaxRequest:function(){var e=this,t=this.options;if(!t.url)return t.isDebug&&console.error("error***url无效,无法访问"),void this._errorRequest(null,null,"请求url为空!");var s=function(s){var n="";n="function"==typeof t.url?t.url():t.url,mui.ajax({url:n,data:s,dataType:"json",timeout:t.timeout,type:t.type,accepts:t.accepts,headers:t.headers,contentType:t.contentType,success:function(t){e._successRequest(t)},error:function(t,s){e._errorRequest(t,s,"请求失败!")}})};if(t.dataRequest){var n=t.dataRequest(this.currPage,function(e){s(e)});void 0!==n&&s(n)}else t.isDebug&&console.warn("warning***请注意dataRequest不存在,默认数据为空"),s()},_errorRequest:function(e,t,s){var n=this.options;this.isShouldNoMoreData=!1,this._refreshState(!1),this.currPage--,this.currPage=this.currPage>=n.initPageIndex?this.currPage:n.initPageIndex,n.error&&n.error(e,t,s)},_successRequest:function(e){var t=this.options;if(!e)return t.isDebug&&console.log("warning***返回的数据为空,请注意！"),this.isShouldNoMoreData=!1,void this._refreshState(!1);t.isDebug&&console.log("下拉刷新返回数据:"+JSON.stringify(e)),e=t.dataChange?t.dataChange(e):this._dataChangeDefault(e);var s=this._render(e);this.loadingMoreSuccess&&(this.loadingMoreSuccess(),this.loadingMoreSuccess=null),t.success&&"function"==typeof t.success&&t.success(e,this.isPullDown||this.currPage==t.initPageIndex),this._refreshState(!0,s)},_refreshState:function(e,t){var s=this.instance;t=t||0,s.setSuccessTips&&s.setSuccessTips("更新"+t+"条数据"),this.isPullDown&&(s.endPullDownToRefresh(e),s.finished&&(s.refresh(!0),this.isShouldNoMoreData=!0)),this.isShouldNoMoreData?s.endPullUpToRefresh(!1,e):s.endPullUpToRefresh(!0,e),this.loadingDown=!1,this.loadingUp=!1},_addEvent:function(){var e=this.listContainer,t=this.options,s=t.itemClick;"function"==typeof s&&mui(e).on(a,t.itemSelector,s)},refresh:function(){var e=this.options;e.up&&this.instance.enablePullUp?this.loadingUp||(this._clearResponseEl(),this.currPage=e.initPageIndex-1,this.loadingMore()):(this._clearResponseEl(),this._pullDownCallback())},loadingMore:function(e){var t=this.instance;this.loadingMoreSuccess=e,this.instance.finished&&(this.instance.refresh(!0),this.isShouldNoMoreData=!0),t.pullupLoading()},disablePullupToRefresh:function(){this.pullToRefreshInstance.disablePullupToRefresh()},enablePullupToRefresh:function(){this.pullToRefreshInstance.enablePullupToRefresh()},destroy:function(){mui(listContainer).off(),this.container=null,this.listContainer=null,this.instance=null,this.options=null}},e.namespace("bizlogic",s)}(PullToRefreshTools);