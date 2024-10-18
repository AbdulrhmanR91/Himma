import React, { useState } from "react"; // Import React and useState hook
import TagInput from "../../components/Input/TagInput"; // Import custom TagInput component
import { MdClose } from "react-icons/md"; // Import close icon from react-icons
import axiosInstance from "../../utils/axiosInstance"; // Import axios instance for API calls

// Define the AddEditNotes component for adding or editing notes
const AddEditNotes = ({ noteData, type, getAllNotes, onclose, showToastMessage }) => {
  // State variables for title, content, tags, status, and error messages
  const [title, setTitle] = useState(noteData?.title || ""); // Set initial title from noteData or empty string
  const [content, setContent] = useState(noteData?.content || ""); // Set initial content
  const [tags, setTags] = useState(noteData?.tags || []); // Set initial tags
  const [status, setStatus] = useState(noteData?.status || "pending"); // Set initial status
  const [error, setError] = useState(null); // Initialize error state

  // Function to add a new note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
        status
      });

      // If note added successfully, show toast and refresh notes
      if (response.data && response.data.note) {
        showToastMessage("Task Added Successfully");
        getAllNotes();
        onclose();
      }
    } catch (error) {
      // Set error message if the API call fails
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  // Function to edit an existing note
  const editNote = async () => {
    const noteId = noteData._id; // Get the note ID from noteData
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
        status
      });

      // If note updated successfully, show toast and refresh notes
      if (response.data && response.data.note) {
        showToastMessage("Task Updated Successfully");
        getAllNotes();
        onclose();
      }
    } catch (error) {
      // Set error message if the API call fails
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  // Handle adding or editing a note based on the type
  const handleAddNote = () => {
    // Validate title and content input
    if (!title) {
      setError("Please enter the title!");
      return;
    }
    if (!content) {
      setError("Please enter the Content!");
      return;
    }
    setError(""); // Clear error message if inputs are valid

    // Call the appropriate function based on the type (add or edit)
    if (type === 'edit') {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      {/* Close button to dismiss the modal */}
      <button
        className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
        onClick={onclose}
      >
        <MdClose className="text-gray-600" />
      </button>

      {/* Title of the modal (Add or Edit Task) */}
      <h2 className="text-2xl font-semibold mb-6 text-teal-600">
        {type === "edit" ? "Edit Task" : "Add New Task"}
      </h2>

      <div className="space-y-4">
        {/* Input field for title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter task title"
            value={title}
            onChange={({ target }) => setTitle(target.value)} // Update title state on change
          />
        </div>

        {/* Textarea for content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter task details"
            rows={6}
            value={content}
            onChange={({ target }) => setContent(target.value)} // Update content state on change
          />
        </div>

        {/* Tag input component for tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <TagInput tags={tags} setTags={setTags} /> {/* Pass tags and setter to TagInput */}
        </div>

        {/* Dropdown for selecting status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)} // Update status state on change
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        {/* Display error message if any */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Button to add or update task */}
        <button
          className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors duration-200"
          onClick={handleAddNote}
        >
          {type === "edit" ? "Update Task" : "Add Task"} {/* Change button text based on type */}
        </button>
      </div>
    </div>
  );
};

// Export the AddEditNotes component for use in other parts of the application
export default AddEditNotes;
