import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

// TagInput component to manage tags
const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState("");

    // Handle input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Add new tag
    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    };

    // Handle key down event for Enter key
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewTag();
        }
    };

    // Remove tag
    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div>
            {/* Display tags if there are any */}
            {tags?.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mt-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded">
                            #{tag}
                            <button onClick={() => handleRemoveTag(tag)}>
                                <MdClose />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Input field and add button */}
            <div className="flex items-center gap-4 mt-3">
                <input
                    type="text"
                    value={inputValue}
                    className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
                    placeholder="Add tags"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="w-8 h-8 flex items-center justify-center rounded border border-[#0d9488] hover:bg-[#0d9488]"
                    onClick={addNewTag}
                >
                    <MdAdd className="text-2xl text-[#0d9488] hover:text-white" />
                </button>
            </div>
        </div>
    );
};

export default TagInput;
