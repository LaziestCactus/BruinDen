import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

// Define the Listing interface
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

// API Route to get favorited listings
export async function GET(request: Request) {
  const userId = new URL(request.url).searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db('test');

    console.log('Connected to MongoDB');

    // Log collections
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    const decodedUserId = decodeURIComponent(userId);

    // Fetch favorites for the user
    // return NextResponse.json(decodedUserId);
    const favoritesCollection = db.collection('Favorite');
    const favoriteListings = await favoritesCollection
      .find({ userId: new ObjectId(decodedUserId) })
      .toArray();

    console.log('Favorite Listings IDs:', favoriteListings);
    // Extract listing IDs from the favorite documents
    const listingIds = favoriteListings.map(favorite => favorite.listingId);
    // return NextResponse.json(listingIds);

    if (listingIds.length === 0) {
      return NextResponse.json([]);
    }

    // Fetch details of the favorited listings
    const listingsCollection = db.collection('Listing');
    const listings = await listingsCollection
      .find({ _id: { $in: listingIds.map(id => new ObjectId(id)) } })
      .toArray();

    console.log('Fetched Listings:', listings);

    // Format the listings to return clean data
    const formattedListings = listings.map(listing => ({
      ...listing,
      _id: listing._id.toString(),
    }));

    return NextResponse.json(formattedListings);

  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch favorited listings' },
      { status: 500 }
    );
  }
}