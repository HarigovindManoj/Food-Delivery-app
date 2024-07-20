import React from 'react';
import './Header.css';
import ImageSlider from '../../ImageSlider/ImageSlider';

const Header = () => {
  const slides = [
    { url: "/header_img.png" },
    { url: "https://cdn.pixabay.com/photo/2023/03/19/15/35/food-7862820_1280.jpg" },
    { url: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg" },
    { url: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

  return (
    <div className="headerStyle"> 
      <ImageSlider slides={slides} />
      <div className="header-contents">
        <h2>Please Order your favourite food here</h2>
        <p>Build Full Stack Food Ordering Website using React JS, MongoDB, Express, Node JS & Stripe. Full Stack Project for students 2024</p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;


