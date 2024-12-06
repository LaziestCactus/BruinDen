import { NextApiRequest, NextApiResponse } from 'next';
import { validateJWT } from '../../../utils/validateJWT';  // Ensure correct path to validateJWT
import prisma from '../../../app/prisma/libs/prismadb';   // Correct path to Prisma client

async function handler(req: NextApiRequest, res: NextApiResponse, userId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }, 
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user); // Return the found user
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch user", error });
    }
}

export default validateJWT(handler);