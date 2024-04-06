import fastify from "fastify";

import { createUser } from "./routes/user/create-new";
import { getUserById } from "./routes/user/get-by-id";

const app = fastify({ logger: true });

app.register(createUser);
app.register(getUserById);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
