import fastify from "fastify";

import { createUser } from "./routes/create-user";
import { getUser } from "./routes/get-user";

const app = fastify({ logger: true });

app.register(createUser);
app.register(getUser)

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
