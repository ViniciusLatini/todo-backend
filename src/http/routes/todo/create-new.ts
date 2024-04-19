import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function createTodo(app: FastifyInstance) {
  app.post("/todo/:userId", async (req, res) => {
    try {
      const { userId } = req.params as { userId: string };
      const createTodoBody = z.object({
        title: z.string(),
      });

      const { title } = createTodoBody.parse(req.body);

      const todo = await prisma.todo.create({
        data: {
          title,
          user: {
            connect: { id: userId },
          },
          completed: false,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return res.status(201).send(todo);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  });
}
