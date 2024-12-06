import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json([]);
    }

    const client = await clientPromise;
    const db = client.db("test");

    const listings = await db.collection("Listing").find({
      $or: [
        { address: { $regex: query, $options: 'i' } },
        { title: { $regex: query, $options: 'i' } }
      ]
    })
    .limit(10)
    .toArray();

    return NextResponse.json(listings);

  } catch (error: any) {
    console.error('Search failed:', error);
    return NextResponse.json(
      { error: 'Failed to search listings' },
      { status: 500 }
    );
  }
}