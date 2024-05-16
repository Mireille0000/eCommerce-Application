!function(){"use strict";var e={699:function(e,t,n){n.r(t)},952:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this.appName=document.createElement("h1"),this.navBar=document.createElement("nav"),this.navigation=document.createElement("ul"),this.navItem=document.createElement("li"),this.link=document.createElement("a")}}},198:function(e,t,n){var a=this&&this.__createBinding||(Object.create?function(e,t,n,a){void 0===a&&(a=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,a,r)}:function(e,t,n,a){void 0===a&&(a=n),e[a]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&a(t,e,n);return r(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const l=o(n(749)),s=o(n(952)),d=i(n(703));class u extends l.default{constructor(){super(),this.appName.className="log-in-heading",this.form=(0,d.default)("form","log-in-form"),this.email=(0,d.default)("input","email-input","",[{name:"placeholder",value:"Email"}]),this.emailHint=(0,d.default)("span","email-hint"),this.passwordHint=(0,d.default)("span","password-hint"),this.password=(0,d.default)("input","password-input","",[{name:"placeholder",value:"Password"}]),this.loginButton=(0,d.default)("button","log-in","Log in"),this.regButton=(0,d.default)("button","sign-up","Sign up")}renderPage(){document.body.append(this.pageWrapper),this.pageWrapper.append(this.header,this.main,this.footer);const e=new s.default,t=[e.appName,e.navBar,e.navigation,e.navItem,e.link];e.navBar.className="nav-bar";const[n,a,r,i,o]=t;this.addElemsToHeader(n,a),a.append(r),r.append(i),i.append(o),o.innerHTML="Back to Main",n.innerHTML="Ultimate ScriptSmith",this.addElemsToMain(this.form);const l=(0,d.default)("fieldset","log-in-fieldset"),u=(0,d.default)("legend","log-in-legend","Authentication form");this.form.append(l,this.loginButton,this.regButton);const p=(0,d.default)("div","email-container"),c=(0,d.default)("div","password-container");l.append(u,p,c);const f=(0,d.default)("div","hints-email"),h=(0,d.default)("div","hints-password");f.append(this.emailHint),h.append(this.passwordHint),p.append(this.email,f);for(let e=0;e<2;e+=1)f.appendChild(this.emailHint.cloneNode(!0));for(let e=0;e<5;e+=1)h.appendChild(this.passwordHint.cloneNode(!0));return c.append(this.password,h),(0,d.logInBtnEventHandler)(this.email,"email-hint","log-in"),(0,d.emailInputEventHandler)(this.email,"email-input","email-hint"),(0,d.passwordInputEventHandler)(this.password,"password-input","password-hint"),this.pageWrapper}}t.default=u},749:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=a(n(703));t.default=class{constructor(){this.pageWrapper=(0,r.default)("div","wrapper"),this.header=(0,r.default)("header"),this.headerWrapper=(0,r.default)("div","wrapper-header"),this.appName=(0,r.default)("h1"),this.main=(0,r.default)("main","log-in-main"),this.mainWrapper=(0,r.default)("div","wrapper-main"),this.footer=(0,r.default)("footer"),this.footerWrapper=(0,r.default)("div")}addElemsToHeader(...e){return this.header.append(this.headerWrapper),this.headerWrapper.append(...e)}addElemsToMain(...e){return this.main.append(this.mainWrapper),this.mainWrapper.append(...e)}addElemsToFooter(...e){return this.footer.append(this.footerWrapper),this.footerWrapper.append(...e)}renderPage(){return this.pageWrapper}}},703:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.passwordInputEventHandler=t.emailInputEventHandler=t.logInBtnEventHandler=void 0,t.default=function(e,t="",n="",a=[]){const r=document.createElement(`${e}`);return t&&(r.className=`${t}`),n&&(r.innerHTML=`${n}`),a.length&&a.forEach((e=>r.setAttribute(e.name,e.value))),r};const n=/^\w+([.-]?\w+)*@\w+([.-]?\w+)*([.]\w{2,3})+$/,a=/[@]{1}/g,r=/\s/,i=["Email should be in a proper format (e.g. user@example.com, to-user@example.fr etc.)","Email should contain an arobase (@)","Email should not contain any leading or trailing whitespaces"];function o(e,t){var o;const l=Array.from(document.querySelectorAll(`.${t}`));n.test(e.value)?l.forEach((e=>{e.innerHTML=""})):(l.forEach(((e,t)=>{e.innerHTML=i[t]})),1===(null===(o=`${e.value}`.match(a))||void 0===o?void 0:o.length)&&(l[1].innerHTML=""),r.test(e.value)||(l[2].innerHTML=""))}t.logInBtnEventHandler=function(e,t,n){const a=document.querySelector(`.${n}`);null==a||a.addEventListener("click",(n=>{o(e,t),n.preventDefault()}))},t.emailInputEventHandler=function(e,t,n){const a=document.querySelector(`.${t}`),r=Array.from(document.querySelectorAll(`.${n}`));null==a||a.addEventListener("input",(()=>{o(e,n),0===e.value.length&&r.forEach((e=>{e.innerHTML=""}))}))};const l=["Password must be at least 8 characters long","Password must contain at least one uppercase letter (A-Z)","Password must contain at least one lowercase letter (a-z)","Password must contain at least one digit (0-9)","Password must not contain leading or trailing whitespace","Password must contain at least one special character (e.g., !@#$%^&*)"],s=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,d=[s,/(?=.*[A-Z])/,/(?=.*[a-z])/,/(?=.*\d)/,/^\S*$/,/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/];t.passwordInputEventHandler=function(e,t,n){const a=document.querySelector(`.${t}`),r=Array.from(document.querySelectorAll(`.${n}`));null==a||a.addEventListener("input",(()=>{!function(e,t){const n=Array.from(document.querySelectorAll(`.${t}`)),a=Array.from(document.querySelectorAll(`.${t}`));s.test(e.value)?(console.log("valid"),a.forEach((e=>{e.innerHTML=""}))):(n.forEach(((e,t)=>{e.innerHTML=l[t]})),d.forEach(((t,a)=>{t.test(e.value)?n[a].innerHTML="":n[a].innerHTML=l[a]})))}(e,n),0===e.value.length&&r.forEach((e=>{e.innerHTML=""}))}))}},156:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),n(699),(new(a(n(198)).default)).renderPage()}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var i=t[a]={exports:{}};return e[a].call(i.exports,i,i.exports,n),i.exports}n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(156)}();