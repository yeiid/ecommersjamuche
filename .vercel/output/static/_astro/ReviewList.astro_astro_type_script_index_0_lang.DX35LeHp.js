import{g,b as m}from"./reviewsStore.Ci_dERw8.js";import"./index.9eZ28vGx.js";document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("review-section")?.getAttribute("data-product-id"),r=document.getElementById("reviews-list"),s=document.getElementById("no-reviews");if(!a||!r)return;const i=g(a),d=document.getElementById("avg-rating");if(d){const t=m(a);d.textContent=t.toFixed(1)}if(i.length===0){s&&s.classList.remove("hidden");return}s&&s.classList.add("hidden");const o=t=>{const e=new Date(t);return new Intl.DateTimeFormat("es-ES",{year:"numeric",month:"long",day:"numeric"}).format(e)},c=t=>{let e="";for(let n=1;n<=5;n++)n<=t?e+=`
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          `:e+=`
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-300 dark:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          `;return e};let l="";[...i].sort((t,e)=>new Date(e.date).getTime()-new Date(t.date).getTime()).forEach(t=>{l+=`
        <div class="review bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4">
          <div class="flex items-start justify-between">
            <div>
              <h4 class="font-semibold text-gray-800 dark:text-white">${t.author}</h4>
              <div class="flex items-center mt-1">
                <div class="flex">
                  ${c(t.rating)}
                </div>
                <span class="ml-2 text-gray-500 dark:text-gray-400 text-sm">${o(t.date)}</span>
              </div>
            </div>
          </div>
          
          <div class="mt-3 text-gray-700 dark:text-gray-300">
            ${t.comment}
          </div>
        </div>
      `}),r.innerHTML=l});
