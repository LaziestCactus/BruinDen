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

export async function GET() {
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
    
    let listings = await collection.find({}).toArray();
    console.log('Listings from Listing collection:', listings);

    // If no listings exist, insert sample data
    if (listings.length === 0) {
      const sampleListings = [
        {
          title: 'Modern Apartment near UCLA',
          address: '123 Westwood Blvd',
          price: 2500,
          imageUrl: '/api/placeholder/800/600',
          location: {
            lat: 34.0689,
            lng: -118.4452
          },
          squareFeet: 800,
          bedrooms: 2,
          bathrooms: 1
        },
        {
          title: 'Budget Friendly Studio',
          address: '432 Midvale Ave',
          price: 1500,
          imageUrl: '/api/placeholder/800/600',
          location: {
            lat: 34.0670,
            lng: -118.4530
          },
          squareFeet: 400,
          bedrooms: 0,
          bathrooms: 1
        }
      ];

      await collection.insertMany(sampleListings);
      console.log('Inserted sample listings:', sampleListings);
      listings = await collection.find().toArray();
    }

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