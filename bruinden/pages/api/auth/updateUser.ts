import { NextApiRequest, NextApiResponse } from "next";
import { updateUser } from "./queryFunction"; // Import the update function from queryFunction

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query;

  try {
    if (method === "PUT") {
      if (!id) {
        return res.status(400).json({ message: "ID parameter is required" });
      }

      const { name, collegeYear, gender } = req.body; // Get possible fields to update from request body

      const updatedUser = await updateUser(
        id as string,
        name,
        collegeYear,
        gender
      );

      return res.status(200).json({ user: updatedUser });
    } else {
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "server error" });
  }
}
