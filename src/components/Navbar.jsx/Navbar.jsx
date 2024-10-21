import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

// Navbar component
const Navbar = ({ userInfo, onSearchNote, onTagSearch, onStatusSearch, handleClearSearch }) => {
  // State hooks
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Logout function
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Handle search function
  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  // Handle tag search function
  const handleTagSearch = () => {
    if (searchQuery.trim()) {
      onTagSearch(searchQuery);
    }
  };

  // Handle status search function
  const handleStatusSearch = () => {
    if (searchQuery.trim()) {
      onStatusSearch(searchQuery);
    }
  };

  // Clear search function
  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
    setIsSearchVisible(false);
  };

  // Toggle search bar visibility
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    setIsMobileMenuOpen(false);
  };

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSearchVisible(false);
  };

  // Get the current page path to hide logout in login/signup pages
  const currentPath = window.location.pathname;

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <h2 className="md:text-2xl text-lg font-bold text-teal-600">
                <Link to={`/`} className="block py-2"> همّة - Himma</Link>
              </h2>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                {localStorage.getItem("token") && (
                  <SearchBar
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    handleSearch={handleSearch}
                    onTagSearch={handleTagSearch}
                    onStatusSearch={handleStatusSearch}
                    onClearSearch={onClearSearch}
                    keepSearchOpen={(open) => setIsSearchVisible(open)} // Keep search bar open
                  />
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle & Search Toggle */}
            <div className="flex items-center md:hidden">
              {localStorage.getItem("token") && (
                <button
                  onClick={toggleSearch}
                  className="p-2 rounded-lg text-slate-600 hover:text-teal-600 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              )}
              <button
                onClick={toggleMobileMenu}
                className="ml-2 p-2 rounded-lg text-slate-600 hover:text-teal-600 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>

            {/* Desktop Profile Info */}
            {localStorage.getItem("token") && currentPath !== "/login" && currentPath !== "/signup" && (
              <div className="hidden md:flex items-center">
                <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Search Bar */}
      {isSearchVisible && localStorage.getItem("token") && (
        <div className="md:hidden fixed inset-x-0 top-16 z-30 px-4 py-2 bg-white shadow-md">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            handleSearch={handleSearch}
            onTagSearch={handleTagSearch}
            onStatusSearch={handleStatusSearch}
            onClearSearch={onClearSearch}
            keepSearchOpen={(open) => setIsSearchVisible(open)} // Keep search bar open
          />
        </div>
      )}

      {/* Spacer for Mobile Search */}
      {isSearchVisible && <div className="md:hidden h-16" />}
    </>
  );
};

export default Navbar;
