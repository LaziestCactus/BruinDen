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
    
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

    const upperCollection = db.collection('Listing');

    const upperCount = await upperCollection.countDocuments();
    
    console.log('Documents in Listing collection:', upperCount);

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