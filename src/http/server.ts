import fastify from "fastify";

import { createUser } from "./routes/user/create-new";
import { getUserById } from "./routes/user/get-by-id";
import { deleteUser } from "./routes/user/delete";
import { getAllUsers } from "./routes/user/get-all";
import { updateUser } from "./routes/user/update";
import { createTodo } from "./routes/todo/create-new";
import { deleteTodo } from "./routes/todo/delete";
import { updateTodo } from "./routes/todo/update";
import { getUserTodos } from "./routes/todo/get-user-todo";
import { auth } from "./routes/user/auth";
import { getAllTodos } from "./routes/todo/get-all";
import { getTodoStatus } from "./routes/todo/stats";

const app = fastify({ logger: true });

app.register(createUser);
app.register(getUserById);
app.register(getAllUsers);
app.register(deleteUser);
app.register(updateUser);

app.register(createTodo);
app.register(deleteTodo);
app.register(updateTodo);
app.register(getUserTodos);
app.register(getAllTodos);
app.register(getTodoStatus)

app.register(auth);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
