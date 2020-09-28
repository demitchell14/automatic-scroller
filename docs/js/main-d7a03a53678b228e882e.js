!function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}__webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{enumerable:!0,get:getter})},__webpack_require__.r=function(exports){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.t=function(value,mode){if(1&mode&&(value=__webpack_require__(value)),8&mode)return value;if(4&mode&&"object"==typeof value&&value&&value.__esModule)return value;var ns=Object.create(null);if(__webpack_require__.r(ns),Object.defineProperty(ns,"default",{enumerable:!0,value:value}),2&mode&&"string"!=typeof value)for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=0)}([function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(1);!function(){!function(){const repeatableElement=document.body.querySelector("[data-repeatable]");if(repeatableElement){let count=repeatableElement.getAttribute("data-count");repeatableElement.removeAttribute("data-count"),repeatableElement.setAttribute("data-id",0);try{count&&(count=Number.parseInt(count))}catch(e){}if("number"==typeof count){const parent=repeatableElement.parentElement;for(let i=1;i<count;i++){const clone=repeatableElement.cloneNode(!0);clone.setAttribute("data-id",i+""),parent.appendChild(clone)}}}}();const scroller=__webpack_require__(2);window.autoScroller=scroller,window.autoScrollerMin=function(){const header=document.querySelector(".header"),footer=document.querySelector(".footer"),items=document.querySelectorAll("[data-id]"),table=document.getElementById("list");let containerHeight=window.innerHeight;return header&&(containerHeight-=header.clientHeight,table.style.paddingTop=header.clientHeight+"px"),footer&&(containerHeight-=footer.clientHeight,table.style.paddingBottom=footer.clientHeight+"px"),function(args){const{fps:fps,delay:delay,scrollBy:scrollBy,onEnd:onEnd}=args;scroller({containerHeight:containerHeight,fps:fps,delay:delay,scrollBy:scrollBy,itemHeight:items.length>0?items[0].clientHeight:0,marginTop:header.clientHeight,lastItemId:Number.parseInt(items[items.length-1].getAttribute("data-id")),onEnd:onEnd})}}()}()},function(module,exports,__webpack_require__){},function(module,exports){const defaultPageArgs={fps:60,delay:1e3,scrollBy:1,containerHeight:0,itemHeight:0,startId:0,lastItemId:0};const defaultFPSAnimArgs={fps:999999,scrollY:1,scrollX:0,minY:0};module.exports=function ScrollPage(args){args=Object.assign(defaultPageArgs,args);const{fps:fps,delay:delay,scrollBy:scrollBy,containerHeight:containerHeight,itemHeight:itemHeight,startId:startId,marginTop:marginTop,lastItemId:lastItemId,onEnd:onEnd}=args,nextStartId=startId+(Number.parseInt((containerHeight/itemHeight).toFixed(0))-1),nextStartElement=document.querySelector(`[data-id="${nextStartId}"]`);let nextBound={top:0};null!==nextStartElement&&(nextBound=nextStartElement.getBoundingClientRect());const anim=function(args){let now,elapsed,id,fpsInterval=1e3/(args=Object.assign(defaultFPSAnimArgs,args)).fps,scrollY=args.scrollY,scrollX=args.scrollX,currentY=args.scrollY,travelled=0,maxDistance=window.scrollY-(args.distance||0),then=Date.now(),started=!1,stopped=!1;Number.parseInt(getComputedStyle(document.body).marginTop),Number.parseInt(getComputedStyle(document.body).marginBottom);const tmp=args.started;function stop(end=!1){stopped=!0,started=!1,window.removeEventListener("scroll",scrollListener),args.onStopped&&args.onStopped(end)}function start(){function animate(){if(stopped)return;const id=requestAnimationFrame(animate);if(args.started&&!started&&(args.started(id),started=!0),now=Date.now(),elapsed=now-then,elapsed>fpsInterval)if(then=now-elapsed%fpsInterval,args.distance){let nextScroll;args.scrollY;nextScroll=travelled+args.scrollY>args.distance?args.distance-travelled:scrollY,nextScroll<=0&&(stop(),cancelAnimationFrame(id)),window.scrollBy(scrollX,nextScroll)}else{document.body.scrollHeight,window.scrollY,window.innerHeight;currentY=window.scrollY+scrollY,window.scrollBy(scrollX,currentY)}}return stopped=!1,started=!1,window.addEventListener("scroll",scrollListener),animate()}function scrollListener(evt){const margin=Number.parseInt(getComputedStyle(document.body).marginTop)+Number.parseInt(getComputedStyle(document.body).marginBottom),maxScroll=document.body.scrollHeight+margin-window.scrollY-window.innerHeight;if(args.distance&&(travelled+=maxDistance>window.scrollY?window.scrollY-maxDistance:scrollY,travelled>=args.distance||window.scrollY+window.innerHeight>=document.body.scrollHeight+margin))return cancelAnimationFrame(id),void stop(window.scrollY+window.innerHeight>=document.body.scrollHeight+margin);(maxScroll<=0||"number"==typeof args.maxY&&window.scrollY>=args.maxY)&&id&&(cancelAnimationFrame(id),stop())}return args.started=loopId=>(id=loopId,tmp(loopId)),{start:start,stop:stop}}({fps:fps,scrollY:scrollBy,distance:nextBound.top-marginTop,started(){},onStopped(end){null===nextStartElement||end?(console.error("RESET Scroller"),onEnd&&setTimeout(onEnd,delay)):ScrollPage({...args,startId:nextStartId})}});setTimeout(anim.start,delay)}}]);
