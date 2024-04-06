import { prisma } from "../../../lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function createUser(app: FastifyInstance) {
  app.post("/user", async (req, res) => {
    const createUserBody = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = createUserBody.parse(req.body);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return res.status(201).send({ userId: user.id });
  });
}
