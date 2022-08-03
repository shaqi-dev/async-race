(()=>{"use strict";const e=(e,t,n,a)=>{const r=document.createElement(e);if(a&&(r.innerText=a),t)if("string"==typeof t)r.classList.add(t);else{const e=t.filter((e=>void 0!==e));e.length>0&&r.classList.add(...e)}if(n){let e;"string"==typeof n&&document.querySelector(n)?(e=document.querySelector(n),e.append(r)):n instanceof HTMLElement&&(e=n,e.append(r))}return r},t=(t,n)=>{const{label:a,type:r}=t,i=e("button","Button-module__root--cpeag",n,a);return i.type=r||"button",i},n=()=>{const{view:e,viewSettings:t}=F;t.garageBtn.disabled="winners"!==e,t.winnersBtn.disabled="winners"===e,t.title.innerText="winners"===e?F.winnersViewTitle:F.garageViewTitle,t.page.innerText="winners"===e?F.winnersPageTitle:F.garagePageTitle,t.prev.disabled="winners"===e?F.winnersPrevBtnStatus:F.garagePrevBtnStatus,t.next.disabled="winners"===e?F.winnersNextBtnStatus:F.garageNextBtnStatus},a=e=>{const{main:t,winners:a,garage:r}=F;F.view=e,sessionStorage.setItem("view",e),t.innerHTML="","garage"===e?t.append(r.container):t.append(a.container),n()},r=async e=>{"winners"===F.view?(F.winnersPage=F.winnersPage+e,await F.winners.table.update(),n()):(F.garagePage=F.garagePage+e,F.garage.update&&await F.garage.update(),n())},i=(e,t)=>{let n=parseInt(e.substring(1,3),16),a=parseInt(e.substring(3,5),16),r=parseInt(e.substring(5,7),16);return n=parseInt(""+n*(100+t)/100),a=parseInt(""+a*(100+t)/100),r=parseInt(""+r*(100+t)/100),n=n<255?n:255,a=a<255?a:255,r=r<255?r:255,"#"+(1==n.toString(16).length?"0"+n.toString(16):n.toString(16))+(1==a.toString(16).length?"0"+a.toString(16):a.toString(16))+(1==r.toString(16).length?"0"+r.toString(16):r.toString(16))},s=e=>{const t=i(e,-40),n=i(e,40);return`\n  <svg version="1.2" baseProfile="tiny-ps" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 569" width="1280" height="569">\n      <path fill-rule="evenodd" style="fill: ${e}" d="M382.2 112.9L386.9 115.9L405.7 114.5C535.1 105 645.1 108.8 694.9 124.5C720.8 132.7 798.8 173.4 880.1 221.1L903.7 235L926.6 235C979.6 235.1 1079.7 245.3 1132 256.1C1185.5 267.1 1226.6 278.7 1248.8 289.1C1266.8 297.5 1272.5 303 1277.1 316.5C1279.3 323 1279.5 324.9 1279.4 342.5C1279.3 361.6 1278.4 372.3 1275.3 392.2C1273.7 402.4 1273.7 403.3 1275.5 411.2C1276.6 415.8 1277.4 423.1 1277.5 427.5C1277.5 434.5 1277.1 436.1 1274.7 440.2C1269.6 448.9 1262.3 452.6 1244.3 455.4C1235.1 456.8 1197.2 459.6 1196.5 458.8C1196.3 458.6 1196.9 455.3 1197.7 451.5C1199.7 442.6 1200 416.9 1198.2 408.5C1191.9 379 1176.1 355.5 1152.2 339.8C1112.6 314 1067.8 314.9 1027.9 342.2C999.7 361.4 984.8 386.1 982 418.1C980.9 431.7 983.2 455.5 986.5 464.2C987.2 465.9 972.5 466 687 466L386.8 466L387.6 457.8C389.2 442.4 388.5 416.5 386.3 405.9C379.5 374.1 358.1 347.6 326.5 331.7C277.7 307.3 214.1 326.7 186 374.6C176.4 391.1 172.1 407.5 171.4 430.5L170.9 446.5L167.7 446.3C155.9 445.6 69.4 437.4 59 435.9C40.2 433.3 25.2 425.7 23.5 417.8C22.6 413.8 17.6 408.4 10.3 403.5C7.1 401.4 4.4 399.5 4.2 399.4C3 398.8 0.9 380.4 1.4 375C2.4 365.3 2.4 364.9 1.1 359.1C-1.5 346.7 0.9 323 5.9 312.4C8.6 306.6 14 301 16.9 301C17.9 301 18 298.9 17.5 292.2C16 273 16.4 265.1 19.4 255.2C22.4 245.2 22.3 241.1 18.9 237.5C17.1 235.5 17.1 235.3 21.8 227.5L26.5 219.5L38 219.3C63.8 218.8 89.9 216.2 100 213C101.9 212.4 110.4 211.5 118.9 211C138.8 209.7 144.7 208.3 161 200.6C186.5 188.5 243.9 164.9 321.3 134.5C332.2 130.2 341.5 126 341.9 125.1C342.4 124.2 343.1 121 343.5 118C344.6 108.7 345.3 107.7 352.5 105.9C359.9 104 373 107.1 382.2 112.9ZM542.4 132.5L523 132.4C501 132.4 496.6 132.5 472 134C390.1 139.1 347.1 148.2 310.2 168C296.6 175.4 292.2 178.8 291 182.8C288.2 192.9 290.7 206.3 296.9 215.4C307.8 231.3 318.5 235.3 354.2 236.9C392.4 238.7 558.9 243.4 559.6 242.7C559.9 242.4 555.8 211.1 552.5 188.5C549.5 167.5 545 141.5 543.7 137L542.4 132.5ZM583 134L578.3 134L595.8 188L613.4 242L794.2 242L793.3 237.7C791.8 230.1 792.4 222.7 794.8 218.8C797.4 214.7 804 211 808.8 211C810.6 211 812 210.7 812 210.2C811.9 209 788.1 191.9 774 183.1C747.1 166.2 723 155.1 702 149.9C680.3 144.6 646.9 139.6 608.6 136C597.1 134.9 585.5 134 583 134Z" />\n      <path fill-rule="evenodd" style="fill: ${t}" d="M306.2 328.9C343.9 338.7 372.8 367.9 382.2 405.7C385.2 417.6 385.4 440.7 382.6 452.4C370.9 502.4 325.7 536.6 275 533.7C230 531.1 191.6 499.6 180.3 456C177.2 444.2 176.2 426.7 177.9 415C184.3 371.5 218.6 335.7 261.7 327.5C272.6 325.5 295.7 326.2 306.2 328.9ZM267.5 357.4C252.7 360.2 240.1 367 229 378C217.8 389.2 211.4 401.4 208.4 416.6C197.9 471.7 252.2 518 305.3 499.4C328.4 491.4 346.8 471.2 352.6 447.5C355 438 354.9 420.7 352.6 412C348.5 396.9 339.1 382.1 327.5 372.7C320.4 367 307.9 360.6 299.5 358.5C291 356.3 275.9 355.8 267.5 357.4Z" />\n      <path style="fill: ${n}" d="M291.8 383.2C292 392.2 292.5 399.9 293 400.4C294.7 402.1 303.8 394.6 313.1 383.8L318.2 378.1L313.4 375C308.2 371.7 300.3 368.5 294.9 367.5L291.5 366.9L291.8 383.2Z" />\n      <path style="fill: ${n}" d="M259.1 370C252.9 372.2 242.4 378.2 242.7 379.4C243 380.7 266.4 401 267.6 401C268.3 401 269.1 400.3 269.4 399.4C270.2 397.4 270.2 386.7 269.3 376.2C268.6 366.7 268.5 366.6 259.1 370Z" />\n      <path style="fill: ${n}" d="M320.9 404.5C315.2 410.9 310.4 416.8 310.2 417.6C309.6 420.1 314.8 421.1 325.9 420.5C331.7 420.2 338 419.7 339.8 419.4C343.1 418.9 343.2 418.8 342.5 415.2C341.8 410.8 336.1 398.5 333.3 395.1L331.4 392.7L320.9 404.5Z" />\n      <path style="fill: ${n}" d="M226 399.1C222.9 403.5 219.2 412.4 218.3 417.7L217.7 421L233.2 421C249.7 421 253.3 420.1 251.3 416.6C250 414.2 230.9 395 229.9 395C229.4 395 227.7 396.8 226 399.1Z" />\n      <path style="fill: ${n}" d="M278.6 404.6C275 408.1 278.6 413.3 283 411C285.6 409.6 285.6 405.4 283.1 404C280.6 402.7 280.4 402.7 278.6 404.6Z" />\n      <path style="fill: ${n}" d="M275.1 421.4C269.4 424.6 268.3 432.5 272.9 437.1C277.2 441.3 283 441.4 287.2 437.2C291.4 433 291.3 427.2 287.1 422.9C283.8 419.7 279.3 419.1 275.1 421.4Z" />\n      <path style="fill: ${n}" d="M256 426.4C254.1 428.7 255.2 432.5 257.8 432.8C262.2 433.5 264.5 429.6 261.4 426.6C259.5 424.6 257.6 424.6 256 426.4Z" />\n      <path style="fill: ${n}" d="M300.2 427.6C297.5 429.5 297.4 431.2 299.9 433.4C302.4 435.7 306 434 306 430.5C306 427.2 303 425.6 300.2 427.6Z" />\n      <path style="fill: ${n}" d="M224.5 440.7C216.8 441.3 216.9 441.2 218.6 447.2C220.2 452.7 224.7 461.8 227.8 465.8L229.6 468.1L239.9 455.9C245.6 449.2 250.3 443 250.4 442.1C250.5 440.7 249 440.5 240 440.4C234.2 440.4 227.3 440.5 224.5 440.7Z" />\n      <path style="fill: ${n}" d="M316.5 441.9C312.1 442.3 310.4 442.9 310.2 444.1C309.9 445.7 331.2 467 333 467C335.2 467 341.6 452.9 343.5 444.2L344.2 441L333.3 441.2C327.4 441.3 319.8 441.6 316.5 441.9Z" />\n      <path style="fill: ${n}" d="M277.6 448.6C275.7 450.4 275.7 450.6 277 453.1C277.6 454.2 279.1 455 280.5 455C282.5 455 285 452.6 285 450.6C285 449.6 281.8 447 280.5 447C279.8 447 278.4 447.7 277.6 448.6Z" />\n      <path style="fill: ${n}" d="M258.9 465.7C250.3 474.7 245 480.8 245 481.9C245 484.4 262.9 492 268.6 492L271.3 492L270.6 477.7C269.7 461.1 269.3 459 267.1 459C266.2 459 262.5 462 258.9 465.7Z" />\n      <path style="fill: ${n}" d="M293.6 459.9C293 460.9 291.2 476.7 290.7 485.7C290.4 491.7 290.5 492 292.6 492C300.5 492 318.8 485.2 317.4 482.8C316.9 482.1 312.1 476.4 306.6 470.2C297.3 459.7 294.9 457.8 293.6 459.9Z" />\n      <path fill-rule="evenodd" style="fill: ${t}" d="M1177.4 372.3C1211.7 424 1193.4 494.1 1138.2 522.3C1112.5 535.4 1085.4 537.5 1058 528.4C1045.7 524.3 1038.1 520.2 1026.9 511.8C988.2 482.6 975.7 427.1 998 383C1012.6 354.1 1040.5 333.3 1072.3 327.5C1112.3 320.2 1154.9 338.4 1177.4 372.3ZM1068.9 359.5C1036.5 370 1015.3 400.5 1017.3 434C1018.9 460.8 1034.6 484.4 1058.5 496C1104.4 518.2 1157.3 489.4 1164 438.6C1168.7 403.3 1145.6 368.8 1110.8 359C1097.8 355.3 1081.1 355.5 1068.9 359.5Z" />\n      <path style="fill: ${n}" d="M1101.7 383.2C1102 392.2 1102.6 399.9 1103.1 400.4C1104.4 401.8 1108.4 398.6 1118.6 388.2L1128.1 378.5L1125.8 376.7C1120.8 372.7 1106.9 367 1102.3 367C1101.3 367 1101.2 370.3 1101.7 383.2Z" />\n      <path style="fill: ${n}" d="M1070.5 369.4C1065.5 371 1057.2 375.2 1054.2 377.6L1051.9 379.5L1064 390.2C1070.7 396.2 1076.8 401 1077.5 401C1079.8 401 1080.2 397.1 1079.5 382.4C1078.7 366.2 1079.1 366.7 1070.5 369.4Z" />\n      <path style="fill: ${n}" d="M1130.7 404.6C1124.8 411.1 1120 417.2 1120 418.2C1120 419.3 1121.1 420 1123.8 420.4C1128.2 421.1 1151.6 419.7 1152.7 418.7C1154.2 417.1 1147.6 400.4 1143.3 395.1L1141.4 392.7L1130.7 404.6Z" />\n      <path style="fill: ${n}" d="M1036.2 398.7C1032.3 404.9 1029.2 412.1 1028.4 417.1L1027.7 421L1042.9 421C1051.5 421 1059 420.5 1060.1 420C1061.8 419 1061.9 418.7 1060.6 416.2C1059.8 414.7 1054.7 409.1 1049.2 403.7L1039.3 393.8L1036.2 398.7Z" />\n      <path style="fill: ${n}" d="M1088.8 404.1C1086.4 405.5 1086.5 409.7 1089 411C1093.4 413.3 1097 408.1 1093.4 404.6C1091.6 402.7 1091.1 402.7 1088.8 404.1Z" />\n      <path style="fill: ${n}" d="M1085.1 421.3C1080.2 424.2 1078.5 431.4 1081.6 435.9C1082.5 437.2 1084.8 438.8 1086.6 439.6C1089.5 440.8 1090.5 440.8 1093.4 439.6C1103.3 435.5 1101.9 421.6 1091.5 420.4C1089.1 420.1 1086.5 420.5 1085.1 421.3Z" />\n      <path style="fill: ${n}" d="M1066 426.4C1064.1 428.7 1065.2 432.5 1067.8 432.8C1072.2 433.5 1074.5 429.6 1071.4 426.6C1069.5 424.6 1067.6 424.6 1066 426.4Z" />\n      <path style="fill: ${n}" d="M1109.6 427.6C1108.7 428.4 1108 429.8 1108 430.5C1108 431.8 1110.6 435 1111.6 435C1113.6 435 1116 432.5 1116 430.5C1116 429.1 1115.2 427.6 1114.1 427C1111.6 425.7 1111.4 425.7 1109.6 427.6Z" />\n      <path style="fill: ${n}" d="M1033.5 440.9C1027.5 441.5 1027.5 441.5 1027.8 444.5C1028.7 451.4 1038.2 469.3 1040 467.4C1045.7 461.3 1061 442.4 1060.7 441.6C1060.3 440.4 1043.1 439.9 1033.5 440.9Z" />\n      <path style="fill: ${n}" d="M1126.7 441.7C1119.9 442.2 1118.8 443.6 1122 447.7C1124.3 450.8 1142 467 1143 467C1143.3 467 1145 464.6 1146.7 461.7C1149.6 456.9 1151.9 450.6 1153.4 443.7L1154 441L1143.3 441.2C1137.3 441.3 1129.9 441.5 1126.7 441.7Z" />\n      <path style="fill: ${n}" d="M1087 449C1085.4 452.1 1087.4 455.2 1090.8 454.8C1092.9 454.6 1093.6 453.9 1093.8 451.6C1094.3 447.1 1089.1 445.1 1087 449Z" />\n      <path style="fill: ${n}" d="M1065.1 469.7C1059.5 475.6 1055 481 1055 481.7C1055 484.5 1072.2 492 1078.7 492L1081.3 492L1080.6 479.7C1079.6 461.8 1079.1 459 1077 459C1076 459 1070.7 463.8 1065.1 469.7Z" />\n      <path style="fill: ${n}" d="M1103.5 459.9C1102.8 461.1 1101.2 474.3 1100.6 484.2C1100.2 491.9 1100.2 492 1102.5 492C1107 492 1115.5 489.8 1121.8 486.9L1128.2 484L1126.3 481.7C1119.8 473.5 1106.5 459 1105.4 459C1104.7 459 1103.9 459.4 1103.5 459.9Z" />\n  </svg>`},l={root:"WinnersTable-module__root--K3GdF",item:"WinnersTable-module__item--z3nFm","item--wins":"WinnersTable-module__item--wins--jggjW","item--time":"WinnersTable-module__item--time--MD0qf",winner:"WinnersTable-module__winner--RtsjJ"},o=(e,t,n)=>{let a,r;return a=!(1!==t),r=!!(e/(t*n)<=1),[a,r]},d="http://localhost:3000",u=e=>new Error(`Cannot ${e}, get: UNEXPECTED_RESPONSE_STATUS`),c=e=>new Error(`Cannot ${e}, get: NOT_FOUND`),g=e=>new Error(`Cannot ${e}, get: BAD_REQUEST`),C=e=>new Error(`Cannot ${e}, get: TOO_MANY_REQUESTS`),p=e=>new Error(`Cannot ${e}, get: INTERNAL_SERVER_ERROR`),w=`${d}/garage`,m=async e=>{try{const t=await fetch(`${w}/${e}`);return 200===t.status?[await t.json(),null]:[null,u("Get Car")]}catch(e){return[null,e]}},y=async e=>{try{if(201===(await fetch(`${w}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).status)return;return u("Create Car")}catch(e){return e}},f=`${d}/winners`,h=async()=>{const{winners:t,winnersSort:n,winnersOrder:a,winnersPage:r,winnersPerPage:i,viewSettings:d}=F,[c,g]=await(async(e,t,n=1,a=10)=>{try{const r=await fetch(`${f}?_limit=${a}&_page=${n}&_sort=${e}&_order=${t}`);return 200===r.status?[{winners:await r.json(),count:Number(r.headers.get("X-Total-Count"))||0},null]:[null,u("Get Winners")]}catch(e){return[null,e]}})(n,a,r);if(g)console.error(g);else{F.winnersViewTitle=`Winners (${c.count})`,F.winnersPageTitle=`Page #${r}`,t.table.body.innerHTML="",c.winners.map(((n,a)=>(async(t,n,a)=>{const{id:r,wins:i,time:o}=t,[d,u]=await m(r),c=e("tr",l.winner,a);if(u)console.error(u);else{const{name:t,color:a}=d;e("td",null,c,`${n}`);const r=e("td",null,c);e("td",null,c,t),e("td",null,c,`${i}`),e("td",null,c,`${o}`),r.innerHTML=s(a)}return c})(n,a+1,t.table.body)));const[n,a]=o(c.count,r,i);F.winnersPrevBtnStatus=n,F.winnersNextBtnStatus=a}d.update&&d.update()},S=t=>{const n=e("table",l.root,t),a=e("thead",l.head,n),r=e("tbody",l.body,n);return e("th",l.item,a,"Position"),e("th",l.item,a,"Car"),e("th",l.item,a,"Name"),{container:n,head:a,body:r,wins:e("th",[l.item,l["item--wins"]],a,"Wins"),time:e("th",[l.item,l["item--time"]],a,"Time"),update:h}};var v,b;!function(e){e.ID="id",e.WINS="wins",e.TIME="time"}(v||(v={})),function(e){e.ASC="ASC",e.DESC="DESC"}(b||(b={}));const L=()=>{F.winnersOrder===b.ASC?F.winnersOrder=b.DESC:F.winnersOrder=b.ASC},$=()=>{F.winnersSort!==v.WINS?(F.winnersSort=v.WINS,F.winnersOrder=b.DESC):L(),F.winners.table.update()},_=()=>{F.winnersSort!==v.TIME?(F.winnersSort=v.TIME,F.winnersOrder=b.ASC):L(),F.winners.table.update()},M=t=>{const n=e("div","Winners-module__root--ttgTj",t);return{container:n,table:S(n)}},T=["Aston Martin","Audi","Bentley","BMW","Bugatti","Cadillac","Chevrolet","Chrysler","Citroën","Dodge","Ferrari","Fiat","Ford","Honda","Hummer","Hyundai","Infiniti","Jaguar","Jeep","Kia","Lada","Lamborghini","Land Rover","Lexus","Lotus","Maserati","Maybach","Mazda","McLaren","Mercedes-Benz","Mitsubishi","Nissan","Opel","Peugeot","Porsche","Renault","Rolls-Royce","Skoda","Subaru","Suzuki","Tesla","Toyota","Volkswagen","Volvo"],E=["Corolla","Camry","RAV4","CR-V","Sentra","Civic","HR-V","Accord","Speedtail","Veyron","Agera R","Chiron","Venom GT","3 Series","X1","Z4","X7","5 Series","7 Series","X3","M340i","M4 Competition"],P=`${d}/engine`,B=async(e,t)=>{try{const n=await fetch(`${P}?id=${e}&status=${t}`,{method:"PATCH"});if(200===n.status)return[await n.json(),null];const a="Set Car Engine";return 400===n.status?[null,g(a)]:404===n.status?[null,c(a)]:[null,u(a)]}catch(e){return[null,e]}},Z=async(e,t)=>{const{slots:n}=F.garage;if(n){const a=n.filter((t=>t.id===e))[0],{startBtn:r,stopBtn:i,carImage:s}=n.filter((t=>t.id===e))[0];a.animation=((e,t)=>{const n=getComputedStyle(t),a=getComputedStyle(t.parentElement),r=parseInt(n.width),i=parseInt(a.width),s=t.animate([{transform:"translateX(0px)"},{transform:`translateX(calc(${i}px - ${r}px))`}],{duration:e,easing:"ease-in-out"});return s.play(),s.onfinish=()=>{t.style.transform="translateX(0px))"},s})(t,s);const[l,o]=await(async e=>{try{const t=await fetch(`${P}?id=${e}&status=drive`,{method:"PATCH"});if(200===t.status)return[await t.json(),null];const n="Set Car Engine to Drive";return 400===t.status?[null,g(n)]:404===t.status?[null,c(n)]:429===t.status?[null,C(n)]:500===t.status?[null,p(n)]:[null,u(n)]}catch(e){return[null,e]}})(e);return i.disabled=!0,r.disabled=!1,o?(a.animation.pause(),console.error(o),o):l}return new Error("")},I=async e=>{const{slots:t}=F.garage;if(t){const{startBtn:n,stopBtn:a,animation:r}=t.filter((t=>t.id===e))[0];r&&r.cancel();const[i,s]=await B(e,"started");if(s)return console.error(s),Promise.reject([e,null]);{n.disabled=!0,a.disabled=!1;const t=Math.round(i.distance/i.velocity);return await Z(e,t)instanceof Error?Promise.reject([e,null]):Promise.resolve([e,t])}}return Promise.reject([e,null])},x=async e=>{const{slots:t}=F.garage;if(t){const{startBtn:n,stopBtn:a,animation:r}=t.filter((t=>t.id===e))[0],[,i]=await B(e,"stopped");i?console.error(i):(r&&r.cancel(),a.disabled=!0,n.disabled=!1)}},N=e=>{const{selectBtn:t,removeBtn:n,startBtn:a,stopBtn:r,id:i}=e;t.addEventListener("click",(e=>(async(e,t)=>{e.preventDefault();const{garageSettings:n}=F,{container:a,textInput:r,colorInput:i,enable:s}=n.updateForm,[l,o]=await m(t);o?console.error(o):(s(),r.value=l.name,i.value=l.color,a.dataset.carId=`${t}`)})(e,i))),n.addEventListener("click",(e=>(async(e,t)=>{e.preventDefault();const n=await(async e=>{try{const t=await fetch(`${w}/${e}`,{method:"DELETE"}),n="Delete Car";if(200===t.status)return;return 404===t.status?c(n):u(n)}catch(e){return e}})(t);n?console.error(n):(await(async e=>{try{const t=await fetch(`${f}/${e}`,{method:"DELETE"}),n="Delete Winner";if(200===t.status)return;return 404===t.status?c(n):u(n)}catch(e){return e}})(t),F.garage.update&&await(F.garage?.update()),await(F.winners?.table.update()))})(e,i))),a.addEventListener("click",(()=>I(i))),r.addEventListener("click",(()=>x(i)))},D=async()=>{const{garage:n,viewSettings:a,garagePage:r,garagePerPage:i}=F,[l,d]=await(async(e=1,t=7)=>{try{const n=await fetch(`${w}?_limit=${t}&_page=${e}`);if(200===n.status){return[{cars:await n.json(),count:Number(n.headers.get("X-Total-Count"))||0},null]}return[null,u("Get Cars")]}catch(e){return[null,e]}})(r);if(d)console.error(d.message);else{F.garageViewTitle=`Garage (${l.count})`,F.garagePageTitle=`Page #${r}`,n.main.innerHTML="",n.slots=l.cars.map((a=>((n,a)=>{const{id:r,name:i}=n,l=e("div","GarageSlot-module__root--70Yvs",a.main),o=e("div","GarageSlot-module__main--JkID_",l),d=e("span","GarageSlot-module__name--BKmtw",o,`${i}`),u=e("div","GarageSlot-module__car--nXxOC",o),c=e("div","GarageSlot-module__footer--UGb0f",l),g=t({label:"Select",type:"button"},c),C=t({label:"Remove",type:"reset"},c),p=t({label:"Start",type:"button"},c),w=t({label:"Stop",type:"reset"},c);return u.innerHTML+=s(n.color),{container:l,carName:d,carImage:u,selectBtn:g,removeBtn:C,startBtn:p,stopBtn:w,id:r,start:void 0,stop:void 0,animation:void 0}})(a,n))),n.slots.forEach((e=>{N(e),e.stopBtn.disabled=!0,e.start=()=>I(e.id),e.stop=()=>x(e.id)}));const[d,u]=o(l.count,r,i);F.garagePrevBtnStatus=d,F.garageNextBtnStatus=u,a.update&&a.update()}},G=()=>{const{createForm:e,updateForm:t,generateCarsBtn:n}=F.garageSettings;e.container.addEventListener("submit",(e=>(async e=>{e.preventDefault();const{container:t,textInput:n,colorInput:a}=F.garageSettings.createForm;if(n.value){const e=await y({name:n.value,color:a.value});e?console.error(e):(F.garage.update&&await F.garage.update(),t.reset())}})(e))),t.container.addEventListener("submit",(e=>(async e=>{e.preventDefault();const{container:t,textInput:n,colorInput:a,disable:r}=F.garageSettings.updateForm,i=t.dataset.carId,s=n.value;i&&s&&(await(async(e,t)=>{try{const n=await fetch(`${w}/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),a="Update Car";if(200===n.status)return;return 404===n.status?c(a):u(a)}catch(e){return e}})(+i,{name:n.value,color:a.value}),F.garage.update&&await F.garage.update(),await F.winners.table.update(),r())})(e))),n.addEventListener("click",(()=>(async()=>{const e=((e=100)=>Array(e).fill(null).map((()=>({name:`${T[Math.floor(Math.random()*T.length)]} ${E[Math.floor(Math.random()*E.length)]}`,color:`#${Math.floor(16777215*Math.random()).toString(16)}`}))))().map((e=>y(e)));await Promise.all(e),F.garage.update&&await F.garage.update()})()))},R=(n,a,r)=>{const i=e("form","GarageSettingsForm-module__form--Q8J35",n),s=e("input","GarageSettingsForm-module__text-input--urxdU",i),l=e("input","GarageSettingsForm-module__color-input--K0v1R",i),o=t({label:r,type:"submit"},i);return i.id=a,s.type="text",l.type="color",l.defaultValue="#000000",{container:i,textInput:s,colorInput:l,submitBtn:o,disable:()=>{i.reset(),s.disabled=!0,l.disabled=!0,o.disabled=!0},enable:()=>{i.reset(),s.disabled=!1,l.disabled=!1,o.disabled=!1}}},W=async()=>{const{slots:e}=F.garage;if(e){const t=e.map((e=>{if(e.start)return e.start()})),n=await Promise.any(t);if(n&&n[0]&&n[1]){const[e,t]=n,[a,r]=await m(e);if(r)console.error(r);else{const n=+(t/1e3).toFixed(2),{winnerMessage:r}=F.garageSettings;await(async(e,t)=>{const[n,a]=await(async e=>{try{const t=await fetch(`${f}/${e}`);if(200===t.status)return[await t.json(),null];const n="Get Winner";return 404===t.status?[null,c(n)]:[null,u(n)]}catch(e){return[null,e]}})(e);if(a)await(async e=>{try{const t=await fetch(`${f}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),n="Create Winner";if(201===t.status)return;return 500===t.status?p(n):u(n)}catch(e){return e}})({id:e,wins:1,time:t});else{const a=n.wins+1,r=n.time<t?n.time:t;await(async e=>{const{id:t,wins:n,time:a}=e;try{const e=await fetch(`${f}/${t}`,{method:"PATCH",headers:{"Content-type":"application/json"},body:JSON.stringify({wins:n,time:a})}),r="Update Winner";if(200===e.status)return;return 404===e.status?c(r):u(r)}catch(e){return e}})({id:e,wins:a,time:r})}await F.winners.table.update()})(e,n),r.innerText=`Winner: ${a.name}, time: ${n}s.`,r.style.display="block",setTimeout((()=>{r.style.display="none"}),5e3)}}}},A=async()=>{const{slots:e}=F.garage;if(e){const t=e.map((e=>{if(e.stop)return e.stop()}));await Promise.all(t)}},O=sessionStorage.getItem("view"),V=(n,a)=>{const r=(n=>{const a=e("div","ViewSettings-module__root--iDTg1",n),r=e("p","ViewSettings-module__title--x6lHA",a),i=e("div","ViewSettings-module__header--qrkfB",a),s=t({label:"Garage"},i),l=t({label:"Winners"},i),o=e("p","ViewSettings-module__page--R2AfP",a),d=e("div","ViewSettings-module__pagination--zY35L",a);return{container:a,garageBtn:s,winnersBtn:l,title:r,page:o,pagination:d,prev:t({label:"Prev"},d),next:t({label:"Next"},d),update:void 0}})(n),i=(t=>{const n=e("div","Garage-module__root--tKiif",t);return{container:n,main:e("div","Garage-module__main--pSHkD",n),slots:void 0,update:void 0}})(null===O||"garage"===O?a:void 0),s=(n=>{const a=e("div","GarageSettings-module__root--WZiCU",n),r=e("div","GarageSettings-module__logo--OK1Ll",a,"ASYNC-RACE"),i=R(a,"create-form","Create"),s=R(a,"update-form","Update"),l=e("div","GarageSettings-module__footer--Wz4Vz",a),o=t({label:"Race"},l),d=t({label:"Reset"},l),u=t({label:"Generate Cars"},l),c=e("span","GarageSettings-module__message--DF0pv",a,"Winner: ");return r.href="/",s.disable(),c.style.display="none",{container:a,createForm:i,updateForm:s,raceBtn:o,resetBtn:d,generateCarsBtn:u,winnerMessage:c}})(n),l=M("winners"===O?a:void 0);return{header:n,main:a,view:O||"garage",viewSettings:r,garage:i,garageViewTitle:"Garage (4)",garagePageTitle:"Page #1",garagePrevBtnStatus:!1,garageNextBtnStatus:!1,garageSettings:s,winners:l,winnersViewTitle:"Winners (1)",winnersPageTitle:"Page #1",winnersPrevBtnStatus:!1,winnersNextBtnStatus:!1,garagePage:1,garagePerPage:7,winnersPage:1,winnersPerPage:10,winnersSort:v.ID,winnersOrder:b.ASC}},k=async()=>{await(async()=>(G(),F.garage.update=D,await F.garage.update(),F.garage))(),await(async()=>((()=>{const{winners:e}=F;e.table.wins.addEventListener("click",$),e.table.time.addEventListener("click",_)})(),await F.winners.table.update(),F.winners))(),(()=>{const{viewSettings:e}=F,{garageBtn:t,winnersBtn:n}=e;t.addEventListener("click",(()=>a("garage"))),n.addEventListener("click",(()=>a("winners"))),e.prev.addEventListener("click",(()=>r(-1))),e.next.addEventListener("click",(()=>r(1)))})(),F.viewSettings.update=n,F.viewSettings.update(),F.viewSettings,(()=>{const{raceBtn:e,resetBtn:t}=F.garageSettings;e.addEventListener("click",W),t.addEventListener("click",A)})(),F.garageSettings};let F;window.addEventListener("DOMContentLoaded",(()=>(async()=>{const t=e("div",null,"body"),n=e("header",null,t),a=e("main",null,t);return t.id="app",F=V(n,a),await k(),{container:t,header:n,main:a}})()))})();