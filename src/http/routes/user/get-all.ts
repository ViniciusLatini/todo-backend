import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function getAllUsers(app: FastifyInstance) {
  app.get("/users", async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      return res.status(200).send(users);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  });
}
