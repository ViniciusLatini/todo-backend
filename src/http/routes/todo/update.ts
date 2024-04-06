import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function updateTodo(app: FastifyInstance) {
  app.put("/todo/:id", async (req, res) => {
    try {
      const { id } = req.params as { id: string };
      const updateTodoBody = z.object({
        title: z.string(),
        completed: z.boolean(),
      });

      const { title, completed } = updateTodoBody.parse(req.body);

      const todo = await prisma.todo.update({
        where: { id },
        data: { title, completed },
      });

      return res.status(200).send(todo);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  });
}
