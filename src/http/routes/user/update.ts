import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function updateUser(app: FastifyInstance) {
  app.put("/user/:id", async (req, res) => {
    try {
      const { id } = req.params as { id: string };
      const { name, email, password } = req.body as {
        name: string;
        email: string;
        password: string;
      };

      await prisma.user.update({
        where: { id },
        data: { name, email, password },
      });

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  });
}
