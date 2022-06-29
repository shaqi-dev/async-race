(()=>{"use strict";var n={669:(n,e,t)=>{t.d(e,{Z:()=>i});var r=t(645),o=t.n(r)()((function(n){return n[1]}));o.push([n.id,".news {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 20px;\n}\n\n.news__item {\n    display: flex;\n    flex-direction: column;\n    background: #fff;\n    color: #344254;\n    line-height: 1.4;\n    font-family: 'Tinos', 'Georgia', serif;\n    overflow: hidden;\n    cursor: pointer;\n}\n\n.news__item:hover .news__meta-photo {\n    transform: scale(1.3) rotate(3deg);\n}\n\n.news__item .news__meta {\n    position: relative;\n    height: 200px;\n}\n\n.news__item .news__meta-photo {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    background-size: cover;\n    background-position: center;\n    transition: transform 0.2s;\n}\n\n.news__item .news__meta-details,\n.news__item .news__meta-details ul {\n    margin: auto;\n    padding: 0;\n    list-style: none;\n}\n\n.news__item .news__meta-details {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: -120%;\n    margin: auto;\n    transition: left 0.2s;\n    background: rgba(0, 0, 0, 0.6);\n    color: #fff;\n    padding: 10px;\n    width: 100%;\n    font-size: 0.9rem;\n}\n\n.news__item .news__description {\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n    padding: 1rem;\n    background: #fff;\n    position: relative;\n    z-index: 1;\n}\n\n.news__item .news__description h2 {\n    line-height: 1;\n    margin: 0;\n    font-size: 1.5rem;\n}\n\n.news__item .news__description h3 {\n    font-size: 0.9rem;\n    font-weight: 300;\n    text-transform: uppercase;\n    color: #a2a2a2;\n    margin: 0;\n}\n\n.news__item .news__description p {\n    font-size: 0.9rem;\n    margin: 0;\n}\n\n.news__item .news__description .news__read-more {\n    margin-top: auto;\n    text-align: right;\n    font-family: 'Georgia', serif;\n}\n\n.news__item .news__description .news__read-more a {\n    position: relative;\n    color: #344254;\n    display: inline-block;\n    position: relative;\n    text-decoration: none;\n    font-weight: 800;\n}\n\n.news__item .news__description .news__read-more a:after {\n    content: '→';\n    display: inline-block;\n    margin-left: -10px;\n    margin-top: -5px;\n    font-size: 1.4rem;\n    opacity: 0;\n    vertical-align: middle;\n    transition: margin 0.3s, opacity 0.3s;\n}\n\n.news__item .news__description .news__read-more a:hover:after {\n    margin-left: 5px;\n    opacity: 1;\n}\n\n.news__item:hover .news__meta-details {\n    left: 0%;\n}\n\n@media (min-width: 640px) {\n    .news__item {\n        flex-direction: row;\n        width: 100%;\n    }\n\n    .news__item .news__meta {\n        flex-basis: 40%;\n        height: auto;\n    }\n\n    .news__item .news__description {\n        flex-basis: 60%;\n    }\n\n    .news__item .news__description:before {\n        -webkit-transform: skewX(-3deg);\n        transform: skewX(-3deg);\n        content: '';\n        background: #fff;\n        width: 30px;\n        height: 102%;\n        position: absolute;\n        left: -10px;\n        top: 0;\n        bottom: 0;\n        z-index: -1;\n    }\n\n    .news__item.alt {\n        flex-direction: row-reverse;\n    }\n\n    .news__item.alt .news__description:before {\n        left: inherit;\n        right: -10px;\n        -webkit-transform: skew(3deg);\n        transform: skew(3deg);\n    }\n\n    .news__item.alt .news__meta-details {\n        padding-left: 25px;\n    }\n}\n\n@media (min-width: 750px) {\n    .news__item {\n        width: 100%;\n    }\n}\n\n@media (min-width: 800px) {\n    .news__item {\n        width: 700px;\n    }\n\n    .news__item .news__description h2 {\n        font-size: 1.7rem;\n    }\n    \n    .news__item .news__description h3 {\n        font-size: 1rem;\n    }\n\n    .news__item .news__description p {\n        font-size: 1rem;\n    }\n}\n\n@media (min-width: 1280px) {\n    .news {\n        max-width: 1200px;\n        flex-direction: row;\n        flex-wrap: wrap;\n        gap: 40px;\n    }\n\n    .news__item {\n        width: 580px;\n        align-self: stretch;\n    }\n}\n",""]);const i=o},501:(n,e,t)=>{t.d(e,{Z:()=>i});var r=t(645),o=t.n(r)()((function(n){return n[1]}));o.push([n.id,".sources {\n    background: #344254;\n    display: flex;\n    flex-wrap: nowrap;\n    max-width: 1200px;\n    width: 100%;\n    height: 100%;\n    margin: 0 auto;\n    overflow: auto;\n    align-items: center;\n    font-weight: 400;\n    font-size: 1rem;\n    font-family: 'Georgia', serif;\n}\n\n@media (min-width: 800px) {\n    .sources {\n        font-size: 1.125rem;\n    }\n}\n\n.source__item {\n    background: none;\n    font: inherit;\n    line-height: 2;\n    padding: 10px 15px;\n    color: #ffffff;\n    transition: 0.1s;\n    cursor: pointer;\n}\n\n.source__item:hover,\n.source__item:focus {\n    background: #48576c;\n}\n\n.source__item-name {\n    font-weight: 400;\n    white-space: nowrap;\n}\n",""]);const i=o},767:(n,e,t)=>{t.d(e,{Z:()=>i});var r=t(645),o=t.n(r)()((function(n){return n[1]}));o.push([n.id,"@import url(https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap);"]),o.push([n.id,"@import url(http://fonts.cdnfonts.com/css/georgia);"]),o.push([n.id,"body {\n    margin: 0;\n    min-height: 100vh;\n    display: flex;\n    flex-direction: column;\n    color: #151515;\n    background: #f5f5f5;\n    font-family: 'Tinos', 'Georgia', serif;\n}\n\n@media (max-width: 1279px) {\n    body {\n        padding: 0 40px;\n    }\n}\n\nheader {\n    min-height: 15vh;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\nheader h1 {\n    text-align: center;\n    font-size: 2.5rem;\n    font-weight: 700;\n    margin: 0;\n}\n\n@media (min-width: 375px) {\n    header h1 {\n        font-size: 3rem;\n    }\n}\n\n@media (min-width: 800px) {\n    header h1 {\n        font-size: 3.75rem;\n    }\n}\n\nmain {\n    min-height: 75vh;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 30px;\n}\n\nfooter {\n    display: flex;\n    gap: 40px;\n    bottom: 0px;\n    min-height: 10vh;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\nfooter p {\n    text-align: center;\n    margin: 0;\n    font-size: 0.875rem;\n    color: #666666;\n}\n\nfooter p a {\n    text-decoration: none;\n    font-size: 0.875rem;\n    color: #666666;\n}\n\nfooter a:hover {\n    text-decoration: underline;\n}\n\nfooter .creators {\n    display: flex;\n    gap: 10px;\n    align-items: center;\n}\n\nfooter .rsschool-logo {\n    height: 32px;\n}",""]);const i=o},645:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t=n(e);return e[2]?"@media ".concat(e[2]," {").concat(t,"}"):t})).join("")},e.i=function(n,t,r){"string"==typeof n&&(n=[[null,n,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var s=this[i][0];null!=s&&(o[s]=!0)}for(var a=0;a<n.length;a++){var c=[].concat(n[a]);r&&o[c[0]]||(t&&(c[2]?c[2]="".concat(t," and ").concat(c[2]):c[2]=t),e.push(c))}},e}},379:(n,e,t)=>{var r,o=function(){var n={};return function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}n[e]=t}return n[e]}}(),i=[];function s(n){for(var e=-1,t=0;t<i.length;t++)if(i[t].identifier===n){e=t;break}return e}function a(n,e){for(var t={},r=[],o=0;o<n.length;o++){var a=n[o],c=e.base?a[0]+e.base:a[0],l=t[c]||0,d="".concat(c," ").concat(l);t[c]=l+1;var u=s(d),m={css:a[1],media:a[2],sourceMap:a[3]};-1!==u?(i[u].references++,i[u].updater(m)):i.push({identifier:d,updater:h(m,e),references:1}),r.push(d)}return r}function c(n){var e=document.createElement("style"),r=n.attributes||{};if(void 0===r.nonce){var i=t.nc;i&&(r.nonce=i)}if(Object.keys(r).forEach((function(n){e.setAttribute(n,r[n])})),"function"==typeof n.insert)n.insert(e);else{var s=o(n.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(e)}return e}var l,d=(l=[],function(n,e){return l[n]=e,l.filter(Boolean).join("\n")});function u(n,e,t,r){var o=t?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(n.styleSheet)n.styleSheet.cssText=d(e,o);else{var i=document.createTextNode(o),s=n.childNodes;s[e]&&n.removeChild(s[e]),s.length?n.insertBefore(i,s[e]):n.appendChild(i)}}function m(n,e,t){var r=t.css,o=t.media,i=t.sourceMap;if(o?n.setAttribute("media",o):n.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),n.styleSheet)n.styleSheet.cssText=r;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(r))}}var f=null,p=0;function h(n,e){var t,r,o;if(e.singleton){var i=p++;t=f||(f=c(e)),r=u.bind(null,t,i,!1),o=u.bind(null,t,i,!0)}else t=c(e),r=m.bind(null,t,e),o=function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(t)};return r(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;r(n=e)}else o()}}n.exports=function(n,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=(void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r));var t=a(n=n||[],e);return function(n){if(n=n||[],"[object Array]"===Object.prototype.toString.call(n)){for(var r=0;r<t.length;r++){var o=s(t[r]);i[o].references--}for(var c=a(n,e),l=0;l<t.length;l++){var d=s(t[l]);0===i[d].references&&(i[d].updater(),i.splice(d,1))}t=c}}}}},e={};function t(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={id:r,exports:{}};return n[r](i,i.exports,t),i.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{var n;!function(n){n[n.ClientErrorUnauthorized=401]="ClientErrorUnauthorized",n[n.ClientErrorNotFound=404]="ClientErrorNotFound"}(n||(n={}));var e;!function(n){n.SOURCES="sources",n.EVERYTHING="everything"}(e||(e={}));var r=t(379),o=t.n(r),i=t(669);o()(i.Z,{insert:"head",singleton:!1}),i.Z.locals;var s=t(501);o()(s.Z,{insert:"head",singleton:!1}),s.Z.locals;class a{constructor(){this.news=new class{draw(n){const e=n.length>=10?n.filter(((n,e)=>e<10)):n,t=document.createDocumentFragment(),r=document.querySelector("#newsItemTemp");e.forEach(((n,e)=>{const o=r.content.cloneNode(!0);e%2&&o.querySelector(".news__item").classList.add("alt"),o.querySelector(".news__meta-photo").style.backgroundImage=`url(${n.urlToImage||"img/news_placeholder.jpg"})`,o.querySelector(".news__meta-author").textContent=n.author||n.source.name,o.querySelector(".news__meta-date").textContent=n.publishedAt.slice(0,10).split("-").reverse().join("-"),o.querySelector(".news__description-title").textContent=n.title,o.querySelector(".news__description-source").textContent=n.source.name,o.querySelector(".news__description-content").textContent=n.description,o.querySelector(".news__read-more a").setAttribute("href",n.url),t.append(o)}));const o=document.querySelector(".news");o.innerHTML="",o.appendChild(t)}},this.sources=new class{draw(n){const e=document.createDocumentFragment(),t=document.querySelector("#sourceItemTemp");n.forEach((n=>{const r=t.content.cloneNode(!0);r.querySelector(".source__item-name").textContent=n.name,r.querySelector(".source__item").setAttribute("data-source-id",n.id),e.append(r)})),document.querySelector(".sources").append(e)}}}drawNews(n){const e=(null==n?void 0:n.articles)?null==n?void 0:n.articles:[];this.news.draw(e)}drawSources(n){const e=(null==n?void 0:n.sources)?null==n?void 0:n.sources:[];this.sources.draw(e)}}var c=t(767);o()(c.Z,{insert:"head",singleton:!1}),c.Z.locals,(new class{constructor(){this.controller=new class extends class extends class{constructor(n,e){this.baseLink=n,this.options=e}getResp({endpoint:n,options:e},t=(()=>{console.error("No callback for GET response")})){this.load("GET",n,t,e)}errorHandler(e){if(!e.ok)throw e.status!==n.ClientErrorUnauthorized&&e.status!==n.ClientErrorNotFound||console.log(`Sorry, but there is ${e.status} error: ${e.statusText}`),Error(e.statusText);return e}makeUrl(n,e){const t=Object.assign(Object.assign({},this.options),n);let r=`${this.baseLink}${e}?`;return Object.keys(t).forEach((n=>{r+=`${n}=${t[n]}&`})),r.slice(0,-1)}load(n,e,t,r={}){fetch(this.makeUrl(r,e),{method:n}).then((n=>this.errorHandler(n))).then((n=>n.json())).then((n=>t(n))).catch((n=>console.error(n)))}}{constructor(){super("https://newsapi.org/v2/",{apiKey:"cba7e90412ea4943b8c3f87f2503e841"})}}{getSources(n){super.getResp({endpoint:e.SOURCES},n)}getNews(n,t){let r=n.target;const o=n.currentTarget;for(;r!==o;){if(r.classList.contains("source__item")){const n=r.getAttribute("data-source-id");return void(n&&o.getAttribute("data-source")!==n&&(o.setAttribute("data-source",n),super.getResp({endpoint:e.EVERYTHING,options:{sources:n}},t)))}r=r.parentNode}}},this.view=new a}start(){document.querySelector(".sources").addEventListener("click",(n=>this.controller.getNews(n,(n=>this.view.drawNews(n))))),this.controller.getSources((n=>this.view.drawSources(n)))}}).start()})()})();