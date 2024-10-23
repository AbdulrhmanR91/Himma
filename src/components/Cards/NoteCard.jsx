// Importing necessary libraries and components
import React from 'react';
import moment from 'moment';
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

// NoteCard component definition that takes various props
const NoteCard = ({
  title, // Title of the note
  date,  // Date when the note was created
  content, // Content of the note
  tags,  // Tags associated with the note
  isPinned,  // Boolean to check if the note is pinned
  status, // Status of the note (pending, in progress, completed)
  onEdit,  // Function to trigger when editing the note
  onDelete, // Function to trigger when deleting the note
  onPinNote,  // Function to trigger when pinning the note
  onStatusChange // Function to trigger when status changes
}) => {

  // Function to return a CSS class based on the note's status
  const getStatusColor = (status) => {
    switch(status) {
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

// Function to handle status change
  const handleStatusChange = (e) => {
      const newStatus = e.target.value;
      onStatusChange(newStatus);
    };

    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="p-4">
          {/* رأس البطاقة */}
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
  
          {/* محتوى المهمة */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">{content}</p>
  
          {/* قسم العلامات والحالة */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
              {/* قائمة تحديث الحالة */}
              <select
                value={status}
                onChange={handleStatusChange}
                className={`text-xs px-2 py-1 rounded cursor-pointer ${getStatusColor(status)}`}
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
  
            {/* أزرار التحكم */}
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