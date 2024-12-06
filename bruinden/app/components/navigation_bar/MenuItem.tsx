'use client';
import React from "react";
import Link from "next/link";

interface MenuItemProporties{
    onClick:() => void;
    label: string;
    reference: string;
}
const MenuItem: React.FC<MenuItemProporties> = ({
    onClick, label, reference
}) => {
    return(
    /*processing the click for when you click on specific menu items*/
        <Link href = {reference} onClick = {onClick} className="px-4 py-3 hover:bg-neutral-100 transition">
            {label}
        </Link>
    );
}
export default MenuItem;