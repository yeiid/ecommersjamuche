import { map } from "nanostores";

// Tipo para las reseñas
// interface Review {
//   id: string;
//   productId: string;
//   author: string;
//   rating: number;
//   comment: string;
//   date: string;
// }

// Store para las reseñas, organizado por producto
export const reviewsStore = map({});

// Añadir una reseña
export function addReview(review) {
  const reviews = reviewsStore.get();
  const productReviews = reviews[review.productId] || [];

  // Generar un ID único para la reseña
  const reviewId = `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Añadir la reseña con fecha actual
  const newReview = {
    ...review,
    id: reviewId,
    date: new Date().toISOString(),
  };

  // Actualizar el store
  reviewsStore.setKey(review.productId, [...productReviews, newReview]);

  // Guardar en localStorage
  saveReviews();

  return newReview;
}

// Eliminar una reseña
export function removeReview(productId, reviewId) {
  const reviews = reviewsStore.get();
  const productReviews = reviews[productId] || [];

  const filteredReviews = productReviews.filter(
    (review) => review.id !== reviewId
  );

  // Si no quedan reseñas para este producto, eliminar la clave
  if (filteredReviews.length === 0) {
    const newReviews = { ...reviews };
    delete newReviews[productId];
    reviewsStore.set(newReviews);
  } else {
    reviewsStore.setKey(productId, filteredReviews);
  }

  // Guardar en localStorage
  saveReviews();
}

// Obtener todas las reseñas de un producto
export function getProductReviews(productId) {
  const reviews = reviewsStore.get();
  return reviews[productId] || [];
}

// Calcular el rating promedio de un producto
export function getAverageRating(productId) {
  const reviews = getProductReviews(productId);

  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return sum / reviews.length;
}

// Guardar en localStorage
function saveReviews() {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "jamuchee-reviews",
      JSON.stringify(reviewsStore.get())
    );
  }
}

// Cargar desde localStorage
export function loadReviews() {
  if (typeof window !== "undefined") {
    const savedReviews = localStorage.getItem("jamuchee-reviews");
    if (savedReviews) {
      try {
        const parsedReviews = JSON.parse(savedReviews);
        reviewsStore.set(parsedReviews);
      } catch (error) {
        console.error("Error loading reviews from localStorage:", error);
      }
    }
  }
}

// Inicializar
loadReviews();
