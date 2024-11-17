import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db("test"); å

    const listings = await db.collection("listings")
      .find({})
      .toArray();

    res.status(200).json(listings);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
}