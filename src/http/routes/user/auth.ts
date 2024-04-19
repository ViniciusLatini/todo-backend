import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";

export async function auth(app: FastifyInstance) {
  app.post("/user/auth", async (req, res) => {
    try {
      const authBody = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      });

      const { email, password } = authBody.parse(req.body);

      const user = await prisma.user.findFirst({
        where: {
          email,
          password,
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });

      return res.status(200).send(user);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  });
}
