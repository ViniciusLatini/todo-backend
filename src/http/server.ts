import fastify from "fastify";

import { createUser } from "./routes/user/create-new";
import { getUserById } from "./routes/user/get-by-id";
import { deleteUser } from "./routes/user/delete"
const app = fastify({ logger: true });

app.register(createUser);
app.register(getUserById);
app.register(deleteUser)

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
