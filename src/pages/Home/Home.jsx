import React, { useState, useEffect } from "react"; // Import React and hooks
import Navbar from "../../components/Navbar.jsx/Navbar"; // Import Navbar component
import NoteCard from "../../components/Cards/NoteCard"; // Import NoteCard component
import { MdAdd } from "react-icons/md"; // Import the add icon from react-icons
import AddEditNotes from "./AddEditNote"; // Import the AddEditNotes component
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import Modal from "react-modal"; // Import Modal for adding/editing notes
import axiosInstance from "./../../utils/axiosInstance"; // Import axios instance for API calls
import Toast from "../../components/ToastMessage/Toast"; // Import Toast component for messages
import EmptyNotes from "../../components/EmptyNotes/EmptyNotes"; // Import EmptyNotes component for empty state
import AddNotesImg from "../../assets/images/add-notes.svg"; // Import image for adding notes
import NoDataImg from "../../assets/images/no-data.svg"; // Import image for no data found

// Define the Home component
const Home = () => {
  // State to control the modal for adding/editing notes
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  // Function to group notes by their status
  const getGroupedNotes = () => {
    return {
      pending: allNotes.filter(note => note.status === 'pending'),
      inProgress: allNotes.filter(note => note.status === 'in progress'),
      completed: allNotes.filter(note => note.status === 'completed')
    };
  };

  // State for toast message display
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]); // State to hold all notes
  const [userInfo, setUserInfo] = useState(null); // State to hold user information
  const [isSearch, setIsSearch] = useState(false); // State to track search status

  const navigate = useNavigate(); // Initialize navigation

  // Function to open edit modal with note details
  const handleEdit = (noteDetails) => {
    setOpenAddEditModel({ isShown: true, type: "edit", data: noteDetails });
  };

  // Function to show toast messages
  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  // Function to close toast messages
  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  // Fetch user information from the server
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      } else {
        navigate("/login"); // Redirect to login if user data is not found
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear(); // Clear local storage on unauthorized access
        navigate("/login");
      }
    }
  };

  // Fetch all notes from the server
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes); // Set notes state
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.");
    }
  };

  // Delete a note
  const deleteNote = async (data) => {
    const noteId = data._id; // Get the note ID
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        showToastMessage("Task Deleted Successfully", "delete");
        getAllNotes(); // Refresh notes after deletion
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.");
    }
  };

  // Search for notes by query
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true); // Set search state to true
        setAllNotes(response.data.notes); // Update notes with search results
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle pin status of a note
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id; // Get note ID
    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + noteId,
        {
          isPinned: !noteData.isPinned, // Toggle pin status
        }
      );
      if (response.data && response.data.note) {
        showToastMessage("Task Pinned Successfully");
        getAllNotes(); // Refresh notes after pinning
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Clear search results and fetch all notes
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  // Search notes by tags
  const onTagSearch = async (tagString) => {
    try {
      const response = await axiosInstance.get("/search-notes-by-tags", {
        params: { tags: tagString },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true); // Set search state to true
        setAllNotes(response.data.notes); // Update notes with search results
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Change the status of a note
  const handleStatusChange = async (noteId, newStatus) => {
    try {
      const response = await axiosInstance.put(`/update-note-status/${noteId}`, {
        status: newStatus
      });
      
      if (response.data && !response.data.error) {
        showToastMessage("Task Status Updated Successfully");
        getAllNotes(); // Refresh notes after status update
      }
    } catch (error) {
      console.error("An unexpected error occurred while updating status.");
    }
  };

  // Fetch user info and notes on component mount
  useEffect(() => {
    getUserInfo();
    getAllNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render notes grouped by status
  const renderStatusSection = (title, notes) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {notes.map((item) => (
          <NoteCard
            key={item._id} // Unique key for each note
            title={item.title}
            date={item.createdOn}
            content={item.content}
            tags={item.tags}
            isPinned={item.isPinned}
            status={item.status}
            onEdit={() => handleEdit(item)} // Edit note callback
            onDelete={() => deleteNote(item)} // Delete note callback
            onPinNote={() => updateIsPinned(item)} // Pin note callback
            onStatusChange={(newStatus) => handleStatusChange(item._id, newStatus)} // Change status callback
          />
        ))}
      </div>
    </div>
  );

  // Search notes by status
  const onStatusSearch = async (status) => {
    try {
      const response = await axiosInstance.get("/search-notes-by-status", {
        params: { status: status.toLowerCase() }
      });
      if (response.data && response.data.notes) {
        setIsSearch(true); // Set search state to true
        setAllNotes(response.data.notes); // Update notes with search results
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        onTagSearch={onTagSearch}
        onStatusSearch={onStatusSearch}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto px-4 py-8">
        {allNotes.length > 0 ? ( // Check if there are any notes to display
          <div>
            {(() => {
              const { inProgress, pending, completed } = getGroupedNotes(); // Group notes by status
              return (
                <>
                  {inProgress.length > 0 && renderStatusSection('In Progress', inProgress)} {/* Render In Progress section */}
                  {pending.length > 0 && renderStatusSection('Pending', pending)} {/* Render Pending section */}
                  {completed.length > 0 && renderStatusSection('Completed', completed)} {/* Render Completed section */}
                </>
              );
            })()}
          </div>
        ) : (
          // Display EmptyNotes component if there are no notes
          <EmptyNotes
            imgSrc={isSearch ? NoDataImg : AddNotesImg} // Choose image based on search status
            message={
              isSearch
                ? "Oops! No Tasks found" // Message for no tasks found
                : "Click the 'Add' Button to jot down your ideas, thoughts, and reminders. Let's get started!" // Message for encouraging note addition
            }
          />
        )}
      </div>

      {/* Button to open the modal for adding a new note */}
      <button
        className="fixed right-4 bottom-4 md:right-8 md:bottom-8 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-teal-500 hover:bg-teal-600 transition-colors duration-300 shadow-lg"
        onClick={() => {
          setOpenAddEditModel({ isShown: true, type: "add", data: null }); // Open modal for adding a note
        }}
      >
        <MdAdd /> {/* Add icon */}
      </button>

      {/* Modal for adding/editing notes */}
      <Modal
        className=" w-[80%] m-auto max-w-[500px]  py-8 rounded-[8px] mt-20 border-none p-[16px] bg-white"
        isOpen={openAddEditModel.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay styling
          },
          content: {
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Content shadow styling
          },
        }}
        contentLabel="Add/Edit Note"
      >
        <AddEditNotes
          type={openAddEditModel.type} // Modal type (add/edit)
          noteData={openAddEditModel.data} // Note data for editing
          onclose={() => {
            setOpenAddEditModel({ isShown: false, type: "add", data: null }); // Close modal
          }}
          getAllNotes={getAllNotes} // Function to refresh notes
          showToastMessage={showToastMessage} // Function to show toast messages
        />
      </Modal>

      {/* Toast message for notifications */}
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onclose={handleCloseToast} // Function to close toast
      />
    </div>
  );
};

// Export the Home component
export default Home;
