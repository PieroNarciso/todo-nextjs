import { procedure, router } from "../trpc";
import { db } from "@/db";
import { Todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const appRouter = router({
  getTodos: procedure.query(async () => {
    const todos = await db.select().from(Todos);
    return todos;
  }),

  createTodo: procedure
    .input(z.object({ description: z.string() }))
    .mutation(async ({ input }) => {
      const [todo] = await db
        .insert(Todos)
        .values({ description: input.description, completed: false })
        .returning();
      return todo;
    }),

  changeCompleted: procedure
    .input(z.object({ id: z.number(), completed: z.boolean() }))
    .mutation(async ({ input }) => {
      await db
        .update(Todos)
        .set({ completed: input.completed })
        .where(eq(Todos.id, input.id));
      return true;
    }),

  deleteTodo: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(Todos).where(eq(Todos.id, input.id));
      return true;
    }),
});

export type AppRouter = typeof appRouter;
