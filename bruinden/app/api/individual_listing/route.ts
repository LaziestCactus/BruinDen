// import { NextApiRequest, NextApiResponse } from 'next';
// import  clientPromise from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== 'GET') {
//         return res.status(405).json({ message: 'Method not allowed' });
//     }

//     const { id } = req.query;
//     if (!id || typeof id !== 'string') {
//         return res.status(400).json({ message: 'Invalid ID' });
//     }

//     try {
//         const client = await clientPromise;
//         const db = client.db("test"); // change when deployed
//         const listing = await db.collection("listings").findOne({
//             __id: new ObjectId(id),
//         });

//         if (!listing) {
//             return res.status(404).json({ message: "Listing not found" });
//         }

//         res.status(200).json(listing);
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({ error: "Failed to fetch listing" });
//     }
// }


// app/api/listings/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb'
import { ObjectId } from 'mongodb';

interface Listing {
  _id: string;
  title: string;
  address: string;
  price: number;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
  };
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
}

export async function GET(request: Request) {
    const listingId = new URL(request.url).searchParams.get('listingId');
  if (!listingId) {
    return NextResponse.json(
        { error: 'Listing ID is required' },
        { status: 400 }
    );
  }
  
  try {
    const client = await clientPromise;
    console.log('Connected to MongoDB');

    const db = client.db("test");
    
    // Log all collections
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

    // Let's check both collections
    const upperCollection = db.collection('Listing');

    const upperCount = await upperCollection.countDocuments();
    
    console.log('Documents in Listing collection:', upperCount);

    // Use the correct collection (probably 'Listing' since that's what you see in MongoDB)
    const collection = db.collection('Listing');
    
    let listings = await collection.find({ "_id": new ObjectId(listingId) }).toArray();
    console.log('Listings from Listing collection:', listings);

    const formattedListings = listings.map(listing => ({
      ...listing,
      _id: listing._id.toString()
    }));
    return NextResponse.json(formattedListings);
    
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}