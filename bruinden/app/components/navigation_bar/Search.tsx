'use client';
import { useState, useEffect, useRef } from 'react';
import { BiSearch } from 'react-icons/bi';

interface Listing {
  _id: string;
  address: string;
}

const Search = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Listing[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchQuery.trim() === '') {
                setSuggestions([]);
                return;
            }

            try {
                const response = await fetch('/api/listings');
                const listings = await response.json();
                const filtered = listings.filter((listing: Listing) => 
                    listing.address.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setSuggestions(filtered);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        };

        fetchSuggestions();
    }, [searchQuery]);

    return (
        <div ref={searchRef} className="relative w-full md:w-auto">
            <div className="py-2 px-8 rounded-full hover:shadow-lg transition-shadow cursor-pointer bg-white">
                <div className="flex flex-row items-center space-x-3">
                    <BiSearch size={30} color="#2F4858" />
                    <input 
                        type="text" 
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setIsOpen(true);
                        }}
                        onClick={() => setIsOpen(true)}
                        className="flex-1 outline-none text-lg placeholder-gray-500"
                        style={{ color: '#2F4858', fontSize: '30px' }}
                    />
                </div>
            </div>

            {/* Suggestions dropdown positioning fixed */}
            {isOpen && suggestions.length > 0 && (
                <div 
                    className="absolute right-0 mt-2 w-full bg-white rounded-lg shadow-lg max-h-[400px] overflow-y-auto"
                    style={{
                        zIndex: 99999,
                    }}
                >
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion._id}
                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-[#2F4858] text-lg"
                            onClick={() => {
                                setSearchQuery(suggestion.address);
                                setIsOpen(false);
                                window.location.href = `#listing-${suggestion._id}`;
                            }}
                        >
                            {suggestion.address}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;