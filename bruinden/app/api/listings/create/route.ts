import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// It's good practice to validate environment variables
if (!process.env.CLOUDINARY_CLOUD_NAME || 
    !process.env.CLOUDINARY_API_KEY || 
    !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Missing Cloudinary environment variables');
}

async function uploadToCloudinary(file: File) {
  try {
      // Prepare the request to Cloudinary
      const formData = new FormData();
      formData.append('file', file); // Directly append the file
      formData.append('upload_preset', 'bruinden_listings');

      const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
              method: 'POST',
              body: formData,
          }
      );

      if (!response.ok) {
          const errorData = await response.json();
          console.error('Cloudinary upload error:', errorData);
          throw new Error(`Failed to upload to Cloudinary: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.secure_url;
  } catch (error) {
      console.error('Error in uploadToCloudinary:', error);
      throw error;
  }
}


export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const formDataObj: { [key: string]: any } = {};
        const images = formData.getAll('images') as File[];
        
        // Process other form fields
        for (const [key, value] of formData.entries()) {
            if (key !== 'images') {
                formDataObj[key] = value;
            }
        }

        // Upload images to Cloudinary
        let imageUrls: string[] = [];
        if (images.length > 0) {
            try {
                imageUrls = await Promise.all(
                    images.map(file => uploadToCloudinary(file))
                );
                console.log('Images uploaded successfully:', imageUrls);
            } catch (error) {
                console.error('Error uploading images:', error);
                throw new Error('Failed to upload images to Cloudinary');
            }
        }

        // Validate required fields
        const requiredFields = ['address', 'price', 'bedrooms', 'bathrooms'];
        for (const field of requiredFields) {
            if (!formDataObj[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db("test");
        const collection = db.collection("Listing");

        // Geocoding
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(formDataObj.address)}&key=${apiKey}`;
        
        const geocodeResponse = await fetch(geocodeUrl);
        const geocodeData = await geocodeResponse.json();

        if (geocodeData.status !== "OK") {
            throw new Error(`Geocoding failed: ${geocodeData.error_message || geocodeData.status}`);
        }

        const location = {
            lat: geocodeData.results[0].geometry.location.lat,
            lng: geocodeData.results[0].geometry.location.lng,
        };

        // Prepare listing data
        const listingData = {
            title: "Apartment Listing",
            address: formDataObj.address,
            price: Number(formDataObj.price),
            bathrooms: Number(formDataObj.bathrooms),
            bedrooms: Number(formDataObj.bedrooms),
            imageUrl: "/api/placeholder/ucla.jpg",
            location: location,
            squareFeet: Number(formDataObj.squareFeet),
            amenities: formDataObj.amenities,
            description: formDataObj.description,
            createdAt: new Date()
        };

        // Insert into MongoDB
        const result = await collection.insertOne(listingData);
        console.log('Listing created successfully:', result.insertedId);

        return NextResponse.json({
            success: true,
            _id: result.insertedId.toString(),
            imageUrls
        });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { 
                error: 'Failed to create listing',
                details: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}
