import React from 'react';
import moment from 'moment';
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h6 className="text-lg font-semibold text-gray-800">{title}</h6>
            <span className="text-xs text-gray-500">{moment(date).format("DD MMM YYYY")}</span>
          </div>
          <button
            onClick={onPinNote}
            className={`p-1 rounded-full ${isPinned ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-400'} hover:bg-teal-200 transition-colors duration-200`}
          >
            <MdOutlinePushPin className="text-xl" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{content}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span key={index} className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-teal-100 hover:text-teal-600 transition-colors duration-200"
            >
              <MdCreate className="text-xl" />
            </button>
            <button
              onClick={onDelete}
              className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
            >
              <MdDelete className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;