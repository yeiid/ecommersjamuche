/**
 * Mock de Supabase para pruebas
 *
 * Este archivo proporciona un mock completo de Supabase que puede usarse
 * en todas las pruebas para simular interacciones con la base de datos.
 */
import { vi } from "vitest";

// Base de datos en memoria para las pruebas
export const mockDb = {
  especies: [
    {
      id: "123e4567-e89b-12d3-a456-426614174000",
      nombre: "Lavanda",
      nombreCientifico: "Lavandula angustifolia",
      familia: "Lamiaceae",
      origen: "Mediterráneo",
      descripcion: "Planta aromática perenne con flores moradas.",
      propiedades: "Relajante, antiséptico, antiinflamatorio",
      usos: "Aceites esenciales, perfumería, medicina tradicional",
      imagen: "/especies/lavanda.jpg",
      imagenDetalle: "/especies/lavanda-detalle.jpg",
      featured: false,
    },
  ],
  products: [
    {
      id: "123e4567-e89b-12d3-a456-426614174001",
      name: "Aceite Esencial de Lavanda",
      price: 25000,
      discountprice: 0,
      image: "/productos/aceite-lavanda.jpg",
      description: "Aceite esencial de lavanda 100% puro.",
      category: "Aceites esenciales",
      stock: 10,
      isnew: true,
      featured: false,
      rating: 4.5,
      features: ["100% natural", "Extracción en frío", "Sin aditivos"],
      ingredients: ["Aceite esencial de lavanda"],
      especieid: "123e4567-e89b-12d3-a456-426614174000",
    },
  ],
  users: [
    {
      id: "123e4567-e89b-12d3-a456-426614174002",
      email: "admin@jamuchee.com",
      password: "admin123", // Nota: en un entorno real, nunca se almacenan contraseñas en texto plano
      role: "admin",
    },
  ],
};

/**
 * Crea un mock de Supabase con una base de datos en memoria
 * @param {Object} customDb - Base de datos personalizada (opcional)
 * @returns {Object} - Mock de Supabase
 */
