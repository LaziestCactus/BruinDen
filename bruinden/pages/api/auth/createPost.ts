import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prisma/libs/prismadb"; //add bracket later?

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    try {
      console.log(title, content, userId, "LOOK HERE");
      const post = await prisma.post.create({
        data: {
          title,
          content,
          userId,
        },
      });
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
