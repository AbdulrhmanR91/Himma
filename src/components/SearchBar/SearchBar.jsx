import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdLabel } from "react-icons/md";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch, onTagSearch }) => {
  const [isTagSearch, setIsTagSearch] = useState(false);

  const toggleSearchMode = () => {
    setIsTagSearch(!isTagSearch);
    onClearSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (isTagSearch) {
        onTagSearch(e.target.value);
      } else {
        handleSearch();
      }
    }
  };

  return (
    <div className="flex items-center px-4 bg-slate-100 rounded-md">
      <div className="flex-1 flex items-center">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyPress}
          placeholder={isTagSearch ? "Search by tags (comma separated)" : "Search Notes"}
          className="w-full text-xs bg-transparent py-[11px] outline-none"
        />
        {value && (
          <IoMdClose
            className="cursor-pointer text-slate-600 ml-4 hover:text-black"
            onClick={onClearSearch}
          />
        )}
      </div>
      
      <button
        className={`p-2 mr-2 rounded-full transition-colors ${
          isTagSearch ? 'bg-teal-500 text-white' : 'text-slate-600 hover:text-black'
        }`}
        onClick={toggleSearchMode}
        title={isTagSearch ? "Switch to text search" : "Switch to tag search"}
      >
        <MdLabel />
      </button>
      
      <FaMagnifyingGlass
        className="cursor-pointer text-slate-600 hover:text-black"
        onClick={() => isTagSearch ? onTagSearch(value) : handleSearch()}
      />
    </div>
  );
};

export default SearchBar;