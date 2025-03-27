import{w as m,r as u}from"./wishlistStore.DdiVJu_S.js";import{f}from"./cartStore.CCaFZ5TA.js";import"./client.schema.D9gTZs88.js";import"./index.9eZ28vGx.js";document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("wishlist-items-container"),a=document.getElementById("empty-wishlist-message"),d=o=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",minimumFractionDigits:0}).format(o),c=o=>{if(!n||!a)return;if(Object.keys(o).length===0){a.classList.remove("hidden"),n.innerHTML="";return}a.classList.add("hidden");let l="";for(const[r,t]of Object.entries(o)){const i=d(t.price),s=t.discountPrice?d(t.discountPrice):null,e=!!s;l+=`
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col" data-id="${r}">
            <div class="relative">
              <a href="/producto/${r}">
                <img src="${t.image}" alt="${t.name}" class="w-full h-48 object-cover">
              </a>
              ${e?`
                <span class="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  OFERTA
                </span>
              `:""}
            </div>
            
            <div class="p-4 flex-grow flex flex-col">
              <div class="flex-grow">
                <a href="/producto/${r}" class="block hover:text-primary-600 transition-colors">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-1">${t.name}</h3>
                </a>
                
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  ${t.description||""}
                </p>
              </div>
              
              <div class="mt-auto">
                <div class="flex items-center justify-between mb-3">
                  <div>
                    ${e?`
                      <span class="text-gray-500 dark:text-gray-400 text-sm line-through">${i}</span>
                      <div class="text-lg font-bold text-gray-800 dark:text-white">${s}</div>
                    `:`
                      <div class="text-lg font-bold text-gray-800 dark:text-white">${i}</div>
                    `}
                  </div>
                </div>
                
                <div class="flex space-x-2">
                  <button 
                    class="add-to-cart-btn flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    data-id="${r}"
                  >
                    Añadir al carrito
                  </button>
                  <button 
                    class="remove-wishlist-btn inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    data-id="${r}"
                    aria-label="Eliminar de la lista de deseos"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `}n.innerHTML=l,document.querySelectorAll(".add-to-cart-btn").forEach(r=>{r.addEventListener("click",t=>{const i=t.currentTarget,s=i.getAttribute("data-id")||"",e=o[s];if(e){f({id:e.id,name:e.name,price:e.discountPrice||e.price,image:e.image,description:e.description});const g=i.textContent||"";i.textContent="✓ Añadido",setTimeout(()=>{i.textContent=g},1500)}})}),document.querySelectorAll(".remove-wishlist-btn").forEach(r=>{r.addEventListener("click",t=>{const s=t.currentTarget.getAttribute("data-id")||"";u(s)})})};c(m.get()),m.subscribe(c)});
