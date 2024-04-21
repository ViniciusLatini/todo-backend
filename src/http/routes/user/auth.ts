import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";

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
        },
      });

      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      const matchPassword = await bcrypt.compare(password, user.password);
      if (matchPassword) return res.status(200).send({
        id: user.id,
        email: user.email,
        name: user.name,
      });
      else return res.status(401).send({ error: "Invalid email or password" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  });
}
