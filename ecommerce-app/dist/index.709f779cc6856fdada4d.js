!function(){"use strict";var e={699:function(e,t,r){r.r(t)},198:function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(r(749));class i extends n.default{constructor(){super(),this.form=document.createElement("form"),this.email=document.createElement("input"),this.email.className="email-input",this.password=document.createElement("input"),this.password.className="password-input",this.loginButton=document.createElement("button")}renderPage(){document.body.append(this.pageWrapper),this.pageWrapper.append(this.header,this.main,this.footer),this.addElemsToHeader(this.appName),this.appName.innerHTML="Ultimate ScriptSmith",this.addElemsToMain(this.form);const e=document.createElement("fieldset"),t=document.createElement("legend");return this.form.append(e,this.loginButton),e.append(t,this.email,this.password),t.innerHTML="Authentication form",this.email.placeholder="Email",this.password.placeholder="Password",this.loginButton.innerHTML="Log in",this.pageWrapper}}t.default=i},749:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this.pageWrapper=document.createElement("div"),this.pageWrapper.className="wrapper",this.header=document.createElement("header"),this.headerWrapper=document.createElement("div"),this.headerWrapper.className="wrapper-header",this.appName=document.createElement("h1"),this.main=document.createElement("main"),this.mainWrapper=document.createElement("div"),this.mainWrapper.className="wrapper-main",this.footer=document.createElement("footer"),this.footerWrapper=document.createElement("div")}addElemsToHeader(...e){return this.header.append(this.headerWrapper),this.headerWrapper.append(...e)}addElemsToMain(...e){return this.main.append(this.mainWrapper),this.mainWrapper.append(...e)}addElemsToFooter(...e){return this.footer.append(this.footerWrapper),this.footerWrapper.append(...e)}renderPage(){return this.pageWrapper}}},156:function(e,t,r){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),r(699),(new(a(r(198)).default)).renderPage()}},t={};function r(a){var n=t[a];if(void 0!==n)return n.exports;var i=t[a]={exports:{}};return e[a].call(i.exports,i,i.exports,r),i.exports}r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(156)}();