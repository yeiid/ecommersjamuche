<script>
  import { onMount } from "svelte";
  import { fade, slide, scale } from "svelte/transition";
  import { Package, Settings, Save, Plus, Trash2, Image as ImageIcon, LogOut, CheckCircle2, Search, Filter, Users, Eye } from "lucide-svelte";
  import { storeConfig } from "../../config/store.config"; // For types only

  let { role = "admin" } = $props();
  let config = $state(null);
  let activeTab = $state(role === 'super' ? 'usuarios' : "general"); // "general", "productos", "about", "usuarios", "apariencia"
  let users = $state([]); // Solo para súper admin
  let isSaving = $state(false);
  let feedback = $state("");
  let feedbackType = $state("success"); // "success" or "error"
  let searchQuery = $state("");
  let hasUnsavedChanges = $state(false);

  // Template for adding new products (deep copy handled in addProduct)
  const newProductTemplate = {
    name: "Nuevo Producto",
    description: "Descripción del producto...",
    price: 0,
    discountPrice: 0,
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400",
    category: "",
    featured: false,
    isNew: true,
    benefits: ["Beneficio 1", "Beneficio 2"],
  };

  /**
   * Cargar datos desde la API
   */
  async function loadData() {
    try {
      const response = await fetch(`/api/config.json?t=${Date.now()}`);
      if (response.ok) {
        config = await response.json();
      }
    } catch (e) {
      console.error("Error al cargar la configuración:", e);
      showFeedback("Error al cargar los datos", "error");
    }
  }

  /**
   * Mostrar feedback temporal
   */
  function showFeedback(message, type = "success") {
    feedback = message;
    feedbackType = type;
    setTimeout(() => (feedback = ""), 4000);
  }

  /**
   * Guardar datos en el servidor
   */
  async function saveData() {
    isSaving = true;
    try {
      // Usamos JSON stringify/parse para limpiar los proxies de Svelte 5 y enviar un objeto plano
      const dataToSave = JSON.parse(JSON.stringify(config));
      
      const response = await fetch(`/api/config.json?t=${Date.now()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        showFeedback("¡Cambios guardados correctamente!");
        hasUnsavedChanges = false;
      } else {
        showFeedback("Error al guardar", "error");
      }
    } catch (e) {
      showFeedback("Error de red", "error");
    } finally {
      isSaving = false;
    }
  }

  /**
   * Filtrar productos según la búsqueda
   */
  const filteredProducts = $derived(
    (config?.products || []).filter(p => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || 
             p.category.toLowerCase().includes(q);
    })
  );

  function addProduct() {
    const defaultCategory = config.categories?.[0] || "";
    const newId = `p-${Date.now()}`;
    
    const newP = { 
      id: newId,
      name: "Nuevo Producto",
      description: "Descripción...",
      price: 0,
      image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400",
      category: defaultCategory,
      benefits: []
    };
    
    config.products = [newP, ...config.products];
    hasUnsavedChanges = true;
    showFeedback("Producto añadido (temporalmente hasta guardar)");
  }

  function removeProduct(id) {
    if (confirm("¿Eliminar este producto?")) {
      config.products = config.products.filter(p => p.id !== id);
      hasUnsavedChanges = true;
      showFeedback("Producto eliminado (temporalmente hasta guardar)");
    }
  }

  async function logout() {
    console.log("[DEBUG] Iniciando logout forzado...");
    
    // 0. Primer ataque: Limpieza agresiva de cookies por JS (por si el fetch falla)
    document.cookie = "admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax";
    document.cookie = "admin_session=; Path=/admin; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax";
    
    // Failsafe: Redirigir de todos modos tras 1.2 segundos
    const timeout = setTimeout(() => {
      console.log("[DEBUG] Redirección forzada por timeout");
      window.location.href = "/admin/login?logout=1";
    }, 1200);

    try {
      const response = await fetch(`/api/auth?t=${Date.now()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      
      clearTimeout(timeout);
      if (response.ok) {
        console.log("[DEBUG] Logout exitoso");
        window.location.href = "/admin/login?logout=1";
      } else {
        const status = response.status;
        if (status === 403) {
           alert("Sesión no válida en servidor. Limpiando...");
           window.location.href = "/admin/login?logout=1";
           return;
        }
        alert("Error al cerrar sesión. Re-intentando localmente...");
        window.location.href = "/admin/login?logout=1";
      }
    } catch (err) {
      clearTimeout(timeout);
      console.error("[DEBUG] Error de red", err);
      window.location.href = "/admin/login?logout=1";
    }
  }

  function addValue() {
    config.about.values = [
      ...config.about.values,
      { icon: "✨", title: "Nuevo Valor", description: "Descripción..." },
    ];
  }

  function addBenefit(product) {
    product.benefits = [...(product.benefits || []), "Nuevo beneficio"];
    hasUnsavedChanges = true;
  }

  function removeBenefit(product, index) {
    product.benefits = product.benefits.filter((_, i) => i !== index);
    hasUnsavedChanges = true;
  }

  function addCategory() {
    const newCat = prompt("Nombre de la nueva categoría:");
    if (newCat && !config.categories.includes(newCat)) {
      config.categories = [...config.categories, newCat];
      hasUnsavedChanges = true;
      showFeedback("Categoría añadida");
    }
  }

  function removeCategory(cat) {
    if (confirm(`¿Eliminar categoría "${cat}"? Los productos en esta categoría no se borrarán pero quedarán sin categoría asignada.`)) {
      config.categories = config.categories.filter(c => c !== cat);
    }
  }

  /**
   * Cargar usuarios (Solo para Súper Admin)
   */
  async function loadUsers() {
    try {
      const response = await fetch(`/api/users.json?t=${Date.now()}`);
      if (response.ok) {
        users = await response.json();
      }
    } catch (e) {
      console.error("Error cargando usuarios:", e);
    }
  }

  async function addUser() {
    const username = prompt("Nombre de usuario para el cliente:");
    const password = prompt("Contraseña:");
    const name = prompt("Nombre Empresa:");
    
    if (!username || !password) return;

    const newUser = {
      id: Date.now().toString(),
      username,
      password,
      name: name || username,
      role: 'admin'
    };

    try {
      const response = await fetch(`/api/users.json?t=${Date.now()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });
      if (response.ok) {
        users = [...users, newUser];
        showFeedback("Usuario creado");
      } else if (response.status === 403) {
        alert("Tu sesión ha expirado. Por favor re-ingresa.");
        window.location.href = "/admin/login";
      }
    } catch (e) {
      showFeedback("Error al crear", "error");
    }
  }

  async function deleteUser(id) {
    if (!confirm("¿Eliminar usuario?")) return;
    try {
      const response = await fetch(`/api/users.json?t=${Date.now()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id })
      });
      if (response.ok) {
        users = users.filter((u) => u.id !== id);
        showFeedback("Usuario eliminado");
      } else if (response.status === 403) {
        alert("Tu sesión ha expirado. Limpiando...");
        window.location.href = "/admin/login";
      } else {
        showFeedback("Error al eliminar", "error");
      }
    } catch (e) {
      showFeedback("Error");
    }
  }

  onMount(() => {
    if (role === 'super') {
      loadUsers();
      // Mínima config para evitar errores de renderizado
      config = { name: "Administrador Maestro", products: [], about: { values: [] } };
    } else {
      loadData();
    }
  });
