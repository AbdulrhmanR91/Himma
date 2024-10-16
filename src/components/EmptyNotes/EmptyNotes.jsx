import React from "react";

const EmptyNotes = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img src={imgSrc} alt="empty-notes" className="w-60 h-60 object-contain mb-8" />
      <p className="max-w-md text-center text-gray-600 leading-relaxed">
        {message}
      </p>
    </div>
  );
};

export default EmptyNotes;