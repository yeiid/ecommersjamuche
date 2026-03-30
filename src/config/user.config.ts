import fs from "node:fs";
import path from "node:path";

/**
 * Interface simple para gestión de usuarios
 */
export interface User {
  id: string;
  username: string;
  password: string; // En producción debería estar hasheada
  name: string;
  role: "super" | "admin";
}

/**
 * Asegurar que la carpeta 'data/' exista y el archivo users.json esté inicializado
 */
function ensureDataDir() {
  const dirPath = path.resolve(process.cwd(), "data");
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Obtener todos los usuarios
 */
export function getUsers(): User[] {
  try {
    ensureDataDir();
    const filePath = path.resolve(process.cwd(), "data/users.json");
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf-8");
      return [];
    }
    const fileContent = fs.readFileSync(filePath, "utf-8");
    if (!fileContent.trim()) {
       fs.writeFileSync(filePath, "[]", "utf-8");
       return [];
    }
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error leyendo users.json:", error);
    return [];
  }
}

/**
 * Guardar la base de datos de usuarios
 */
export function saveUsers(users: User[]): boolean {
  try {
    ensureDataDir();
    const filePath = path.resolve(process.cwd(), "data/users.json");
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error guardando users.json:", error);
    return false;
  }
}
