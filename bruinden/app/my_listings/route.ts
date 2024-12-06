import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { userId } = req.query;
    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ message: 'Invalid userID' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                listings: true  // Include the listings relation
            }
        });

        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        res.status(200).json(user.listings);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to fetch user listings" });
    }
}