import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";
export async function getAllTodos(app: FastifyInstance) {
  app.get("/todos", async (req, res) => {
    const { completed, user, date } = req.query as {
      completed: string;
      user: string;
      date: "asc" | "desc";
    };
    const status = completed !== "" && completed === "true" ? true : false;
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
        where: {
          completed: completed ? status : undefined,
          userId: user || undefined,
        },
        orderBy: {
          created_at: date || undefined,
        },
      });
      res.status(200).send(todos);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  });
}
