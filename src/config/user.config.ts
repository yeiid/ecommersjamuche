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
 * Obtener todos los usuarios
 */
export function getUsers(): User[] {
  try {
    const filePath = path.resolve(process.cwd(), "data/users.json");
    if (!fs.existsSync(filePath)) return [];
    const fileContent = fs.readFileSync(filePath, "utf-8");
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
    const filePath = path.resolve(process.cwd(), "data/users.json");
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error guardando users.json:", error);
    return false;
  }
}
