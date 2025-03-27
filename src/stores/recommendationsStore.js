import { atom, map } from "nanostores";
import { cartItems } from "./cartStore";
import { wishlistItems } from "./wishlistStore";

// Store para almacenar el historial de productos vistos
export const viewedProducts = map({});

// Store para almacenar recomendaciones generadas
export const recommendations = atom([]);

// Añadir un producto al historial de vistas
export function addToViewedProducts(product) {
  const viewed = viewedProducts.get();

  // Añadir o actualizar el producto con la fecha actual
  viewedProducts.setKey(product.id, {
    ...product,
    viewedAt: new Date().toISOString(),
  });

  // Guardar en localStorage
  saveViewedProducts();

  // Actualizar recomendaciones
  generateRecommendations();
}

// Obtener productos vistos recientemente
export function getRecentlyViewedProducts(limit = 4) {
  const viewed = viewedProducts.get();

  return Object.values(viewed)
    .sort(
      (a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime()
    )
    .slice(0, limit);
}

// Generar recomendaciones basadas en comportamiento
export function generateRecommendations() {
  // En un sistema real, esto utilizaría algoritmos de recomendación más complejos
  // y posiblemente llamadas a una API de ML.

  // Para esta implementación simple, usaremos:
  // 1. Productos en carrito/wishlist para determinar categorías de interés
  // 2. Productos vistos recientemente para personalizar

  const cart = cartItems.get();
  const wishlist = wishlistItems.get();
  const viewed = viewedProducts.get();

  // Obtener categorías de interés
  const categoriesOfInterest = new Set();

  // Añadir categorías de productos en carrito (mayor peso)
  Object.values(cart).forEach((item) => {
    if (item.category) categoriesOfInterest.add(item.category);
  });

  // Añadir categorías de productos en wishlist
  Object.values(wishlist).forEach((item) => {
    if (item.category) categoriesOfInterest.add(item.category);
  });

  // Añadir categorías de productos vistos recientemente
  Object.values(viewed).forEach((item) => {
    if (item.category) categoriesOfInterest.add(item.category);
  });

  // Para una demo, simplemente devolvemos los productos más recientes
  // de categorías de interés que no estén en el carrito o wishlist

  // En una implementación real, obtendríamos productos de una API
  // recomendados específicamente para este usuario

  // Productos de ejemplo para recomendaciones
  const sampleProducts = [
    {
      id: "r1",
      name: "Kit de Cultivo Básico",
      price: 150000,
      discountPrice: 129000,
      image:
        "https://images.unsplash.com/photo-1520618821593-5016e5a0409f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description:
        "Kit de inicio para cultivo con todo lo necesario para comenzar tu jardín.",
      category: "accesorios",
    },
    {
      id: "r2",
      name: "Extracto Relajante",
      price: 69000,
      image:
        "https://images.unsplash.com/photo-1591736555078-d991c8e024ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description:
        "Extracto con propiedades relajantes para aliviar el estrés y ansiedad.",
      category: "extractos",
    },
    {
      id: "r3",
      name: "Semillas Premium",
      price: 52000,
      discountPrice: 45000,
      image:
        "https://images.unsplash.com/photo-1674243478722-387779cb1f09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description:
        "Pack de semillas de alta calidad con alta tasa de germinación.",
      category: "semillas",
    },
    {
      id: "r4",
      name: "Planta Medicinal",
      price: 95000,
      image:
        "https://images.unsplash.com/photo-1588084072563-819440434d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description:
        "Planta con propiedades medicinales cultivada en ambiente controlado.",
      category: "plantas",
    },
    {
      id: "r5",
      name: "Bálsamo Natural",
      price: 38000,
      discountPrice: 32000,
      image:
        "https://images.unsplash.com/photo-1558155001-7a4122e1155c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Bálsamo natural para aliviar dolores musculares.",
      category: "extractos",
    },
  ];

  // Filtrar productos que el usuario ya tiene en carrito o wishlist
  const cartIds = Object.keys(cart);
  const wishlistIds = Object.keys(wishlist);
  const filteredProducts = sampleProducts.filter(
    (product) =>
      !cartIds.includes(product.id) && !wishlistIds.includes(product.id)
  );

  // Dar prioridad a productos de categorías de interés
  const categoriesArray = Array.from(categoriesOfInterest);
  let recommended = filteredProducts;

  if (categoriesArray.length > 0) {
    // Ordenar poniendo primero productos de categorías de interés
    recommended = filteredProducts.sort((a, b) => {
      const aInInterest = categoriesArray.includes(a.category) ? 1 : 0;
      const bInInterest = categoriesArray.includes(b.category) ? 1 : 0;
      return bInInterest - aInInterest;
    });
  }

  // Limitar a 4 recomendaciones
  recommended = recommended.slice(0, 4);

  // Actualizar el store con las recomendaciones
  recommendations.set(recommended);

  return recommended;
}

// Guardar en localStorage
function saveViewedProducts() {
  if (typeof window !== "undefined") {
    // Limitar a los últimos 20 productos para no sobrecargar localStorage
    const viewed = viewedProducts.get();
    const limitedViewed = Object.values(viewed)
      .sort(
        (a, b) =>
          new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime()
      )
      .slice(0, 20)
      .reduce((acc, product) => {
        acc[product.id] = product;
        return acc;
      }, {});

    localStorage.setItem(
      "jamuchee-viewed-products",
      JSON.stringify(limitedViewed)
    );
  }
}

// Cargar desde localStorage
export function loadViewedProducts() {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("jamuchee-viewed-products");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        viewedProducts.set(parsed);
      } catch (error) {
        console.error(
          "Error loading viewed products from localStorage:",
          error
        );
      }
    }
  }
}

// Inicializar
loadViewedProducts();
generateRecommendations();
