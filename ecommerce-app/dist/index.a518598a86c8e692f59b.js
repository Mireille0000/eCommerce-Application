!function(){"use strict";var e={699:function(e,t,n){n.r(t)},952:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this.appName=document.createElement("h1"),this.navBar=document.createElement("nav"),this.navigation=document.createElement("ul"),this.navItem=document.createElement("li"),this.link=document.createElement("a")}}},198:function(e,t,n){var a=this&&this.__createBinding||(Object.create?function(e,t,n,a){void 0===a&&(a=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,a,r)}:function(e,t,n,a){void 0===a&&(a=n),e[a]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&a(t,e,n);return r(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(n(749)),l=o(n(952)),d=i(n(703)),u=o(n(381)),p=o(n(114));class c extends s.default{constructor(){super(),this.appName.className="log-in-heading",this.form=(0,d.default)("form","log-in-form"),this.email=(0,d.default)("input","email-input","",[{name:"placeholder",value:"Email"}]),this.emailHint=(0,d.default)("span","email-hint"),this.passwordHint=(0,d.default)("span","password-hint"),this.password=(0,d.default)("input","password-input","",[{name:"placeholder",value:"Password"},{name:"type",value:"password"}]),this.loginButton=(0,d.default)("button","log-in","Log in"),this.regButton=(0,d.default)("button","sign-up","Sign up")}renderPage(){document.body.append(this.pageWrapper),this.pageWrapper.append(this.header,this.main,this.footer);const e=new l.default,t=[e.appName,e.navBar,e.navigation,e.navItem,e.link];e.navBar.className="nav-bar";const[n,a,r,i,o]=t;this.addElemsToHeader(n,a),a.append(r),r.append(i),i.append(o),o.innerHTML="Back to Main",n.innerHTML="Ultimate ScriptSmith",this.addElemsToMain(this.form);const s=(0,d.default)("fieldset","log-in-fieldset"),c=(0,d.default)("legend","log-in-legend","Authentication form");this.form.append(s,this.loginButton,this.regButton);const f=(0,d.default)("div","email-container"),h=(0,d.default)("div","password-container");s.append(c,f,h);const m=(0,d.default)("div","hints-email"),v=(0,d.default)("div","hints-password");m.append(this.emailHint),v.append(this.passwordHint),f.append(this.email,m);const g=(0,d.default)("span","show-password");for(let e=0;e<2;e+=1)m.appendChild(this.emailHint.cloneNode(!0));for(let e=0;e<5;e+=1)v.appendChild(this.passwordHint.cloneNode(!0));h.append(this.password,g,v);const w=(0,d.createImage)(u.default,"Opened eye","opened-eye",new Image),y=(0,d.createImage)(p.default,"Closed eye","closed-eye",new Image);return(0,d.addEventHandler)("show-password","click",(()=>{"password"===this.password.type?(y.style.display="none",w.style.display="block",this.password.setAttribute("type","text"),g.append(w)):(w.style.display="none",y.style.display="flex",g.append(y),this.password.setAttribute("type","password"))})),g.append(y),(0,d.logInBtnEventHandler)(this.email,"email-hint","log-in"),(0,d.emailInputEventHandler)(this.email,"email-input","email-hint"),(0,d.passwordInputEventHandler)(this.password,"password-input","password-hint"),this.pageWrapper}}t.default=c},749:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=a(n(703));t.default=class{constructor(){this.pageWrapper=(0,r.default)("div","wrapper"),this.header=(0,r.default)("header"),this.headerWrapper=(0,r.default)("div","wrapper-header"),this.appName=(0,r.default)("h1"),this.main=(0,r.default)("main","log-in-main"),this.mainWrapper=(0,r.default)("div","wrapper-main"),this.footer=(0,r.default)("footer"),this.footerWrapper=(0,r.default)("div")}addElemsToHeader(...e){return this.header.append(this.headerWrapper),this.headerWrapper.append(...e)}addElemsToMain(...e){return this.main.append(this.mainWrapper),this.mainWrapper.append(...e)}addElemsToFooter(...e){return this.footer.append(this.footerWrapper),this.footerWrapper.append(...e)}renderPage(){return this.pageWrapper}}},703:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.createImage=t.addEventHandler=t.passwordInputEventHandler=t.emailInputEventHandler=t.logInBtnEventHandler=void 0,t.default=function(e,t="",n="",a=[]){const r=document.createElement(`${e}`);return t&&(r.className=`${t}`),n&&(r.innerHTML=`${n}`),a.length&&a.forEach((e=>r.setAttribute(e.name,e.value))),r};const n=/^\w+([.-]?\w+)*@\w+([.-]?\w+)*([.]\w{2,3})+$/,a=/[@]{1}/g,r=/\s/,i=["Email should be in a proper format (e.g. user@example.com, to-user@example.fr etc.)","Email should contain an arobase (@)","Email should not contain any leading or trailing whitespaces"];function o(e,t){var o;const s=Array.from(document.querySelectorAll(`.${t}`));n.test(e.value)?s.forEach((e=>{e.innerHTML=""})):(s.forEach(((e,t)=>{e.innerHTML=i[t]})),1===(null===(o=`${e.value}`.match(a))||void 0===o?void 0:o.length)&&(s[1].innerHTML=""),r.test(e.value)||(s[2].innerHTML=""))}t.logInBtnEventHandler=function(e,t,n){const a=document.querySelector(`.${n}`);null==a||a.addEventListener("click",(n=>{o(e,t),n.preventDefault()}))},t.emailInputEventHandler=function(e,t,n){const a=document.querySelector(`.${t}`),r=Array.from(document.querySelectorAll(`.${n}`));null==a||a.addEventListener("input",(()=>{o(e,n),0===e.value.length&&r.forEach((e=>{e.innerHTML=""}))}))};const s=["Password must be at least 8 characters long","Password must contain at least one uppercase letter (A-Z)","Password must contain at least one lowercase letter (a-z)","Password must contain at least one digit (0-9)","Password must not contain leading or trailing whitespace","Password must contain at least one special character (e.g., !@#$%^&*)"],l=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,d=[l,/(?=.*[A-Z])/,/(?=.*[a-z])/,/(?=.*\d)/,/^\S*$/,/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/];t.passwordInputEventHandler=function(e,t,n){const a=document.querySelector(`.${t}`),r=Array.from(document.querySelectorAll(`.${n}`));null==a||a.addEventListener("input",(()=>{!function(e,t){const n=Array.from(document.querySelectorAll(`.${t}`)),a=Array.from(document.querySelectorAll(`.${t}`));l.test(e.value)?a.forEach((e=>{e.innerHTML=""})):(n.forEach(((e,t)=>{e.innerHTML=s[t]})),d.forEach(((t,a)=>{t.test(e.value)?n[a].innerHTML="":n[a].innerHTML=s[a]})))}(e,n),0===e.value.length&&r.forEach((e=>{e.innerHTML=""}))}))},t.addEventHandler=function(e,t,n=(()=>{})){const a=document.querySelector(`.${e}`);null==a||a.addEventListener(`${t}`,n)},t.createImage=function(e,t,n,a=new Image){const r=a;return r.src=`${e}`,r.alt=`${t}`,r.className=`.${n}`,r}},156:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),n(699),(new(a(n(198)).default)).renderPage()},114:function(e,t,n){e.exports=n.p+"assets/close-eye.png"},381:function(e,t,n){e.exports=n.p+"assets/eye.png"}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var i=t[a]={exports:{}};return e[a].call(i.exports,i,i.exports,n),i.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},function(){var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var a=t.getElementsByTagName("script");if(a.length)for(var r=a.length-1;r>-1&&(!e||!/^http(s?):/.test(e));)e=a[r--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e}(),n(156)}();