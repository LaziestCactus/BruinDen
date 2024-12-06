'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

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

export default function ListingPage() {
    const params = useParams();
    const id = params?.id as string;
    const [listing, setListing] = useState<Listing | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListing = async () => {
            if (!id) return;
            
            try {
                const response = await fetch(`/api/listings/${id}`);
                const data = await response.json();
                setListing(data);
            } catch (error) {
                console.error('Failed to fetch listing:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!listing) return <div>Listing not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
            <p className="text-xl mb-4">{listing.address}</p>
            <div className="mb-6">
                <img src={listing.imageUrl} alt={listing.title} className="w-full rounded-lg" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                    <span className="font-bold">${listing.price}</span> /month
                </div>
                <div>{listing.bedrooms} bedrooms</div>
                <div>{listing.bathrooms} bathrooms</div>
            </div>
            <div className="mb-4">
                <p className="font-bold">Square Footage</p>
                <p>{listing.squareFeet} sq ft</p>
            </div>
        </div>
    );
}