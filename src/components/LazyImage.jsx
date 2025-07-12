import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import notImage from "../assets/notImage2.jpg";
import 'react-lazy-load-image-component/src/effects/blur.css';
const LazyImage = ({ src, alt, className }) => {

  const handleImageError = (e) => {
    e.target.onerror = null; // Prevents infinite onError loop
    e.target.src = notImage;

  };

  return (
    <LazyLoadImage
      src={src || notImage}
      alt={alt || "Image not available"}
      effect="blur" 
      className={className}
      onError={handleImageError}
    />
  );
};

export default LazyImage;
