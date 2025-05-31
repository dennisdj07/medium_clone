import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupValidate, singinValidate } from "@dennisjsh07/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWt_SECRET: string;
  };
}>();

// todo : add hashing and zod validation...
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signupValidate.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "invalid inputs" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWt_SECRET);
    return c.json({
      jwt: token,
    });
  } catch (err) {
    c.status(411);
    return c.json({ err: "email already exists" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = singinValidate.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "invalid inputs",
    });
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "invalid credentials" });
    }

    const token = await sign({ id: user.id }, c.env.JWt_SECRET);
    return c.json({ jwt: token });
  } catch (err) {
    c.status(411);
    return c.json({ err: err });
  }
});
