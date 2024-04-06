import fastify from "fastify";

import { createUser } from "./routes/user/create-new";
import { getUserById } from "./routes/user/get-by-id";
import { deleteUser } from "./routes/user/delete";
import { getAllUsers } from "./routes/user/get-all";
import { updateUser } from "./routes/user/update";

const app = fastify({ logger: true });

app.register(createUser);
app.register(getUserById);
app.register(getAllUsers);
app.register(deleteUser);
app.register(updateUser);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
