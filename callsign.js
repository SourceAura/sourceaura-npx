// ASCII art text
const tag = `
  ██████ ▒█████  █    ██ ██▀███  ▄████▄  ▄▄▄      █    ██ ██▀███  ▄▄▄      
▒██    ▒▒██▒  ██▒██  ▓██▓██ ▒ ██▒██▀ ▀█ ▒████▄    ██  ▓██▓██ ▒ ██▒████▄    
░ ▓██▄  ▒██░  ██▓██  ▒██▓██ ░▄█ ▒▓█    ▄▒██  ▀█▄ ▓██  ▒██▓██ ░▄█ ▒██  ▀█▄  
  ▒   ██▒██   ██▓▓█  ░██▒██▀▀█▄ ▒▓▓▄ ▄██░██▄▄▄▄██▓▓█  ░██▒██▀▀█▄ ░██▄▄▄▄██ 
▒██████▒░ ████▓▒▒▒█████▓░██▓ ▒██▒ ▓███▀ ░▓█   ▓██▒▒█████▓░██▓ ▒██▒▓█   ▓██▒
▒ ▒▓▒ ▒ ░ ▒░▒░▒░░▒▓▒ ▒ ▒░ ▒▓ ░▒▓░ ░▒ ▒  ░▒▒   ▓▒█░▒▓▒ ▒ ▒░ ▒▓ ░▒▓░▒▒   ▓▒█░
░ ░▒  ░ ░ ░ ▒ ▒░░░▒░ ░ ░  ░▒ ░ ▒░ ░  ▒    ▒   ▒▒ ░░▒░ ░ ░  ░▒ ░ ▒░ ▒   ▒▒ ░
░  ░  ░ ░ ░ ░ ▒  ░░░ ░ ░  ░░   ░░         ░   ▒   ░░░ ░ ░  ░░   ░  ░   ▒   
      ░     ░ ░    ░       ░    ░ ░           ░  ░  ░       ░          ░  ░
                                ░                                          
`;



// Gradient effect for text
const gradientEffect = gradient([
    { color: '#ff9966', pos: 0 },
    { color: '#ff5e62', pos: 0.3 },
    { color: '#ff66cc', pos: 0.6 },
    { color: '#9966ff', pos: 1 },
  ]);
  
  // Output the ASCII art text with gradient effect
  // Function to display the ASCII art text with gradient effect
  const callsign = () => {
    // Clear the terminal screen
    clear();
    // Display the ASCII art text with gradient effect
    console.log(gradientEffect(tag));
  };