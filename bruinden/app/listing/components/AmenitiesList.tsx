import React from 'react';

interface AmenitiesListProps {
    items: string[];
}

const AmenitiesList: React.FC<AmenitiesListProps> = ({ items }) => {
    const columnSize = Math.ceil(items.length / 4);
    const columns = Array.from({ length: 4 }, (_, i) =>
        items.slice(i * columnSize, (i + 1) * columnSize)
    );
    return (
        <div className="grid grid-cols-4 gap-4 justify-center">
            {columns.map((column, columnIndex) => (
                <ul className="list-disc pl-4" key={`column-${columnIndex}`}>
                    {column.map((item, index) => (
                        <li key={`item[${columnIndex}][${index}]`}>{item}</li>
                    ))}
                </ul>
            ))}
        </div>
    );
};

export default AmenitiesList;