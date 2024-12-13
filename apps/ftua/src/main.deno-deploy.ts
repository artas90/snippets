import application from "./application.tsx";

const port = Deno.env.get("PORT");
Deno.serve({ port }, application);
