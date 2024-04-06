import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function deleteUser(app: FastifyInstance) {
  app.delete('/user/:id', async (req, res) => {
    try {
      const { id } = req.params as { id: string };

      await prisma.user.delete({
        where: { id }
      });

      return res.status(204).send();
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: "Internal server error" });
    }
  })
}