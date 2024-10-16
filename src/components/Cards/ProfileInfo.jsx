import React from "react";
import { getInitials } from "../../utils/helper";
const ProfileInfo = ({ userInfo, onLogout }) => {
  const name = getInitials(userInfo?.fullNme);

  return (
    <div className={`flex items-center gap-3`}>
      {name && (
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
          {name}
        </div>
      )}

      <div>
        <p className="text-sm font-medium">{userInfo?.fullNme}</p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
