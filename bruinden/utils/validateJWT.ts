import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export function validateJWT(handler: (req: NextApiRequest, res: NextApiResponse, userId: string) => void) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
      const userId = decoded.userId;
      handler(req, res, userId);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token", error });
    }
  };
}