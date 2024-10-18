import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdLabel } from "react-icons/md";
import { TbLayoutKanban } from "react-icons/tb";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch, onTagSearch, onStatusSearch  }) => {
  const [searchMode, setSearchMode] = useState('text'); // 'text', 'tag', or 'status'

  const toggleSearchMode = (mode) => {
    setSearchMode(mode);
    onClearSearch();
  };


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


  const getPlaceholder = () => {
    switch(searchMode) {
      case 'tag':
        return "Search by tags (comma separated)";
      case 'status':
        return "Search by status (pending, in progress, completed)";
      default:
        return "Search Notes";
    }
  };

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
    <div className="flex items-center px-4 bg-slate-100 rounded-md">
      <div className="flex-1 flex items-center">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyPress}
          placeholder={getPlaceholder()}
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
          searchMode === 'tag' ? 'bg-teal-500 text-white' : 'text-slate-600 hover:text-black'
        }`}
        onClick={() => toggleSearchMode('tag')}
        title="Switch to tag search"
      >
        <MdLabel />
      </button>

      <button
        className={`p-2 mr-2 rounded-full transition-colors ${
          searchMode === 'status' ? 'bg-teal-500 text-white' : 'text-slate-600 hover:text-black'
        }`}
        onClick={() => toggleSearchMode('status')}
        title="Switch to status search"
      >
        <TbLayoutKanban />
      </button>
      
      <FaMagnifyingGlass
        className="cursor-pointer text-slate-600 hover:text-black"
        onClick={handleSearchClick}
      />
    </div>
  );
};

export default SearchBar;