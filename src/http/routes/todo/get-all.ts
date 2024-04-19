import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";
export async function getAllTodos(app: FastifyInstance) {
  app.get("/todos", async (req, res) => {
    try {
      const todos = await prisma.todo.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      res.status(200).send(todos);
    } catch (error) {
      return res.status(500).send({ error: "Internal server error" });
    }
  });
}
