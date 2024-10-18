import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdLabel } from "react-icons/md";
import { TbLayoutKanban } from "react-icons/tb";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch, onTagSearch, onStatusSearch }) => {
  const [searchMode, setSearchMode] = useState('text'); // State to manage the current search mode

  // Function to toggle the search mode and clear the current search
  const toggleSearchMode = (mode) => {
    setSearchMode(mode);
    onClearSearch();
  };

  // Function to handle key press events, specifically the Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      switch(searchMode) {
        case 'tag':
          onTagSearch(value);
          break;
        case 'status':
          onStatusSearch(value);
          break;
        default:
          handleSearch();
      }
    }
  };

  // Function to get the placeholder text based on the current search mode
  const getPlaceholder = () => {
    switch(searchMode) {
      case 'tag':
        return "Search by tags";
      case 'status':
        return "Search by status";
      default:
        return "Search Notes";
    }
  };

  // Function to handle the search button click
  const handleSearchClick = () => {
    switch(searchMode) {
      case 'tag':
        onTagSearch(value);
        break;
      case 'status':
        onStatusSearch(value);
        break;
      default:
        handleSearch();
    }
  };

  return (
    <div className="flex items-center bg-slate-100 rounded-md">
      <div className="flex-1 flex items-center">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyPress}
          placeholder={getPlaceholder()}
          className="w-full text-xs bg-transparent py-2 px-3 outline-none"
        />
        {value && (
          <IoMdClose
            className="cursor-pointer text-slate-600 mr-2 hover:text-black"
            onClick={onClearSearch}
          />
        )}
      </div>
      
      <button
        className={`p-2 rounded-full transition-colors ${
          searchMode === 'tag' ? 'bg-teal-500 text-white' : 'text-slate-600 hover:text-black'
        }`}
        onClick={() => toggleSearchMode('tag')}
        title="Switch to tag search"
      >
        <MdLabel />
      </button>

      <button
        className={`p-2 rounded-full transition-colors ${
          searchMode === 'status' ? 'bg-teal-500 text-white' : 'text-slate-600 hover:text-black'
        }`}
        onClick={() => toggleSearchMode('status')}
        title="Switch to status search"
      >
        <TbLayoutKanban />
      </button>
      
      <button
        className="p-2 text-slate-600 hover:text-black"
        onClick={handleSearchClick}
      >
        <FaMagnifyingGlass />
      </button>
    </div>
  );
};

export default SearchBar;