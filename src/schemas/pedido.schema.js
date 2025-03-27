/**
 * Esquemas de validación para pedidos utilizando Zod
 * Estos esquemas aseguran que los datos enviados a la base de datos cumplan con los tipos esperados
 */

import { z } from 'zod';

// Esquema para un producto en el pedido
const pedidoProductoSchema = z.object({
  id: z.string().uuid("El ID del producto debe ser un UUID válido"),
  name: z.string().min(1, "El nombre del producto es obligatorio"),
  price: z.number().int().positive("El precio debe ser un número positivo"),
  discountprice: z.number().int().nonnegative().optional().default(0),
  quantity: z.number().int().positive("La cantidad debe ser un número positivo"),
  image: z.string().optional(),
  total: z.number().int().nonnegative(),
});

// Esquema base para pedidos
const pedidoBaseSchema = z.object({
  usuario_nombre: z.string().min(1, "El nombre del usuario es obligatorio"),
  usuario_email: z.string().email("El email debe tener un formato válido"),
  usuario_telefono: z.string().optional(),
  direccion: z.string().min(1, "La dirección es obligatoria"),
  ciudad: z.string().min(1, "La ciudad es obligatoria"),
  estado: z.string().min(1, "El estado/provincia es obligatorio"),
  codigo_postal: z.string().optional(),
  productos: z.array(pedidoProductoSchema).min(1, "El pedido debe tener al menos un producto"),
  total: z.number().int().positive("El total debe ser un número positivo"),
  estado_pedido: z.string().optional().default("pendiente"),
  notas: z.string().optional(),
});

// Esquema para creación de pedidos (sin ID)
export const createPedidoSchema = pedidoBaseSchema;

// Esquema para pedidos completos (con ID)
export const pedidoSchema = pedidoBaseSchema.extend({
  id: z.string().uuid("El ID del pedido debe ser un UUID válido"),
  fecha_pedido: z.string().datetime().optional(),
  fecha_envio: z.string().datetime().optional(),
});

// Esquema para actualización parcial de pedidos
export const updatePedidoSchema = pedidoBaseSchema.partial();

// Esquema para validar IDs
export const pedidoIdSchema = z.object({
  id: z.string().uuid("El ID del pedido debe ser un UUID válido"),
});

/**
 * Funciones de utilidad para trabajar con esquemas de pedidos
 */

// Validar datos para crear un pedido nuevo
export function validateNewPedido(data) {
  return createPedidoSchema.parse(data);
}

// Validar datos para actualizar un pedido existente
export function validateUpdatePedido(data) {
  return updatePedidoSchema.parse(data);
}

// Validar un pedido completo
export function validatePedido(pedido) {
  return pedidoSchema.parse(pedido);
}

// Generar un nuevo ID para un pedido
export function generatePedidoId() {
  return crypto.randomUUID();
}

// Preparar un pedido para guardar en la base de datos
export function preparePedidoForSave(pedidoData, isNew = true) {
  // Si es un pedido nuevo y no tiene ID, generamos uno
  if (isNew && !pedidoData.id) {
    pedidoData.id = generatePedidoId();
  }
  
  // Validamos según sea una creación o actualización
  if (isNew) {
    return validateNewPedido(pedidoData);
  } else {
    return validateUpdatePedido(pedidoData);
  }
}

// Transformar carrito a formato de pedido
export function cartToPedido(cartItems, userInfo) {
  const productos = Object.values(cartItems).map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    discountprice: item.discountprice || 0,
    quantity: item.quantity,
    image: item.image,
    total: item.total,
  }));
  
  const total = productos.reduce((sum, item) => sum + item.total, 0);
  
  const pedido = {
    usuario_nombre: userInfo.nombre,
    usuario_email: userInfo.email,
    usuario_telefono: userInfo.telefono,
    direccion: userInfo.direccion,
    ciudad: userInfo.ciudad,
    estado: userInfo.estado,
    codigo_postal: userInfo.codigoPostal,
    productos,
    total,
    estado_pedido: "pendiente",
    notas: userInfo.notas || "",
  };
  
  return validateNewPedido(pedido);
} 