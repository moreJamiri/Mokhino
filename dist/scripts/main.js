"use strict";function e(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,t:!0,o:!0,writable:!0}):t[e]=n,t}let n=null,s=null,r=0,o=document.querySelector(".start"),i=document.querySelector("#startForm"),a=document.querySelector(".endgame"),c=document.querySelector(".main__nav__ul"),t=document.querySelector(".main__nav__open"),m=document.querySelector(".main__nav__close");function h(t){return t.toString().replace(/[0-9]/g,t=>String.fromCharCode(t.charCodeAt(0)+1728))}function u(t){let e,n=t.length;for(;0!=n;)e=Math.floor(Math.random()*n),n--,[t[n],t[e]]=[t[e],t[n]];return t}function l(e){return new Promise(t=>setTimeout(t,e))}function d(){r--;const t=Math.floor(r/60),e=("00"+r%60).slice(-2);document.querySelector("#time").innerText=h(`${t}:${e}`),0==r&&n.i()}function f(t,e,n){return 5*t-(e-t)+~~(n/5)}function g(){return scores=window.localStorage.getItem("scores"),scores?JSON.parse(scores):[]}function v(t,e,n){let s=g();s.push({m:e,h:t,u:f(t,e,n),time:n}),s.sort(function(t,e){return e.u-t.u}),s=s.slice(0,5),window.localStorage.setItem("scores",JSON.stringify(s))}function p(t,e){const n=a.querySelector("#scoreTitle"),s=a.querySelector("#scoreN"),o=a.querySelector("#scoreTable"),i=f(t.h,t.m,r);let c=g();if(c=c.length>0?g()[0].u:0,n.innerText=e?"تبریک! شما برنده شدید":"متاسفیم! دوباره تلاش کنید",s.innerText=` ${h(i)}`,i>=c){const t=document.createElement("i");t.classList="record fa fa-trophy",s.prepend(t)}v(t.h,t.m,r),scores=g(),o.innerHTML="<tr><th>#</th><th>حرکت‌ها</th>\n      <th>انتخاب صحیح</th>\n      <th>زمان باقیمانده</th>\n      <th>امتیاز</th></tr>";for(let t=0;t<scores.length;t++){const e=scores[t];row=document.createElement("tr"),row.innerHTML=`<td>${h(t+1)}</td>\n                    <td>${h(e.m)}</td>\n                    <td>${h(e.h)}</td>\n                    <td>${h(e.time)}</td>\n                    <td>${h(e.u)}</td>\n                  `,o.appendChild(row)}a.style.display="flex"}class b{l(){m.click();const t=document.querySelector(".game .sq-wrapper");t.innerHTML="",document.querySelector("#moves").innerText=h(this.m);const e=document.createElement("div");e.classList=`gameboard grid-${this.g}`;let n=[];"icons"==this.v?n=(n=u(this.p)).slice(0,this.g**2/2):"numbers"==this.v&&(n=this._.slice(0,this.g**2/2));let s=[];for(let e=0;e<this.g**2/2;e++){let t=document.createElement("div");t.classList="game-item",t.dataset.id=e,content=n.pop(),"icons"==this.v?t.innerHTML=`<i class="fa fa-${content}"></i>`:"numbers"==this.v&&(t.innerHTML=`<span>${content}</span>`),t.innerHTML+='<span class="overlay"></span>',s.push(t),s.push(t)}u(s);for(let t=0;t<s.length;t++)e.innerHTML+=s[t].outerHTML;t.appendChild(e)}i(t=!1){clearInterval(s),p(this,t)}constructor(t){e(this,"icons",["gift","cake","key","bone","heart","star","trophy","shirt","camera","cannabis","car","bell","gem","carrot","lightbulb","apple-whole","ice-cream","gamepad","cookie-bite","eye","droplet","marker"]),e(this,"numbers",["۱","۲","۳","۴","۵","۶","۷","۸","۹","۱۰","۱۱","۱۲","۱۳","۱۴","۱۵","۱۶","۱۷","۱۸"]),e(this,"gameTheme",null),e(this,"gameSize",null),e(this,"rights",0),e(this,"moves",0),this.v=t.get("theme"),this.g=t.get("size"),this.l(),r=4==this.g?61:121,s=setInterval(d,1e3),d()}$(){this.m++,document.querySelector("#moves").innerText=h(this.m)}I(t){this.$(),t[0].dataset.id==t[1].dataset.id?(t.forEach(t=>{t.classList.add("passed"),t.classList.remove("show")}),this.h++,this.h==this.g**2/2&&this.i(!0)):t.forEach(t=>{l(500).then(()=>{t.classList.remove("show")})})}}function w(t){formData=new FormData(t),n=new b(formData),gameItems=document.querySelectorAll(".game-item"),gameItems.forEach(t=>{t.addEventListener("click",t=>{if(t.target.parentElement.classList.add("show"),activeItems=document.querySelectorAll(".game-item.show"),activeItems.length>1){const t=document.querySelector(".gameboard");t.style.pointerEvents="none",l(500).then(()=>{t.style.pointerEvents="all"}),n.I(activeItems)}})})}function _(){clearInterval(s),a.style.display="none",o.style.display="none",w(i)}function $(){clearInterval(s),o.style.display="flex",a.style.display="none"}i.addEventListener("submit",t=>{t.preventDefault(),w(i),o.style.display="none"}),t.addEventListener("click",t=>{t.preventDefault(),c.classList.add("open")}),m.addEventListener("click",t=>{t.preventDefault(),c.classList.remove("open")});