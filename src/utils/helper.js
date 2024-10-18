// Function to validate an email address using regex
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pattern to validate email
  return emailRegex.test(email); // Returns true if email matches the pattern, otherwise false
};

// Function to get initials from a name
export const getInitials = (name) => {
  if (!name) return; // Return undefined if name is not provided
  
  const words = name.split(" "); // Split the name into words
  let initials = ""; // Initialize an empty string for initials

  // Loop through the first two words (if available) to create initials
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0]; // Append the first letter of each word to initials
  }
  
  // Return the first initial in uppercase
  return initials[0]?.toUpperCase(); // Optional chaining to prevent errors if initials is empty
};