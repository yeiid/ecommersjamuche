import{c as b,a as P,b as L,r as T,d as C,u as j}from"./cartStore.Dg_JJ8gq.js";import"./client.schema.D9gTZs88.js";import"./index.9eZ28vGx.js";const I={whatsappNumber:"573011234567",email:"info@jamuchee.com",phone:"+57 301 123 4567",address:"Bogotá, Colombia"},A={whatsappOrder:(f,h,v)=>{try{if(!f||Object.keys(f).length===0)return encodeURIComponent("Error: El carrito está vacío");let r=`🌿 *PEDIDO JAMUCHEE* 🌿

*Productos seleccionados:*

`;for(const[y,d]of Object.entries(f))try{if(!d)continue;const o=d.discountprice&&d.discountprice>0?d.discountprice:d.price,l=typeof o=="number"&&typeof d.quantity=="number"?o*d.quantity:0;let E,p;try{E=new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",minimumFractionDigits:0}).format(o||0),p=new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",minimumFractionDigits:0}).format(l||0)}catch(w){console.error("Error al formatear precios:",w),E=`$${o||0}`,p=`$${l||0}`}const n=d.name||"Producto",x=d.quantity||1;r+=`• *${x}x ${n}*
`,r+=`  Precio: ${E} c/u
`,r+=`  Subtotal: ${p}

`}catch(o){console.error(`Error al procesar item ${y}:`,o),r+=`• *Producto en el carrito*
`,r+=`  (No se pudieron obtener detalles)

`}return r+=`*TOTAL DEL PEDIDO: ${v}*

`,r+=`Por favor, indícame los siguientes datos para completar tu pedido:
`,r+=`- Nombre completo
`,r+=`- Dirección de entrega
`,r+=`- Ciudad
`,r+=`- Método de pago preferido

`,r+="¡Gracias por tu compra en JAMUCHEE! 🌱",encodeURIComponent(r)}catch(r){return console.error("Error al generar mensaje de WhatsApp:",r),encodeURIComponent("Error al generar el mensaje. Por favor, contacta directamente a la tienda al "+I.phone)}}};document.addEventListener("DOMContentLoaded",()=>{const f=document.getElementById("cart-items-container"),h=document.getElementById("empty-cart-message"),v=document.getElementById("cart-subtotal"),r=document.getElementById("cart-total"),y=document.getElementById("cart-error"),d=document.getElementById("cart-error-message"),o=document.getElementById("checkout-button"),l=document.getElementById("whatsapp-button");(()=>{const e=b.get(),c=e&&Object.keys(e).length>0;o&&(o.disabled=!c),l&&(l.disabled=!c)})();const p=e=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",minimumFractionDigits:0}).format(e),n=e=>{d&&y&&(d.textContent=e,y.classList.remove("hidden"))},x=()=>{y&&y.classList.add("hidden")},w=()=>{try{const e=b.get();if(!e||Object.keys(e).length===0){n("No hay productos en el carrito para proceder al pago");return}console.log("Procediendo al pago con los siguientes items:",e),alert("La funcionalidad de pago está en desarrollo. Por favor, usa el botón de WhatsApp para completar tu pedido.")}catch(e){console.error("Error al proceder al pago:",e),n("Error al proceder al pago. Por favor, intenta de nuevo.")}},k=()=>{try{const e=b.get();if(!e||Object.keys(e).length===0){n("No hay productos en el carrito para enviar");return}console.log("Items en el carrito:",e);const c=P.get();console.log("Total del carrito:",c);const i=p(c);console.log("Total formateado:",i);const t={};for(const[g,u]of Object.entries(e))u&&(t[g]={id:g,name:u.name||"Producto",price:u.price||0,quantity:u.quantity||1,discountprice:u.discountprice||0,image:u.image||"",description:u.description||"",total:u.total||u.price*(u.quantity||1)});const s=A.whatsappOrder(t,c,i);console.log("Mensaje generado (decodificado):",decodeURIComponent(s));const a=I.whatsappNumber;console.log("Enviando a:",a);const m=`https://wa.me/${a}?text=${s}`;console.log("URL de WhatsApp:",m),window.open(m,"_blank")}catch(e){console.error("Error al enviar pedido por WhatsApp:",e),n("Error al generar mensaje de WhatsApp. Por favor, intenta de nuevo.")}},O=e=>{if(!f)return;if(Object.keys(e).length===0){h&&h.classList.remove("hidden"),f.innerHTML="",o&&(o.disabled=!0),l&&(l.disabled=!0);return}h&&h.classList.add("hidden"),o&&(o.disabled=!1),l&&(l.disabled=!1);let c="";for(const[i,t]of Object.entries(e)){if(!t)continue;const s=t.total,a=t.discountprice&&t.discountprice>0?t.discountprice:t.price;c+=`
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 relative" data-id="${i}">
            <img 
              src="${t.image}" 
              alt="${t.name}" 
              class="w-full sm:w-24 h-24 object-cover rounded-md"
            />
            
            <div class="flex-grow">
              <h3 class="font-medium text-gray-800 dark:text-white">${t.name}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">${t.description||""}</p>
              <div class="mt-2 flex items-center justify-between">
                <div class="font-medium text-gray-800 dark:text-white">${p(a)}</div>
                
                <div class="flex items-center border border-gray-300 dark:border-gray-700 rounded-md">
                  <button 
                    class="decrease-btn px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-l-md"
                    aria-label="Disminuir cantidad"
                    data-id="${i}"
                  >
                    -
                  </button>
                  <span class="item-quantity px-3 py-1">${t.quantity}</span>
                  <button 
                    class="increase-btn px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-r-md"
                    aria-label="Aumentar cantidad"
                    data-id="${i}"
                  >
                    +
                  </button>
                </div>
              </div>
              <div class="mt-1 text-right font-medium text-gray-800 dark:text-white">
                Total: ${p(s)}
              </div>
            </div>
            
            <button 
              class="remove-item absolute top-4 right-4 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
              aria-label="Eliminar producto"
              data-id="${i}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        `}f.innerHTML=c,document.querySelectorAll(".decrease-btn").forEach(i=>{i.addEventListener("click",t=>{try{const a=t.currentTarget.getAttribute("data-id"),m=b.get();if(!m||!Object.prototype.hasOwnProperty.call(m,a)){n("Producto no encontrado en el carrito");return}const g=m[a];if(!g){n("Producto no encontrado en el carrito");return}g.quantity>1?T(a):confirm("¿Estás seguro de que deseas eliminar este producto del carrito?")&&C(a)}catch(s){console.error("Error al disminuir cantidad:",s),n("No se pudo disminuir la cantidad. Por favor, intenta de nuevo.")}})}),document.querySelectorAll(".increase-btn").forEach(i=>{i.addEventListener("click",t=>{try{const a=t.currentTarget.getAttribute("data-id"),m=b.get();if(!m||!Object.prototype.hasOwnProperty.call(m,a)){n("Producto no encontrado en el carrito");return}const g=m[a];if(!g){n("Producto no encontrado en el carrito");return}j(a,g.quantity+1)}catch(s){console.error("Error al aumentar cantidad:",s),n("No se pudo aumentar la cantidad. Por favor, intenta de nuevo.")}})}),document.querySelectorAll(".remove-item").forEach(i=>{i.addEventListener("click",t=>{try{const a=t.currentTarget.getAttribute("data-id");confirm("¿Estás seguro de que deseas eliminar este producto del carrito?")&&C(a)}catch(s){console.error("Error al eliminar producto:",s),n("No se pudo eliminar el producto. Por favor, intenta de nuevo.")}})})},$=e=>{try{const c=p(e);v&&(v.textContent=c),r&&(r.textContent=c)}catch(c){console.error("Error al actualizar total:",c)}};b.subscribe(e=>{O(e)}),P.subscribe(e=>{$(e)}),L.subscribe(e=>{e?n(e):x()}),o&&o.addEventListener("click",()=>{w()}),l&&l.addEventListener("click",()=>{k()})});
