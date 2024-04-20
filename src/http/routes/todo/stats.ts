import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function getTodoStatus(app: FastifyInstance) {
  app.get("/todo/stats", async (req, res) => {
    try {
      const { userId } = req.query as { userId: string };
      const stats = await prisma.todo.groupBy({
        by: ["completed"],
        _count: {
          _all: true,
        },
        where: {
          userId: userId ?? undefined,
        },
        orderBy: {
          completed: "asc",
        },
      });
      const info = stats.map((stat) => {
        return {
          id: stat.completed ? "Finalizados" : "Pendentes",
          completed: stat.completed,
          count: stat._count._all,
        };
      });

      return res.status(200).send(info);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  });
}
