import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prisma/libs/prismadb"; // Assuming prisma client is set up properly

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, listingId } = req.body; // Assuming body contains these two fields

    // Check if both userId and listingId are provided
    if (!userId || !listingId) {
      return res.status(400).json({ error: "Missing required fields: userId or listingId", userId, listingId });
    }

    try {
      // Check if the listing is already in the user's favorites
      const existingFavorite = await prisma.favorite.findFirst({
        where: {
          userId,
          listingId,
        },
      });

      if (existingFavorite) {
        await prisma.favorite.delete({
          where: {
            id: existingFavorite.id,
          },
        });
        return res.status(200).json({ message: "Listing removed from favorites" });
      } else {
        const favorite = await prisma.favorite.create({
          data: {
            userId,
            listingId,
          },
        });

        return res.status(201).json(favorite);
      }
    } catch (error) {
      console.error("Error adding/removing favorite:", error);
      res.status(500).json({ error: "Failed to add or remove favorite" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
