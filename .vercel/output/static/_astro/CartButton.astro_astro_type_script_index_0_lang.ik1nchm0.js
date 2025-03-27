import{f as r,a as o,c}from"./cartStore.Dg_JJ8gq.js";import"./client.schema.D9gTZs88.js";import"./index.9eZ28vGx.js";r.subscribe(n=>{const t=document.getElementById("cart-count");t&&(t.textContent=n.toString(),n===0?t.classList.add("hidden"):t.classList.remove("hidden"))});o.subscribe(n=>{const t=new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",minimumFractionDigits:0}),e=document.getElementById("mini-cart-total");e&&(e.textContent=t.format(n))});c.subscribe(n=>{const t=document.getElementById("mini-cart-items");if(!t)return;if(Object.keys(n).length===0){t.innerHTML=`
        <div class="flex justify-center items-center h-32 text-gray-500 dark:text-gray-400">
          Tu carrito está vacío
        </div>
      `;return}let e="";for(const s in n){const i=n[s];e+=`
        <div class="flex items-center py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
          <div class="w-12 h-12 rounded overflow-hidden mr-3">
            <img src="${i.image}" alt="${i.name}" class="w-full h-full object-cover">
          </div>
          <div class="flex-1">
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">${i.name}</h4>
            <div class="flex justify-between items-center mt-1">
              <span class="text-xs text-gray-500 dark:text-gray-400">${i.quantity} x $${i.price.toLocaleString()}</span>
              <span class="text-sm font-medium text-gray-900 dark:text-white">$${(i.price*i.quantity).toLocaleString()}</span>
            </div>
          </div>
        </div>
      `}t.innerHTML=e});document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("cart-button"),t=document.getElementById("mini-cart");n&&t&&(n.addEventListener("mouseenter",()=>{t.classList.remove("opacity-0","pointer-events-none","translate-y-2"),t.classList.add("opacity-100","translate-y-0")}),t.addEventListener("mouseenter",()=>{t.classList.remove("opacity-0","pointer-events-none","translate-y-2"),t.classList.add("opacity-100","translate-y-0")}),t.addEventListener("mouseleave",()=>{t.classList.add("opacity-0","pointer-events-none","translate-y-2"),t.classList.remove("opacity-100","translate-y-0")}),n.addEventListener("mouseleave",e=>{const s=t.getBoundingClientRect();e.clientX>=s.left&&e.clientX<=s.right&&e.clientY>=s.top&&e.clientY<=s.bottom||setTimeout(()=>{const a=t.getBoundingClientRect();e.clientX>=a.left&&e.clientX<=a.right&&e.clientY>=a.top&&e.clientY<=a.bottom||(t.classList.add("opacity-0","pointer-events-none","translate-y-2"),t.classList.remove("opacity-100","translate-y-0"))},100)}))});
