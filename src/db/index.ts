import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
 
const sql = postgres('postgres://postgres:admin@localhost:5432')
export const db = drizzle(sql);