</script>

{#if !config}
  <div class="flex items-center justify-center min-h-[60vh]">
    <div class="text-center space-y-4 animate-pulse">
      <div class="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p class="text-slate-500 font-medium">Cargando base de datos...</p>
    </div>
  </div>
{:else}
  <div class="space-y-8 pb-20">
    <!-- ═══ STICKY CONTROL CENTER ═══ -->
    <header class="sticky top-4 z-40">
      <div class="glass border border-white/10 dark:border-slate-800/50 shadow-2xl rounded-[2rem] p-2 pr-4 flex items-center justify-between gap-4 backdrop-blur-xl">
        <!-- Logo & Brand -->
        <div class="flex items-center gap-3 pl-2">
          <div class="w-11 h-11 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-inner text-black font-bold text-lg">
            {config.name?.charAt(0).toUpperCase()}
          </div>
          <div class="hidden sm:block">
            <h1 class="font-bold text-slate-900 dark:text-white leading-tight">Panel {config.name}</h1>
            <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              {role === 'super' ? 'Súper Admin' : 'Administrador'}
            </p>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <nav class="flex items-center bg-slate-100 dark:bg-slate-800/50 p-1 rounded-2xl">
          {#if role !== 'super'}
            <button 
              onclick={() => activeTab = 'general'}
              class:active={activeTab === 'general'}
              class="tab-btn"
            >
              <span class="sm:hidden">🏢</span>
              <span class="hidden sm:inline">🏢 General</span>
            </button>
            <button 
              onclick={() => activeTab = 'productos'}
              class:active={activeTab === 'productos'}
              class="tab-btn"
            >
              <span class="sm:hidden">📦</span>
              <span class="hidden sm:inline">📦 Productos</span>
            </button>
            <button 
              onclick={() => activeTab = 'about'}
              class:active={activeTab === 'about'}
              class="tab-btn"
            >
              <span class="sm:hidden">📖</span>
              <span class="hidden sm:inline">📖 Nosotros</span>
            </button>
            <button 
              onclick={() => activeTab = 'apariencia'}
              class:active={activeTab === 'apariencia'}
              class="tab-btn"
            >
              <span class="sm:hidden">🎨</span>
              <span class="hidden sm:inline">🎨 Apariencia</span>
            </button>
          {/if}
          
          {#if role === 'super'}
            <button 
              onclick={() => activeTab = 'usuarios'}
              class:active={activeTab === 'usuarios'}
              class="tab-btn"
            >
              <span class="sm:hidden">🔑</span>
              <span class="hidden sm:inline">🔑 Usuarios / Clientes</span>
            </button>
          {/if}
        </nav>

        <!-- Actions & Navigation Shortcuts -->
        <div class="flex items-center gap-2">
          <!-- View Store Shortcut -->
          <a 
            href="/" 
            target="_blank"
            title="Ver Tienda"
            class="w-11 h-11 rounded-2xl flex items-center justify-center text-slate-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/10 transition-all active:scale-95 border border-transparent hover:border-yellow-200"
          >
            <Eye size={20} />
          </a>

          {#if role !== 'super'}
            <button 
              onclick={saveData}
              disabled={isSaving}
              class="btn-save relative"
              class:pulse={hasUnsavedChanges && !isSaving}
            >
              {#if isSaving}
                <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Guardando...</span>
              {:else}
                <Save size={18} />
                <span>Guardar Cambios</span>
                {#if hasUnsavedChanges}
                  <span class="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 animate-bounce"></span>
                {/if}
              {/if}
            </button>
          {/if}
          
          <button 
            onclick={logout} 
            title="Cerrar Sesión"
            class="w-11 h-11 rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all active:scale-95 border border-transparent hover:border-rose-200"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <!-- Feedback Toast (Floating) -->
      {#if feedback}
        <div 
          transition:fade
          class:error={feedbackType === 'error'}
          class="absolute top-full left-1/2 -translate-x-1/2 mt-4 px-6 py-3 rounded-2xl text-sm font-bold shadow-xl border z-50 feedback-toast"
        >
          {feedback}
        </div>
      {/if}
    </header>

    <!-- ═══ SECTION CONTENT ═══ -->
    <main class="max-w-6xl mx-auto px-2">
      
      {#if activeTab === 'general'}
        <!-- 🏢 GENERAL SETTINGS -->
        <div transition:fade class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section class="glass-card p-8 space-y-6">
            <h2 class="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white mb-6">
              <span class="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-sm">🏢</span>
                Información Básica
            </h2>
            <div class="space-y-4">
              <div class="group">
                <label for="name" class="label text-slate-500 dark:text-slate-400">Nombre de la Tienda</label>
                <input id="name" type="text" bind:value={config.name} class="admin-input font-bold text-lg" />
              </div>
              <div class="group">
                <label for="tagline" class="label text-slate-500 dark:text-slate-400">Eslogan (Tagline)</label>
                <input id="tagline" type="text" bind:value={config.tagline} class="admin-input" />
              </div>
              <div class="group">
                <label for="badge" class="label text-slate-500 dark:text-slate-400">Insignia Destacada (Badge)</label>
                <input id="badge" type="text" bind:value={config.heroBadge} class="admin-input text-primary font-bold" placeholder="Ej: ✨ Expertos en Belleza" />
              </div>
              <div class="group">
                <label for="desc" class="label text-slate-500 dark:text-slate-400">Descripción SEO / Meta</label>
                <textarea id="desc" bind:value={config.description} class="admin-input h-24 pt-2"></textarea>
              </div>
            </div>
          </section>

          <section class="glass-card p-8 space-y-6">
            <h2 class="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white mb-6">
              <span class="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-sm">📲</span>
                Canales de Venta
            </h2>
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="group">
                  <label for="wa" class="label text-slate-500 dark:text-slate-400">WhatsApp (Número)</label>
                  <input id="wa" type="text" bind:value={config.whatsappNumber} class="admin-input" placeholder="Ej: 573001234567" />
                </div>
                <div class="group">
                  <label for="cur" class="label text-slate-500 dark:text-slate-400">Moneda (ej: $)</label>
                  <input id="cur" type="text" bind:value={config.currency.symbol} class="admin-input text-center" />
                </div>
              </div>
              <div class="group">
                <label for="greet" class="label text-slate-500 dark:text-slate-400">Saludo inicial WhatsApp</label>
                <input id="greet" type="text" bind:value={config.whatsappGreeting} class="admin-input" />
              </div>
              <div class="group">
                <label for="email" class="label text-slate-500 dark:text-slate-400">E-mail de contacto</label>
                <input id="email" type="email" bind:value={config.contact.email} class="admin-input" />
              </div>
            </div>
          </section>
        </div>

        <!-- 📍 LOCATION & SOCIAL -->
        <div transition:fade class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <section class="glass-card p-8 space-y-6">
            <h2 class="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white mb-6">
              <span class="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-sm">📍</span>
                Ubicación Física
            </h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="group">
                <label for="city" class="label text-slate-500 dark:text-slate-400">Ciudad</label>
                <input id="city" type="text" bind:value={config.contact.city} class="admin-input" />
              </div>
              <div class="group">
                <label for="country" class="label text-slate-500 dark:text-slate-400">País</label>
                <input id="country" type="text" bind:value={config.contact.country} class="admin-input" />
              </div>
            </div>
          </section>

          <section class="glass-card p-8 space-y-6">
            <h2 class="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white mb-6">
              <span class="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-sm">🌐</span>
                Presencia en Redes
            </h2>
            <div class="space-y-4">
              <div class="group">
                <label for="ig" class="label text-slate-500 dark:text-slate-400">Instagram (URL)</label>
                <input id="ig" type="url" bind:value={config.social.instagram} class="admin-input text-xs" placeholder="https://instagram.com/tu_cuenta" />
              </div>
              <div class="group">
                <label for="fb" class="label text-slate-500 dark:text-slate-400">Facebook (URL)</label>
                <input id="fb" type="url" bind:value={config.social.facebook} class="admin-input text-xs" placeholder="https://facebook.com/tu_cuenta" />
              </div>
              <div class="group">
                <label for="tk" class="label text-slate-500 dark:text-slate-400">TikTok (URL)</label>
                <input id="tk" type="url" bind:value={config.social.tiktok} class="admin-input text-xs" placeholder="https://tiktok.com/@tu_cuenta" />
              </div>
            </div>
          </section>
        </div>

        <!-- 📁 CATEGORIES MANAGEMENT -->
        <div transition:fade class="grid grid-cols-1 gap-8 mt-8">
          <section class="glass-card p-8 space-y-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white">
                <span class="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-sm">📁</span>
                  Gestión de Categorías
              </h2>
              <button onclick={addCategory} class="btn-primary-compact !py-2 !px-4">
                <span>+ Añadir Categoría</span>
              </button>
            </div>
            <div class="flex flex-wrap gap-3">
              {#each config.categories as cat}
                <div class="group relative flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-4 pr-2 py-2 rounded-2xl text-sm font-bold shadow-sm hover:border-yellow-500/50 transition-all">
                  <span class="text-slate-700 dark:text-slate-200">{cat}</span>
                  <button 
                    onclick={() => removeCategory(cat)} 
                    class="w-6 h-6 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors"
                    title="Eliminar categoría"
                  >×</button>
                </div>
              {/each}
              {#if config.categories.length === 0}
                <p class="text-sm text-slate-500 italic">No hay categorías definidas. Los productos necesitan al menos una.</p>
              {/if}
            </div>
          </section>
        </div>

      {:else if activeTab === 'productos'}
        <!-- 📦 PRODUCT MANAGER -->
        <div transition:fade class="space-y-6">
          <!-- Sub-Header: Search & Action -->
          <div class="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 glass-card">
            <div class="relative w-full sm:max-w-md">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
              <input 
                type="text" 
                bind:value={searchQuery} 
                placeholder="Buscar productos por nombre o categoría..." 
                class="admin-input pl-11 !rounded-2xl !bg-white/50 dark:!bg-slate-900/30"
              />
            </div>
            <button onclick={addProduct} class="btn-primary-compact w-full sm:w-auto">
              <span>+ Añadir Producto</span>
            </button>
          </div>

          <!-- Product Grid -->
          <div class="grid grid-cols-1 gap-4">
            {#each filteredProducts as product (product.id)}
              <div animate:slide class="product-item glass-card scale-in-center">
                <div class="flex flex-col lg:flex-row gap-6 p-6">
                  <!-- Image & Controls -->
                  <div class="shrink-0 space-y-4">
                    <div class="relative w-full lg:w-48 aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-100">
                      <img src={product.image} alt="" class="w-full h-full object-cover" />
                      <div class="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                         <p class="text-[10px] text-white font-bold text-center">PREVISUALIZACIÓN ACTUAL</p>
                      </div>
                    </div>
                    <button onclick={() => removeProduct(product.id)} class="btn-danger w-full">
                      Eliminar Producto
                    </button>
                  </div>

                  <!-- Editable Fields (Grid layout for efficiency) -->
                  <div class="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Col 1: Main Info -->
                    <div class="lg:col-span-2 space-y-4">
                      <div>
                        <label class="label text-slate-400">Nombre del Producto</label>
                        <input type="text" bind:value={product.name} class="admin-input !font-bold" />
                      </div>
                      <div>
                        <label class="label text-slate-400">Descripción detallada</label>
                        <textarea bind:value={product.description} class="admin-input h-28 text-sm pt-2"></textarea>
                      </div>
                    </div>

                      <div>
                        <label class="label text-slate-400">URL de la Imagen</label>
                        <div class="flex gap-2">
                          <input type="text" bind:value={product.image} class="admin-input text-xs" placeholder="https://..." />
                        </div>
                      </div>

                    <!-- Col 2: Specs & Pricing -->
                    <div class="space-y-4 bg-slate-50/50 dark:bg-slate-900/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                      <div class="grid grid-cols-2 gap-3">
                        <div>
                          <label class="label text-slate-400">Precio Base</label>
                          <input type="number" bind:value={product.price} class="admin-input text-yellow-600 dark:text-yellow-400 font-bold" />
                        </div>
                        <div>
                          <label class="label text-slate-400">Oferta (opcional)</label>
                          <input type="number" bind:value={product.discountPrice} class="admin-input text-rose-500 font-bold" />
                        </div>
                      </div>
                      <div>
                        <label class="label text-slate-400">Categoría</label>
                        <select bind:value={product.category} class="admin-input text-sm">
                          <option value="">Sin categoría</option>
                          {#each config.categories as cat}
                            <option value={cat}>{cat}</option>
                          {/each}
                        </select>
                      </div>
                      <div class="pt-2 space-y-3">
                        <label class="toggle-container">
                          <input type="checkbox" bind:checked={product.featured} />
                          <span class="toggle-label">Marcar como Destacado ⭐</span>
                        </label>
                        <label class="toggle-container">
                          <input type="checkbox" bind:checked={product.isNew} />
                          <span class="toggle-label">Etiqueta "Nuevo" ✨</span>
                        </label>
                      </div>
                    </div>

                    <!-- Col 3: Benefits -->
                    <div class="space-y-4">
                       <div class="flex justify-between items-center">
                         <label class="label text-slate-400">Beneficios (Checklist)</label>
                         <button onclick={() => addBenefit(product)} class="text-[10px] font-bold text-yellow-600 hover:underline">+ Añadir</button>
                       </div>
                       <div class="space-y-2">
                         {#each (product.benefits || []) as benefit, idx}
                           <div class="flex gap-2">
                             <input type="text" bind:value={product.benefits[idx]} class="admin-input !py-1.5 !px-3 text-xs" />
                             <button onclick={() => removeBenefit(product, idx)} class="text-rose-500 hover:text-rose-700 px-1">×</button>
                           </div>
                         {/each}
                         {#if !product.benefits || product.benefits.length === 0}
                           <p class="text-[10px] text-slate-400 italic">No hay beneficios agregados.</p>
                         {/if}
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>

      {:else if activeTab === 'apariencia'}
        <!-- 🎨 APARIENCIA SETTINGS -->
        <div transition:fade class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section class="glass-card p-8 space-y-6">
            <h2 class="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white mb-6">
              <span class="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-sm">🎨</span>
                Colores de Marca
            </h2>
            <div class="space-y-6">
              <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-200">Color Primario (Rosa)</label>
                  <p class="text-xs text-slate-500">Usado en botones, iconos y elementos principales.</p>
                </div>
                <input type="color" bind:value={config.theme.primary} class="w-12 h-12 rounded-xl cursor-pointer bg-transparent" />
              </div>

              <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-200">Color de Acento (Violeta)</label>
                  <p class="text-xs text-slate-500">Usado en hover, badges y detalles secundarios.</p>
                </div>
                <input type="color" bind:value={config.theme.accent} class="w-12 h-12 rounded-xl cursor-pointer bg-transparent" />
              </div>

              <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div class="space-y-1">
                  <label class="font-bold text-slate-700 dark:text-slate-200">Fondo Principal (Blanco)</label>
                  <p class="text-xs text-slate-500">Color base de las secciones claras.</p>
                </div>
                <input type="color" bind:value={config.theme.surface} class="w-12 h-12 rounded-xl cursor-pointer bg-transparent" />
              </div>
            </div>
          </section>

          <section class="glass-card p-8 flex flex-col items-center justify-center text-center space-y-4">
             <div class="w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-inner mb-2" style="background-color: {config.theme.primary}; color: white">
                ✨
             </div>
             <h3 class="text-xl font-bold">Vista Previa</h3>
             <p class="text-sm text-slate-500 max-w-xs">Los cambios se aplicarán a toda la tienda al presionar "Guardar".</p>
             <div class="flex gap-2">
                <div class="w-8 h-8 rounded-lg shadow-sm" style="background-color: {config.theme.primary}"></div>
                <div class="w-8 h-8 rounded-lg shadow-sm" style="background-color: {config.theme.accent}"></div>
                <div class="w-8 h-8 rounded-lg shadow-sm border border-slate-200" style="background-color: {config.theme.surface}"></div>
             </div>
          </section>
        </div>

      {:else if activeTab === 'usuarios'}
        <!-- 🔑 SUPER ADMIN: USER MANAGEMENT -->
        <div transition:fade class="space-y-8 pb-10">
          <section class="glass-card p-10">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <div>
                <h2 class="text-2xl font-black flex items-center gap-3 text-slate-900 dark:text-white">
                  <span class="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center text-xl shadow-lg shadow-yellow-500/20">🔑</span>
                  Gestión de Clientes / Usuarios
                </h2>
                <p class="text-slate-500 dark:text-slate-400 text-sm mt-2">Crea y administra los accesos para tus clientes de e-commerce.</p>
              </div>
              <button onclick={addUser} class="btn-save !px-8 !py-4 !rounded-2xl">
                <span>Crear Nuevo Cliente +</span>
              </button>
            </div>

            <div class="overflow-hidden rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                    <th class="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Cliente / Empresa</th>
                    <th class="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Usuario</th>
                    <th class="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Rol</th>
                    <th class="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  {#each users as u}
                    <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td class="px-6 py-5">
                        <div class="font-bold text-slate-900 dark:text-white">{u.name}</div>
                      </td>
                      <td class="px-6 py-5">
                        <code class="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs text-yellow-600 font-bold">{u.username}</code>
                      </td>
                      <td class="px-6 py-5">
                        <span class="text-[10px] font-black uppercase px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full">
                          {u.role}
                        </span>
                      </td>
                      <td class="px-6 py-5 text-right">
                        <button onclick={() => deleteUser(u.id)} class="text-rose-500 hover:text-rose-700 font-bold text-xs p-2 transition-colors">
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  {/each}
                  {#if users.length === 0}
                    <tr>
                      <td colspan="4" class="px-6 py-20 text-center">
                        <div class="text-slate-300 dark:text-slate-700 mb-2">No hay clientes creados aún.</div>
                        <button onclick={addUser} class="text-yellow-500 text-xs font-bold hover:underline">Crear el primero ahora</button>
                      </td>
                    </tr>
                  {/if}
                </tbody>
              </table>
            </div>
          </section>
        </div>

      {:else}
        <!-- 📖 ABOUT US EDITOR -->
        <div transition:fade class="grid grid-cols-1 gap-8">
           <section class="glass-card p-8">
            <h2 class="text-xl font-bold flex items-center gap-2 mb-8">
              <span class="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-sm text-yellow-600">📖</span>
              Historia y Misión
            </h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div class="space-y-4">
                <input type="text" bind:value={config.about.historyTitle} class="admin-input font-bold" />
                <textarea bind:value={config.about.historyContent} class="admin-input h-48 pt-2" placeholder="Usa {name} para el nombre de la tienda"></textarea>
              </div>
              <div class="space-y-4">
                <input type="text" bind:value={config.about.missionTitle} class="admin-input font-bold" />
                <textarea bind:value={config.about.missionContent} class="admin-input h-48 pt-2"></textarea>
              </div>
            </div>
           </section>

           <section class="glass-card p-8">
            <div class="flex justify-between items-center mb-8">
              <h2 class="text-xl font-bold flex items-center gap-2">
                <span class="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-sm text-yellow-600">💎</span>
                Nuestros Valores
              </h2>
              <button onclick={addValue} class="btn-primary-compact">Añadir Valor +</button>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {#each config.about.values as val, i}
                <div class="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4 relative group">
                  <button 
                    onclick={() => config.about.values.splice(i, 1)} 
                    class="absolute -top-2 -right-2 bg-rose-500 text-white w-7 h-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg flex items-center justify-center"
                  >×</button>
                  <div class="flex items-center gap-3">
                    <input type="text" bind:value={val.icon} class="admin-input !w-14 text-center cursor-default" readonly />
                    <input type="text" bind:value={val.title} class="admin-input !font-bold" />
                  </div>
                  <textarea bind:value={val.description} class="admin-input !text-xs h-24 pt-2"></textarea>
                </div>
              {/each}
            </div>
           </section>
        </div>
      {/if}

    </main>
  </div>
{/if}

<style>
  :global(:root) {
    --admin-input-bg: rgba(248, 250, 252, 0.8);
  }

  /* Admin Base Styles */
  .glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  :global(.dark) .glass {
    background: rgba(15, 23, 42, 0.7);
  }

  .admin-input {
    @apply w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-xl px-4 py-2.5;
    @apply text-slate-800 dark:text-slate-100 placeholder-slate-400;
    @apply focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all duration-300;
  }

  .label {
    @apply block text-[10px] font-bold uppercase tracking-widest mb-1 pl-1;
  }

  /* Nav Tabs */
  .tab-btn {
    @apply px-4 sm:px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 text-slate-500;
  }
  .tab-btn.active {
    @apply bg-white dark:bg-black text-yellow-600 dark:text-yellow-400 shadow-md;
  }

  /* Buttons */
  .btn-save {
    @apply bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-yellow-500/20 active:scale-95 transition-all;
  }
  .btn-save:disabled {
    @apply bg-slate-400 opacity-50 cursor-not-allowed;
  }

  .btn-primary-compact {
    @apply bg-black dark:bg-yellow-500 hover:bg-slate-900 dark:hover:bg-yellow-400 text-white dark:text-black text-xs font-bold px-6 py-3 rounded-2xl transition-all shadow-lg;
  }

  .btn-danger {
    @apply text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-900/10 hover:bg-rose-500 hover:text-white px-4 py-2.5 rounded-xl transition-all border border-rose-100 dark:border-rose-900/20;
  }

  /* Product Items */
  .product-item {
    @apply transition-all duration-300 hover:shadow-xl hover:border-emerald-500/20;
  }

  .toggle-container {
    @apply flex items-center gap-3 cursor-pointer p-3 bg-white dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-emerald-500/30 transition-all;
  }
  .toggle-container input {
    @apply w-4 h-4 accent-yellow-600;
  }
  .toggle-label {
    @apply text-xs font-medium text-slate-600 dark:text-slate-300;
  }

  /* Feedback */
  .feedback-toast {
    @apply bg-yellow-500 text-black border-yellow-400;
  }
  .feedback-toast.error {
    @apply bg-rose-600 text-white border-rose-500;
  }

  @keyframes scale-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .scale-in-center {
    animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
</style>
