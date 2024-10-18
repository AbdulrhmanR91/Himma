// Importing the React library
import React from "react";

// EmptyNotes component to display when there are no notes, taking imgSrc (image source) and message as props
const EmptyNotes = ({ imgSrc, message }) => {
  return (
    // Main container that centers the content both vertically and horizontally
    <div className="flex flex-col items-center justify-center mt-20">
      
      {/* Display the image to indicate empty state */}
      <img 
        src={imgSrc} // Source of the image (passed as a prop)
        alt="empty-notes" // Alternative text for accessibility
        className="w-60 h-60 object-contain mb-8" // Image styling: width, height, object-fit, and margin
      />
      
      {/* Display the message passed as a prop, with styling to center the text */}
      <p className="max-w-md text-center text-gray-600 leading-relaxed">
        {message} {/* The message to be displayed when no notes are available */}
      </p>
    </div>
  );
};

export default EmptyNotes;
