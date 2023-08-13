CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"completed" boolean NOT NULL
);
