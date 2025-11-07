import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import NavbarApp from './NavbarApp';
import Product1 from './Product1';
import FooterApp from './FooterApp';
import { Link } from 'react-router-dom';

export default function Products() {
  // only one open index stored here
  const [openIndex, setOpenIndex] = useState(null);

  const toggleCategory = (index) => {
    // use functional updater to be safe
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const categories = [
    { title: "Fashion", items: ["Men's Items", "Women's Items", "Kid's Items"] },
    { title: "Grocery", items: ["Masala & Spices", "Soft Drinks", "Detergent & Laundry"] },
    { title: "Electronics", items: ["Smart Phones", "Washing Machine", "Air Conditioner"] },
    { title: "Toys", items: ["Remote Control Toys", "Soft Toys", "Board Games"] },
    { title: "Home & Kitchen", items: ["Home Decor", "Tableware & Dinnerware", "Kitchen Storage"] },
  ];

  return (
    <>
      <NavbarApp />
      <Product1 />
      <FooterApp />
    </>
  );
}
