import React from "react";
import { getInitials } from "../../utils/helper";

// ProfileInfo component to display user information and a logout button
const ProfileInfo = ({ userInfo, onLogout }) => {
  // Get initials from the user's full name
  const name = getInitials(userInfo?.fullName);

  return (
    <div className={`flex items-center gap-3`}>
      {name && (
        // Display initials inside a styled div
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 cursor-pointer hover:bg-slate-200">
          {name}
        </div>
      )}

      <div>
        {/* Display user's full name */}
        <p className="text-sm font-medium">{userInfo?.fullName}</p>
        {/* Logout button */}
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
