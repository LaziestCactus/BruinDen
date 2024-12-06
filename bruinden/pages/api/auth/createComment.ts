// pages/api/comments/add.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prisma/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { text, postId, userId } = req.body;

    try {
      const comment = await prisma.comment.create({
        data: {
          text,
          userId,
          postId,
        },
      });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: "Failed to add comment" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
