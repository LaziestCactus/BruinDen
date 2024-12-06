import { NextApiRequest, NextApiResponse } from "next";
import { getUserByEmail } from "./queryFunction"; // from the list of query functions

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { email } = req.query;

  try {
    if (method === "GET") {
      if (!email) {
        return res.status(400).json({ message: "Email parameter is required" });
      }

      const user = await getUserByEmail(email as string);
      //succesful cases
      if (user) {
        // If user exists, return user data
        return res.status(200).json({ user });
      } else {
        return res.status(200).json({ user: null });
      }
    } else {
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error("Error checking user:", error);
    return res.status(500).json({ message: "server error" });
  }
}
