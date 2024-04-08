import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function getUserTodos(app: FastifyInstance) {
  app.get("/todo/:userId", async (req, res) => {
    try {
      const { userId } = req.params as { userId: string };
      const userTodos = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        include: {
          todos: true,
        },
      });

      return res.status(200).send(userTodos);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  });
}
