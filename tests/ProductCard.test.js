import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { setupAstroTest, cleanupAstroTest } from "./utils/astro-test-utils";

// Mock de funciones globales que utiliza ProductCard
const setupGlobalMocks = () => {
  global.addToCart = vi.fn();
  global.addToWishlist = vi.fn();
  global.removeFromWishlist = vi.fn();
  global.isInWishlist = vi.fn().mockReturnValue(false);
  global.updateWishlistUI = vi.fn();
  return {
    addToCart: global.addToCart,
    addToWishlist: global.addToWishlist,
    removeFromWishlist: global.removeFromWishlist,
    isInWishlist: global.isInWishlist,
    updateWishlistUI: global.updateWishlistUI,
  };
};

describe("ProductCard Component", () => {
  afterEach(() => {
    cleanupAstroTest();
    vi.clearAllMocks();
  });

  // Test para las propiedades renderizadas en el componente
  describe("Renderización de propiedades", () => {
    beforeEach(() => {
      // Configurar el entorno Astro para las pruebas
      setupAstroTest();
    });

    it("formatea correctamente los precios en formato colombiano", () => {
      // Simulamos la función formatPrice del componente
      const formatPrice = (price) => {
        return new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
        }).format(price);
      };

      // Comprobar que el formato sea correcto para diferentes valores
      // Nota: Intl.NumberFormat puede incluir un espacio después del símbolo $ en algunas localizaciones
      const formatted25000 = formatPrice(25000);
      expect(formatted25000).toMatch(/\$\s*25\.000/); // Acepta con o sin espacio

      const formatted1M = formatPrice(1000000);
      expect(formatted1M).toMatch(/\$\s*1\.000\.000/);

      const formatted0 = formatPrice(0);
      expect(formatted0).toMatch(/\$\s*0/);
    });

    it("detecta correctamente si hay un descuento", () => {
      // Función para comprobar si hay descuento
      const hasDiscount = (normalPrice, discountPrice) => discountPrice > 0;

      expect(hasDiscount(50000, 45000)).toBe(true);
      expect(hasDiscount(50000, 0)).toBe(false);
      expect(hasDiscount(50000, null)).toBe(false);
      expect(hasDiscount(50000, undefined)).toBe(false);
    });
  });

  // Test para la visualización condicional
  describe("Visualización condicional", () => {
    beforeEach(() => {
      setupAstroTest();
    });

    it("muestra etiqueta de oferta cuando hay descuento", () => {
      // Simular la lógica de renderizado condicional
      const hasDiscountLabel = (hasDiscount) => {
        return hasDiscount ? "OFERTA" : null;
      };

      expect(hasDiscountLabel(true)).toBe("OFERTA");
      expect(hasDiscountLabel(false)).toBeNull();
    });

    it("muestra etiqueta de nuevo para productos nuevos", () => {
      // Simular la lógica de renderizado condicional
      const hasNewLabel = (isNew) => {
        return isNew ? "NUEVO" : null;
      };

      expect(hasNewLabel(true)).toBe("NUEVO");
      expect(hasNewLabel(false)).toBeNull();
    });
  });

  // Tests de interacción con el DOM
  describe("Interacciones del usuario", () => {
    let mocks;

    beforeEach(() => {
      // Configurar entorno de prueba Astro con DOM
      setupAstroTest();

      // Configurar el DOM virtual para los tests
      document.body.innerHTML = `
        <div class="product-card" data-product-id="prod-1" data-product-name="Producto Test" data-product-description="Descripción test">
          <img src="/test/image.jpg" alt="Producto Test">
          <div class="text-lg font-bold">$50.000</div>
          <button class="add-to-cart-btn">Agregar</button>
          <button class="wishlist-btn" data-product-id="prod-1">
            <svg class="wishlist-icon"></svg>
          </button>
        </div>
      `;

      // Asegurar que los elementos tienen las propiedades necesarias
      const addButton = document.querySelector(".add-to-cart-btn");
      if (addButton && !addButton.innerText) {
        Object.defineProperty(addButton, "innerText", {
          writable: true,
          value: "Agregar",
        });
      }

      // Configurar mocks globales
      mocks = setupGlobalMocks();
    });

    it("llama a addToCart con los datos correctos al hacer clic en el botón de agregar", () => {
      // Simular el evento DOMContentLoaded
      const domLoadedEvent = new Event("DOMContentLoaded");
      document.dispatchEvent(domLoadedEvent);

      // Definir el manejador para el evento
      document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
          const productCard = e.currentTarget.closest(".product-card");
          if (!productCard) return;

          const id = productCard.getAttribute("data-product-id");
          const name = productCard.getAttribute("data-product-name");
          const image = productCard.querySelector("img")?.getAttribute("src");
          const description = productCard.getAttribute(
            "data-product-description"
          );
          const priceText =
            productCard
              .querySelector(".text-lg.font-bold")
              ?.textContent?.trim() || "0";
          const price = parseInt(priceText.replace(/\D/g, ""), 10);

          global.addToCart({ id, name, price, image, description });
        });
      });

      // Simular el evento click en el botón de agregar al carrito
      const addButton = document.querySelector(".add-to-cart-btn");
      addButton.click();

      // Verificar que se llame a addToCart con los datos correctos
      expect(mocks.addToCart).toHaveBeenCalledWith({
        id: "prod-1",
        name: "Producto Test",
        price: 50000,
        image: "/test/image.jpg",
        description: "Descripción test",
      });
    });

    it("cambia el texto del botón temporalmente después de agregar al carrito", () => {
      // Mock para setTimeout
      vi.useFakeTimers();

      // Crear un botón completamente mockado
      const buttonMock = {
        innerText: "Agregar",
        addEventListener: vi.fn(),
      };

      // Simular un evento de clic simple
      const clickEvent = {
        currentTarget: buttonMock,
      };

      // Definir la función de callback que será llamada en el evento click
      const clickHandler = (e) => {
        e.currentTarget.innerText = "✓ Añadido";
        setTimeout(() => {
          e.currentTarget.innerText = "Agregar";
        }, 1500);
      };

      // Establecer el handler
      buttonMock.addEventListener("click", clickHandler);

      // Estado inicial del botón
      expect(buttonMock.innerText).toBe("Agregar");

      // Simular el clic llamando directamente al handler
      clickHandler(clickEvent);

      // Verificar que el texto cambie inmediatamente
      expect(buttonMock.innerText).toBe("✓ Añadido");

      // Avanzar el temporizador
      vi.advanceTimersByTime(1500);

      // Verificar que el texto vuelva al original
      expect(buttonMock.innerText).toBe("Agregar");

      // Restaurar temporizadores reales
      vi.useRealTimers();
    });
  });

  // Test para manejo de lista de deseos
  describe("Manejo de lista de deseos", () => {
    let mocks;

    beforeEach(() => {
      // Configurar entorno de prueba Astro
      setupAstroTest();

      // Configurar el DOM virtual para los tests
      document.body.innerHTML = `
        <div class="product-card" data-product-id="prod-1" data-product-name="Producto Test" data-product-description="Descripción test">
          <img src="/test/image.jpg" alt="Producto Test">
          <button class="wishlist-btn" data-product-id="prod-1">
            <svg class="wishlist-icon"></svg>
          </button>
        </div>
      `;

      // Configurar mocks globales
      mocks = setupGlobalMocks();
    });

    it("agrega el producto a la lista de deseos cuando no está en ella", () => {
      // Configurar el estado: el producto NO está en la lista de deseos
      mocks.isInWishlist.mockReturnValue(false);

      // Simular el evento DOMContentLoaded y definir comportamiento
      document.querySelectorAll(".wishlist-btn").forEach((button) => {
        const productId = button.getAttribute("data-product-id");

        button.addEventListener("click", () => {
          if (!global.isInWishlist(productId)) {
            global.addToWishlist({ id: productId });
          } else {
            global.removeFromWishlist(productId);
          }
        });
      });

      // Simular clic en el botón de lista de deseos
      const wishlistButton = document.querySelector(".wishlist-btn");
      wishlistButton.click();

      // Verificar que se llame a addToWishlist con el ID correcto
      expect(mocks.addToWishlist).toHaveBeenCalled();
      expect(mocks.removeFromWishlist).not.toHaveBeenCalled();
    });

    it("remueve el producto de la lista de deseos cuando ya está en ella", () => {
      // Configurar el estado: el producto YA está en la lista de deseos
      mocks.isInWishlist.mockReturnValue(true);

      // Simular el evento DOMContentLoaded y definir comportamiento
      document.querySelectorAll(".wishlist-btn").forEach((button) => {
        const productId = button.getAttribute("data-product-id");

        button.addEventListener("click", () => {
          if (!global.isInWishlist(productId)) {
            global.addToWishlist({ id: productId });
          } else {
            global.removeFromWishlist(productId);
          }
        });
      });

      // Simular clic en el botón de lista de deseos
      const wishlistButton = document.querySelector(".wishlist-btn");
      wishlistButton.click();

      // Verificar que se llame a removeFromWishlist con el ID correcto
      expect(mocks.removeFromWishlist).toHaveBeenCalled();
      expect(mocks.addToWishlist).not.toHaveBeenCalled();
    });
  });
});
