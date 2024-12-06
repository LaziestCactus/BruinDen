import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prisma/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Fetch all posts along with their comments from the database
      const posts = await prisma.post.findMany({
        include: {
          comments: true,
        },
      });

      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
