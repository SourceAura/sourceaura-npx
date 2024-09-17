import clear from "clear";
import gradient from "gradient-string";

// ASCII art text
const tag = `

██████    ▒█████    █   ██  ██▀███   ▄████▄  ▓█████ ▄▄▄       █    ██  ██▀███   ▄▄▄
▒██      ▒██▒  ██▒ ██  ▓██▒▓██   ██▒▒██▀ ▀█  ▓█   ▀▒████▄     ██  ▓██▒▓██   ██▒▒████▄
░  ██▄   ▒██░  ██▒▓██  ▒██░▓██  ▄█ ▒▒▓█    ▄ ▒███  ▒██  ▀█▄  ▓██  ▒██░▓██  ▄█ ▒▒██  ▀█▄
▒     ██▒▒██   ██░▓▓█  ░██░▒██▀▀█▄  ▒▓▓▄ ▄██▒▒▓█  ▄░██▄▄▄▄██ ▓▓█  ░██░▒██▀▀█▄  ░██▄▄▄▄██
▒██████▒▒░ ████▓▒░▒▒█████▓ ░██▓ ▒██▒▒ ▓███▀ ░░▒████▒▓█   ▓██▒▒▒█████▓ ░██▓ ▒██▒ ▓█   ▓██▒
▒ ▒▓▒ ▒ ░░ ▒░▒░▒░ ░▒▓▒ ▒ ▒ ░ ▒▓ ░▒▓░░ ░▒ ▒  ░░ ▒░ ░▒▒   ▓▒█░░▒▓▒ ▒ ▒ ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░
░ ░▒  ░ ░  ░ ▒ ▒░ ░░▒░ ░ ░   ░▒ ░ ▒░  ░  ▒    ░ ░  ░ ▒   ▒▒ ░░░▒░ ░ ░   ░▒ ░ ▒░  ▒   ▒▒ ░
░  ░  ░  ░ ░ ░ ▒   ░░░ ░ ░   ░░   ░ ░           ░    ░   ▒    ░░░ ░ ░   ░░   ░   ░   ▒
      ░      ░ ░     ░        ░     ░ ░         ░  ░     ░  ░   ░        ░           ░  ░
                                    ░
`;

// Optimize gradient effect
const gradientEffect = gradient([
  { color: "#43AA88", pos: 0 },
  { color: "#3CB0AF", pos: 0.2 },
  { color: "#F6C309", pos: 0.4 },
  { color: "#F19F20", pos: 0.6 },
  { color: "#f85254", pos: 0.8 },
  { color: "#900766", pos: 0.9 },
  { color: "#50005B", pos: 1 },
]);

// Function to display the ASCII art text with gradient effect
const callsign = () => {
  // Clear the terminal screen
  clear();
  // Display the ASCII art text with gradient effect
  console.log(gradientEffect(tag));
};

// Export the callsign function
export default callsign;
