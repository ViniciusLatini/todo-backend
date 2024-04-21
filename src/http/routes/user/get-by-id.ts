import { prisma } from "../../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function getUserById(app: FastifyInstance) {
  app.get("/user/:id", async (req, res) => {
    try {
      const { id } = req.params as { id: string };
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          updated_at: true,
        },
      });

      if (!user) return res.status(404).send({ error: "User not found" });

      return res.status(200).send(user);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  });
}
