import{r as p}from"./recommendationsStore.vBwpm_-S.js";import{f as h}from"./cartStore.CCaFZ5TA.js";import"./wishlistStore.DdiVJu_S.js";import"./client.schema.D9gTZs88.js";import"./index.9eZ28vGx.js";document.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("recommendations-list");if(!r)return;const s=o=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",minimumFractionDigits:0}).format(o),i=o=>{if(!r)return;if(o.length===0){r.innerHTML=`
          <div class="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No hay recomendaciones disponibles aún.</p>
            <p class="mt-2">Sigue explorando productos para personalizar tus recomendaciones.</p>
          </div>
        `;return}const c=r.querySelector(".loader");c&&c.remove();let d="";o.forEach(t=>{const n=s(t.price),e=t.discountPrice?s(t.discountPrice):null,a=!!e;d+=`
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
            <a href="/producto/${t.id}" class="relative group">
              <img 
                src="${t.image}" 
                alt="${t.name}" 
                class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              ${a?`
                <span class="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  OFERTA
                </span>
              `:""}
            </a>
            
            <div class="p-4 flex-grow flex flex-col">
              <a href="/producto/${t.id}" class="block hover:text-primary-600 transition-colors">
                <h4 class="font-semibold text-gray-800 dark:text-white">${t.name}</h4>
              </a>
              
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3 line-clamp-2">
                ${t.description||""}
              </p>
              
              <div class="mt-auto">
                <div class="flex items-center justify-between mb-3">
                  ${a?`
                    <span class="text-gray-500 dark:text-gray-400 text-sm line-through">${n}</span>
                    <span class="text-lg font-bold text-gray-800 dark:text-white">${e}</span>
                  `:`
                    <span class="text-lg font-bold text-gray-800 dark:text-white">${n}</span>
                  `}
                </div>
                
                <button 
                  class="add-to-cart-btn w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  data-id="${t.id}"
                  data-name="${t.name}"
                  data-price="${t.discountPrice||t.price}"
                  data-image="${t.image}"
                  data-description="${t.description||""}"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Añadir
                </button>
              </div>
            </div>
          </div>
        `}),r.innerHTML=d,document.querySelectorAll(".add-to-cart-btn").forEach(t=>{t.addEventListener("click",n=>{const e=n.currentTarget,a=e.getAttribute("data-id"),l=e.getAttribute("data-name"),u=parseInt(e.getAttribute("data-price"),10),m=e.getAttribute("data-image"),f=e.getAttribute("data-description");if(!a||!l||!m||isNaN(u))return;h({id:a,name:l,price:u,image:m,description:f});const x=e.innerHTML;e.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Añadido
          `,setTimeout(()=>{e.innerHTML=x},1500)})})},g=p.get();i(g),p.subscribe(i)});
