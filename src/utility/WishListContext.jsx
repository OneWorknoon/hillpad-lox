import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create Wishlist context
const WishlistContext = createContext();

// Custom hook to use the Wishlist context
export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Function to fetch the wishlist from the server
  const fetchWishlist = async (userEmail) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}wishlists/list?email=${userEmail}`);
      setWishlist(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  // Function to add course to wishlist
  const addCourseToWishlist = async (courseId, userEmail) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}wishlists/create`, {
        course: courseId,
        user: userEmail
      });
      if (response.status === 201) {
        setWishlist((prevWishlist) => [
          ...prevWishlist,
          { course: { id: courseId } }
        ]);
      }
    } catch (error) {
      console.error('Error adding course to wishlist:', error);
    }
  };

  // Function to remove course from wishlist
  const removeCourseFromWishlist = async (courseId, userEmail) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}wishlists/delete`, {
        data: { email: userEmail, course: courseId }
      });
      setWishlist((prevWishlist) => prevWishlist.filter(course => course.course.id !== courseId));
    } catch (error) {
      console.error('Error removing course from wishlist:', error);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addCourseToWishlist, removeCourseFromWishlist, fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
