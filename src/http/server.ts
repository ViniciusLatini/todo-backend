import fastify from "fastify";

import { createUser } from "./routes/create-user";

const app = fastify({ logger: true });

app.register(createUser);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
