import { z } from "zod";
import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const Todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  completed: boolean("completed").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const InsertTodoSchema = createInsertSchema(Todos);
export const SelectTodoSchema = createSelectSchema(Todos);

export type Todo = z.infer<typeof SelectTodoSchema>;
