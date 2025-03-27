import{e as T,c as g,a as I,b as $,r as j,d as L,u as A}from"./cartStore.CCaFZ5TA.js";import"./client.schema.D9gTZs88.js";import"./index.9eZ28vGx.js";const O={whatsappNumber:"573011234567",email:"info@jamuchee.com",phone:"+57 301 123 4567",address:"Bogotá, Colombia"};function N(l,m,h){try{const u=l??{},v=h??C(m??0);if(!u||typeof u!="object"||Object.keys(u).length===0)return console.warn("Carrito vacío o inválido al generar mensaje WhatsApp"),encodeURIComponent("Error: El carrito está vacío");let c=`🌿 *PEDIDO JAMUCHEE* 🌿

*Productos seleccionados:*

`;const s=Object.values(u).filter(d=>d&&typeof d=="object"&&d.name);if(s.length===0)return console.warn("No hay items válidos en el carrito"),encodeURIComponent("Error: No hay productos válidos en el carrito");const k=s.map(d=>{const{name:o="Producto",quantity:y=1,price:E=0,discountprice:x=0}=d,w=Number.isFinite(y)&&y>0?y:1,P=Number.isFinite(E)?E:0,e=Number.isFinite(x)?x:0,r=e>0?e:P,a=r*w;return`• *${w}x ${o}*
  Precio: ${C(r)} c/u
  Subtotal: ${C(a)}

`});return c+=k.join(""),c+=`*TOTAL DEL PEDIDO: ${v}*

`,c+=`Por favor, indícame los siguientes datos para completar tu pedido:
- Nombre completo
- Dirección de entrega
- Ciudad
- Método de pago preferido

¡Gracias por tu compra en JAMUCHEE! 🌱`,console.log("Mensaje de WhatsApp generado exitosamente"),encodeURIComponent(c)}catch(u){return console.error("Error al generar mensaje de WhatsApp:",u),encodeURIComponent("Error al generar el mensaje. Por favor, contacta directamente a la tienda.")}}function C(l){try{return Number.isFinite(l)?new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",minimumFractionDigits:0}).format(l):"$0"}catch(m){return console.warn("Error al formatear precio:",m),`$${l||0}`}}document.addEventListener("DOMContentLoaded",()=>{T();const l=document.getElementById("cart-items-container"),m=document.getElementById("empty-cart-message"),h=document.getElementById("cart-subtotal"),u=document.getElementById("cart-total"),f=document.getElementById("cart-error"),v=document.getElementById("cart-error-message"),c=document.getElementById("checkout-button"),s=document.getElementById("whatsapp-button");(()=>{const e=g.get(),r=e&&Object.keys(e).length>0;c&&(c.disabled=!r),s&&(s.disabled=!r)})();const d=e=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",minimumFractionDigits:0}).format(e),o=e=>{v&&f&&(v.textContent=e,f.classList.remove("hidden"))},y=()=>{f&&f.classList.add("hidden")},E=()=>{try{const e=g.get();if(!e||Object.keys(e).length===0){o("No hay productos en el carrito para proceder al pago");return}console.log("Procediendo al pago con los siguientes items:",e),alert("La funcionalidad de pago está en desarrollo. Por favor, usa el botón de WhatsApp para completar tu pedido.")}catch(e){console.error("Error al proceder al pago:",e),o("Error al proceder al pago. Por favor, intenta de nuevo.")}},x=()=>{try{const e=g.get();if(!e||Object.keys(e).length===0){o("No hay productos en el carrito para enviar");return}const r=I.get(),a=d(r),t=N(e,r,a),n=`https://wa.me/${O.whatsappNumber}?text=${t}`;window.open(n,"_blank"),console.log("Pedido enviado a WhatsApp correctamente")}catch(e){console.error("Error al enviar pedido por WhatsApp:",e),o("Error al generar mensaje de WhatsApp. Por favor, intenta de nuevo.")}},w=e=>{if(!l)return;if(Object.keys(e).length===0){m&&m.classList.remove("hidden"),l.innerHTML="",c&&(c.disabled=!0),s&&(s.disabled=!0);return}m&&m.classList.add("hidden"),c&&(c.disabled=!1),s&&(s.disabled=!1);let r="";for(const[a,t]of Object.entries(e)){if(!t)continue;const i=t.total,n=t.discountprice&&t.discountprice>0?t.discountprice:t.price;r+=`
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 relative" data-id="${a}">
            <img 
              src="${t.image}" 
              alt="${t.name}" 
              class="w-full sm:w-24 h-24 object-cover rounded-md"
            />
            
            <div class="flex-grow">
              <h3 class="font-medium text-gray-800 dark:text-white">${t.name}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">${t.description||""}</p>
              <div class="mt-2 flex items-center justify-between">
                <div class="font-medium text-gray-800 dark:text-white">${d(n)}</div>
                
                <div class="flex items-center border border-gray-300 dark:border-gray-700 rounded-md">
                  <button 
                    class="decrease-btn px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-l-md"
                    aria-label="Disminuir cantidad"
                    data-id="${a}"
                  >
                    -
                  </button>
                  <span class="item-quantity px-3 py-1">${t.quantity}</span>
                  <button 
                    class="increase-btn px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-r-md"
                    aria-label="Aumentar cantidad"
                    data-id="${a}"
                  >
                    +
                  </button>
                </div>
              </div>
              <div class="mt-1 text-right font-medium text-gray-800 dark:text-white">
                Total: ${d(i)}
              </div>
            </div>
            
            <button 
              class="remove-item absolute top-4 right-4 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
              aria-label="Eliminar producto"
              data-id="${a}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        `}l.innerHTML=r,document.querySelectorAll(".decrease-btn").forEach(a=>{a.addEventListener("click",t=>{try{const n=t.currentTarget.getAttribute("data-id"),p=g.get();if(!p||!Object.prototype.hasOwnProperty.call(p,n)){o("Producto no encontrado en el carrito");return}const b=p[n];if(!b){o("Producto no encontrado en el carrito");return}b.quantity>1?j(n):confirm("¿Estás seguro de que deseas eliminar este producto del carrito?")&&L(n)}catch(i){console.error("Error al disminuir cantidad:",i),o("No se pudo disminuir la cantidad. Por favor, intenta de nuevo.")}})}),document.querySelectorAll(".increase-btn").forEach(a=>{a.addEventListener("click",t=>{try{const n=t.currentTarget.getAttribute("data-id"),p=g.get();if(!p||!Object.prototype.hasOwnProperty.call(p,n)){o("Producto no encontrado en el carrito");return}const b=p[n];if(!b){o("Producto no encontrado en el carrito");return}A(n,b.quantity+1)}catch(i){console.error("Error al aumentar cantidad:",i),o("No se pudo aumentar la cantidad. Por favor, intenta de nuevo.")}})}),document.querySelectorAll(".remove-item").forEach(a=>{a.addEventListener("click",t=>{try{const n=t.currentTarget.getAttribute("data-id");confirm("¿Estás seguro de que deseas eliminar este producto del carrito?")&&L(n)}catch(i){console.error("Error al eliminar producto:",i),o("No se pudo eliminar el producto. Por favor, intenta de nuevo.")}})})},P=e=>{try{const r=d(e);h&&(h.textContent=r),u&&(u.textContent=r)}catch(r){console.error("Error al actualizar total:",r)}};g.subscribe(e=>{w(e)}),I.subscribe(e=>{P(e)}),$.subscribe(e=>{e?o(e):y()}),c&&c.addEventListener("click",()=>{E()}),s&&s.addEventListener("click",()=>{x()})});
