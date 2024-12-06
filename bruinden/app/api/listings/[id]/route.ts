import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const client = await clientPromise;
    const db = client.db("test");
    
    // creation timestamp for reference (won't be displayed, but shows up in our database)
    const listingData = {
      ...data,
      createdAt: new Date(),
    };

    const result = await db.collection("Listing").insertOne(listingData);
    
    return NextResponse.json({
      success: true,
      _id: result.insertedId.toString()
    });

  } catch (error) {
    console.error('Failed to create listing:', error);
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
}