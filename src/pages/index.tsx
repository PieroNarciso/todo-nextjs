import { Todo } from "@/db/schema";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");

  const todoQuery = trpc.getTodos.useQuery();
  const todoCreate = trpc.createTodo.useMutation({
    onSuccess: () => {
      todoQuery.refetch();
    },
  });
  const todoUpdate = trpc.changeCompleted.useMutation({
    onSuccess: () => {
      todoQuery.refetch();
    },
  });
  const todoDelete = trpc.deleteTodo.useMutation({
    onSuccess: () => {
      todoQuery.refetch();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await todoCreate.mutateAsync({ description: value });
    setValue("");
  };

  const toggleCompleted = async (id: Todo["id"], newState: boolean) => {
    await todoUpdate.mutateAsync({ id, completed: newState });
  };

  const handleDelete = async (id: Todo["id"]) => {
    await todoDelete.mutateAsync({ id });
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          className="border-2 border-gray-500 rounded"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>

      {!todoQuery.data ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todoQuery.data.map((todo) => (
            <li key={todo.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleted(todo.id, !todo.completed)}
              />
              <span className={todo.completed ? "line-through" : ""}>
                {todo.description}
              </span>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
