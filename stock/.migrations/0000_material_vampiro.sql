CREATE TABLE "stocks" (
	"id" text PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
