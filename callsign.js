// Import necessary dependencies
import { default as clear } from 'clear';
import { default as gradient } from 'gradient-string';


// ASCII art text
const tag = `

██████    ▒█████    █   ██  ██▀███   ▄████▄  ▓█████ ▄▄▄       █    ██  ██▀███   ▄▄▄      
▒██      ▒██▒  ██▒ ██  ▓██▒▓██   ██▒▒██▀ ▀█  ▓█   ▀▒████▄     ██  ▓██▒▓██   ██▒▒████▄    
░  ██▄   ▒██░  ██▒▓██  ▒██░▓██  ▄█ ▒▒▓█    ▄ ▒███  ▒██  ▀█▄  ▓██  ▒██░▓██  ▄█ ▒▒██  ▀█▄  
▒     ██▒▒██   ██░▓▓█  ░██░▒██▀▀█▄  ▒▓▓▄ ▄██▒▒▓█  ▄░██▄▄▄▄██ ▓▓█  ░██░▒██▀▀█▄  ░██▄▄▄▄██ 
▒██████▒▒░ ████▓▒░▒▒█████▓ ░██▓ ▒██▒▒ ▓███▀ ░░▒████▒▓█   ▓██▒▒▒█████▓ ░██▓ ▒██▒ ▓█   ▓██▒
▒ ▒▓▒ ▒ ░░ ▒░▒░▒░ ░▒▓▒ ▒ ▒ ░ ▒▓ ░▒▓░░ ░▒ ▒  ░░░ ▒░ ░▒▒   ▓▒█░░▒▓▒ ▒ ▒ ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░
░ ░▒  ░ ░  ░ ▒ ▒░ ░░▒░ ░ ░   ░▒ ░ ▒░  ░  ▒    ░ ░  ░ ▒   ▒▒ ░░░▒░ ░ ░   ░▒ ░ ▒░  ▒   ▒▒ ░
░  ░  ░  ░ ░ ░ ▒   ░░░ ░ ░   ░░   ░ ░           ░    ░   ▒    ░░░ ░ ░   ░░   ░   ░   ▒   
      ░      ░ ░     ░        ░     ░ ░         ░  ░     ░  ░   ░        ░           ░  ░
                                    ░                                                                                         
`;

// Gradient effect for text
const gradientEffect = gradient([
  { color: '#0aa39f', pos: 0 }, 
  { color: '#da6c80', pos: 0.4 },
  { color: '#ff5e62', pos: 0.4 },
  { color: '#ff9966', pos: 0.7 },
  { color: '#9966ff', pos: 0.8 },
  { color: '#9966ff', pos: 0.9 },
  { color: '#542D6A', pos: 1 },
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