export function createSupabaseMock(customDb = {}) {
  // Fusionar la base de datos predeterminada con la personalizada
  const db = { ...mockDb, ...customDb };

  // Crear mock de Supabase
  return {
    supabase: {
      from: vi.fn((table) => {
        // Asegúrarse de que la tabla existe
        if (!db[table]) {
          db[table] = [];
        }

        return {
          // SELECT
          select: vi.fn((columns = "*") => {
            return {
              order: vi.fn((column, { ascending } = { ascending: true }) => {
                return {
                  limit: vi.fn((limit) => {
                    const sortedData = [...db[table]]
                      .sort((a, b) => {
                        return ascending
                          ? a[column] > b[column]
                            ? 1
                            : -1
                          : a[column] < b[column]
                            ? 1
                            : -1;
                      })
                      .slice(0, limit);

                    return {
                      data: sortedData,
                      error: null,
                    };
                  }),
                  data: [...db[table]].sort((a, b) => {
                    return ascending
                      ? a[column] > b[column]
                        ? 1
                        : -1
                      : a[column] < b[column]
                        ? 1
                        : -1;
                  }),
                  error: null,
                };
              }),
              eq: vi.fn((field, value) => {
                const filteredData = db[table].filter(
                  (item) => item[field] === value
                );
                return {
                  data: filteredData,
                  error: null,
                  single: vi.fn(() => {
                    return {
                      data: filteredData.length > 0 ? filteredData[0] : null,
                      error:
                        filteredData.length > 0
                          ? null
                          : { message: "No se encontró el registro" },
                    };
                  }),
                };
              }),
              ilike: vi.fn((field, value) => {
                const searchTerm = value.replace(/%/g, "").toLowerCase();
                const filteredData = db[table].filter((item) =>
                  item[field].toLowerCase().includes(searchTerm)
                );
                return {
                  data: filteredData,
                  error: null,
                };
              }),
              in: vi.fn((field, values) => {
                const filteredData = db[table].filter((item) =>
                  values.includes(item[field])
                );
                return {
                  data: filteredData,
                  error: null,
                };
              }),
              gte: vi.fn((field, value) => {
                const filteredData = db[table].filter(
                  (item) => item[field] >= value
                );
                return {
                  data: filteredData,
                  error: null,
                };
              }),
              lte: vi.fn((field, value) => {
                const filteredData = db[table].filter(
                  (item) => item[field] <= value
                );
                return {
                  data: filteredData,
                  error: null,
                };
              }),
              gt: vi.fn((field, value) => {
                const filteredData = db[table].filter(
                  (item) => item[field] > value
                );
                return {
                  data: filteredData,
                  error: null,
                };
              }),
              lt: vi.fn((field, value) => {
                const filteredData = db[table].filter(
                  (item) => item[field] < value
                );
                return {
                  data: filteredData,
                  error: null,
                };
              }),
              range: vi.fn((from, to) => {
                return {
                  data: db[table].slice(from, to + 1),
                  count: db[table].length,
                  error: null,
                };
              }),
              data: db[table],
              error: null,
              single: vi.fn(() => {
                return {
                  data: db[table].length > 0 ? db[table][0] : null,
                  error:
                    db[table].length > 0
                      ? null
                      : { message: "No se encontró el registro" },
                };
              }),
            };
          }),

          // INSERT
          insert: vi.fn((data) => {
            const isArray = Array.isArray(data);
            const dataArray = isArray ? data : [data];

            const insertedData = dataArray.map((item) => {
              const newItem = {
                id: item.id || crypto.randomUUID(),
                ...item,
              };
              db[table].push(newItem);
              return newItem;
            });

            return {
              select: vi.fn(() => ({
                data: isArray ? insertedData : insertedData[0],
                error: null,
                single: vi.fn(() => ({
                  data: insertedData[0],
                  error: null,
                })),
              })),
            };
          }),

          // UPDATE
          update: vi.fn((data) => {
            return {
              eq: vi.fn((field, value) => {
                const index = db[table].findIndex(
                  (item) => item[field] === value
                );

                if (index !== -1) {
                  // Guardar el ID original
                  const originalId = db[table][index].id;

                  // Actualizar el objeto en la base de datos mock
                  db[table][index] = {
                    ...db[table][index],
                    ...data,
                    // Asegurar que el ID se mantenga
                    id: originalId,
                  };

                  return {
                    data: db[table][index],
                    error: null,
                    select: vi.fn(() => ({
                      data: db[table][index],
                      error: null,
                      single: vi.fn(() => ({
                        data: db[table][index],
                        error: null,
                      })),
                    })),
                  };
                }

                return {
                  data: null,
                  error: { message: "Registro no encontrado" },
                  select: vi.fn(() => ({
                    data: null,
                    error: { message: "Registro no encontrado" },
                    single: vi.fn(() => ({
                      data: null,
                      error: { message: "Registro no encontrado" },
                    })),
                  })),
                };
              }),
            };
          }),

          // UPSERT
          upsert: vi.fn((data) => {
            const isArray = Array.isArray(data);
            const dataArray = isArray ? data : [data];

            const upsertedData = dataArray.map((item) => {
              if (item.id) {
                const index = db[table].findIndex(
                  (record) => record.id === item.id
                );
                if (index !== -1) {
                  db[table][index] = { ...db[table][index], ...item };
                  return db[table][index];
                }
              }

              const newItem = {
                id: item.id || crypto.randomUUID(),
                ...item,
              };
              db[table].push(newItem);
              return newItem;
            });

            return {
              select: vi.fn(() => ({
                data: isArray ? upsertedData : upsertedData[0],
                error: null,
              })),
            };
          }),

          // DELETE
          delete: vi.fn(() => {
            return {
              eq: vi.fn((field, value) => {
                // Buscar el índice del elemento a eliminar
                const index = db[table].findIndex(
                  (item) => item[field] === value
                );

                if (index !== -1) {
                  // Eliminar el elemento de la base de datos mock
                  const removed = db[table].splice(index, 1);

                  // Devolver un resultado exitoso
                  return {
                    data: { id: removed[0].id },
                    error: null,
                  };
                }

                return {
                  data: null,
                  error: { message: "Registro no encontrado" },
                };
              }),
              in: vi.fn((field, values) => {
                const initialLength = db[table].length;
                db[table] = db[table].filter(
                  (item) => !values.includes(item[field])
                );
                const removed = initialLength - db[table].length;

                return {
                  data: { count: removed },
                  error: null,
                };
              }),
            };
          }),
        };
      }),

      // AUTH
      auth: {
        signInWithPassword: vi.fn(async ({ email, password }) => {
          const user = db.users.find(
            (u) => u.email === email && u.password === password
          );

          if (user) {
            return {
              data: {
                user: { id: user.id, email: user.email, role: user.role },
                session: { user: { id: user.id, email: user.email } },
              },
              error: null,
            };
          } else {
            return {
              data: { user: null, session: null },
              error: { message: "Credenciales inválidas" },
            };
          }
        }),

        signOut: vi.fn(async () => {
          return { error: null };
        }),

        onAuthStateChange: vi.fn((callback) => {
          // Simula la llamada inicial con estado no autenticado
          callback("SIGNED_OUT", null);

          // Devolver función para cancelar la suscripción
          return { data: { subscription: { unsubscribe: vi.fn() } } };
        }),

        getSession: vi.fn(async () => {
          // Devuelve null por defecto, simula que no hay sesión activa
          return { data: { session: null }, error: null };
        }),
      },

      // STORAGE
      storage: {
        from: vi.fn((bucket) => {
          return {
            upload: vi.fn((path, file) => {
              return {
                data: { path: `${bucket}/${path}` },
                error: null,
              };
            }),
            getPublicUrl: vi.fn((path) => {
              return {
                data: {
                  publicUrl: `https://mock-storage.com/${bucket}/${path}`,
                },
                error: null,
              };
            }),
            remove: vi.fn((paths) => {
              return {
                data: { count: Array.isArray(paths) ? paths.length : 1 },
                error: null,
              };
            }),
          };
        }),
      },
    },
  };
}

// Mock predeterminado para importar directamente
const defaultMock = createSupabaseMock();
export const { supabase } = defaultMock;
