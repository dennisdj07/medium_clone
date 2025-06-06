import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlog, updateBlog } from "@dennisjsh07/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWt_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  try {
    const authHeader = c.req.header("Authorization") || "";
    console.log(authHeader);
    const token = await verify(authHeader.split(" ")[1], c.env.JWt_SECRET);
    if (token) {
      c.set("userId", String(token.id));
      await next();
    } else {
      c.status(403);
      return c.json({ message: "unauthorized" });
    }
  } catch (err) {
    c.status(403);
    return c.json({ err: err });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const authorId = c.get("userId");

  const { success } = createBlog.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "invalid inputs" });
  }

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });

  return c.json({ id: blog.id });
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = updateBlog.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "invalid inputs" });
  }

  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({
    id: blog.id,
  });
});

// todo : add pagination to get the first 10 blogs.
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select: {
      title: true,
      content: true,
      id: true,
      published: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({
    blogs: blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = await c.req.param("id");

  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: id,
      },
      select: {
        title: true,
        content: true,
        id: true,
        published: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json(blog);
  } catch (err) {
    c.status(411);
    return c.json({ err: err });
  }
});
