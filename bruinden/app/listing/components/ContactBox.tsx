import React from 'react';

interface ContactBoxProps {
    name: string,
    picture: string,
    email: string,
    phone: string,
}

const ContactBox: React.FC<ContactBoxProps> = ({name, phone, email, picture}) => {
    return (
        <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md sticky top-40 text-center">
            <h2 className="text-2xl font-bold mb-4">Contact The Owner</h2>
            <img
                src={picture}
                alt={name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-300"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
            
            <p className="text-gray-700 mb-2">{email}</p>
            
            <p className="text-gray-700 mb-4">{phone}</p>
            <button
                className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600"
            >
                CONTACT
            </button>
        </div>
    );
};

export default ContactBox;