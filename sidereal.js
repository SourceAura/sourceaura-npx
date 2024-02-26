// Function to display real-time information
// Prevent overwrite of the input area
const sidereal = () => {
    // Update information dynamically
    const interval = setInterval(() => {
      // Clear the previous line for real-time information
      process.stdout.moveCursor(0, -1);
      process.stdout.clearLine();
      // Move the cursor to the beginning of the line
      process.stdout.cursorTo(0);
      // Display the real-time information
      process.stdout.write(`Current: ${new Date().toLocaleString()}`);
      // Move the cursor back down to the user prompt area
      process.stdout.moveCursor(0, 1);
    }, 1000); // Update every second
  };

  export default sidereal;