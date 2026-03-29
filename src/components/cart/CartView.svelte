<script>
  import { cartItems, cartCount, cartTotal, updateCartItemQuantity, removeItemCompletely, clearCart } from "../../stores/cartStore";
  import { storeConfig, formatPrice, generateWhatsAppUrl } from "../../config/store.config";

  let items = $state({});
  let count = $state(0);
  let total = $state(0);
  let customerName = $state("");

  // Subscribe to stores
  $effect(() => {
    const unsub1 = cartItems.subscribe(v => items = v);
    const unsub2 = cartCount.subscribe(v => count = v);
    const unsub3 = cartTotal.subscribe(v => total = v);
    return () => { unsub1(); unsub2(); unsub3(); };
  });

  function getItemsList() {
    return Object.values(items).filter(Boolean);
  }

  function getItemPrice(item) {
    return item.discountPrice && item.discountPrice > 0 ? item.discountPrice : item.price;
  }

  function handleCheckout() {
    const list = getItemsList();
    if (list.length === 0) return;

    const cartForWhatsApp = list.map(item => ({
      name: item.name,
      price: getItemPrice(item),
      quantity: item.quantity,
    }));

    const url = generateWhatsAppUrl(cartForWhatsApp, customerName || undefined);
    window.open(url, "_blank");
  }
</script>

<div class="space-y-6">
  {#if count === 0}
    <!-- Empty State -->
    <div class="text-center py-16">
      <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <svg class="w-12 h-12 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2">Tu carrito está vacío</h3>
      <p class="text-slate-500 dark:text-slate-400 mb-6">¡Explora nuestros productos y encuentra algo que te encante!</p>
      <a href="/productos" class="btn btn-primary">Ver productos</a>
    </div>
  {:else}
    <!-- Cart Items -->
    <div class="space-y-4">
      {#each getItemsList() as item (item.id)}
        <div class="glass-card p-4 flex gap-4 items-center">
          <img
            src={item.image}
            alt={item.name}
            class="w-20 h-20 rounded-xl object-cover shrink-0"
          />
          <div class="flex-grow min-w-0">
            <h4 class="font-semibold text-slate-800 dark:text-white text-sm truncate">{item.name}</h4>
            <p class="text-emerald-600 dark:text-emerald-400 font-bold text-sm mt-0.5">
              {formatPrice(getItemPrice(item))}
            </p>
            <!-- Quantity Controls -->
            <div class="flex items-center gap-2 mt-2">
              <button
                onclick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                class="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-sm font-bold transition-colors"
              >−</button>
              <span class="text-sm font-semibold w-6 text-center text-slate-800 dark:text-white">{item.quantity}</span>
              <button
                onclick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                class="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-sm font-bold transition-colors"
              >+</button>
            </div>
          </div>
          <div class="text-right shrink-0">
            <p class="font-bold text-slate-900 dark:text-white text-sm">
              {formatPrice(getItemPrice(item) * item.quantity)}
            </p>
            <button
              onclick={() => removeItemCompletely(item.id)}
              class="text-rose-500 hover:text-rose-600 text-xs mt-1 transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      {/each}
    </div>

    <!-- Summary -->
    <div class="glass-card p-6 space-y-4">
      <div class="flex justify-between text-sm text-slate-600 dark:text-slate-300">
        <span>Productos ({count})</span>
        <span>{formatPrice(total)}</span>
      </div>
      <div class="flex justify-between text-sm text-slate-600 dark:text-slate-300">
        <span>Envío</span>
        <span class="text-emerald-600 dark:text-emerald-400 font-medium">Coordinar por WhatsApp</span>
      </div>
      <div class="border-t border-slate-200 dark:border-slate-700 pt-4 flex justify-between">
        <span class="text-lg font-bold text-slate-900 dark:text-white">Total</span>
        <span class="text-lg font-bold text-emerald-700 dark:text-emerald-400">{formatPrice(total)}</span>
      </div>
    </div>

    <!-- Customer Info -->
    <div class="glass-card p-6">
      <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        Tu nombre (opcional)
      </label>
      <input
        type="text"
        bind:value={customerName}
        placeholder="¿Cómo te llamas?"
        class="input w-full"
      />
    </div>

    <!-- Actions -->
    <div class="space-y-3">
      <button onclick={handleCheckout} class="btn btn-whatsapp w-full justify-center gap-2 text-base py-4 animate-pulse-glow">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        Enviar pedido por WhatsApp
      </button>

      <button onclick={() => clearCart()} class="btn btn-secondary w-full justify-center text-sm">
        Vaciar carrito
      </button>
    </div>
  {/if}
</div>
