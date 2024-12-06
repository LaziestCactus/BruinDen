'use client';
import { BiSearch } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Location {
    lat: number;
    lng: number;
}

interface Listing {
    _id: string;
    title: string;
    address: string;
    price: number;
    imageUrl: string;
    location: Location;
    squareFeet: number;
    bedrooms: number;
    bathrooms: number;
    distanceToUCLA?: number;
}

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [listings, setListings] = useState<Listing[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const router = useRouter();

    // Fetch listings when search query changes
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!searchQuery.trim()) {
                setListings([]);
                return;
            }
    
            try {
                setIsLoading(true);
                console.log('Searching for:', searchQuery); // Debug log
    
                const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
                console.log('Response status:', response.status); 
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const text = await response.text(); // Get raw response
                console.log('Raw response:', text); // Debug log
                
                try {
                    const data = JSON.parse(text); // Parse the text
                    console.log('Parsed data:', data); 
                    setListings(data);
                } catch (parseError) {
                    console.error('JSON parse error:', parseError);
                    console.error('Failed to parse:', text);
                }
    
            } catch (error) {
                console.error('Search failed:', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        const debounceTimer = setTimeout(fetchSearchResults, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    const handleListingClick = (listing: Listing) => {
        setSearchQuery(listing.address);
        setShowResults(false);
        // Navigate to listing detail page
        router.push(`/listing/${listing._id}`);
    };

    return (
        <div className="relative">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="w-full md:w-auto py-2 px-8 rounded-full hover:shadow-lg transition-shadow cursor-pointer bg-white">
                    <div className="flex flex-row items-center space-x-3">
                        <BiSearch size={30} color="#2F4858" />
                        <input
                            type="text"
                            placeholder="Search by address"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowResults(true);
                            }}
                            onFocus={() => setShowResults(true)}
                            className="flex-1 outline-none text-lg placeholder-gray-500"
                            style={{ color: '#2F4858', fontSize: '30px' }}
                        />
                    </div>
                </div>
            </form>

            {/* Autocomplete results dropdown */}
            {showResults && searchQuery && listings.length > 0 && (
                <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                    {listings.map((listing) => (
                        <div
                            key={listing._id}
                            onClick={() => handleListingClick(listing)}
                            className="p-4 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                        >
                            <div className="font-medium">{listing.address}</div>
                            <div className="text-sm text-gray-600">
                                {listing.bedrooms} bed · {listing.bathrooms} bath · ${listing.price}/month
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;