#!/usr/bin/env node

// Import dependencies
import os from "os";
const { default: fetch } = await import("node-fetch");
const { default: boxen } = await import("boxen");
const { default: chalk } = await import("chalk");
const { default: inquirer } = await import("inquirer");
const { default: clear } = await import("clear");
const { default: open } = await import("open");
const { default: fs } = await import("fs");
const { default: request } = await import("request");
const { default: path } = await import("path");
const { default: ora } = await import("ora");
const { default: readline } = await import("readline");
const { default: gradient } = await import("gradient-string");
const { default: cliSpinners } = await import("cli-spinners");
const { default: axios } = await import("axios");
const { default: twit } = await import("twit");

// Clear the terminal screen
clear();

// ASCII art text
const text = `
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
const synthWaveGradient = gradient([
  { color: "#F6964C", pos: 0 },
  { color: "#f16541", pos: 0.1 },
  { color: "#e8b9d3", pos: 0.27 },
  { color: "#da6c80", pos: 0.3 },
  { color: "#37b2ab", pos: 0.4 },
  { color: "#298191", pos: 0.6 },
  { color: "#0E647E", pos: 0.9 },
  { color: "#F6964C", pos: 1 },
]);

// Output the ASCII art text with gradient effect
console.log(synthWaveGradient(text));

// Real-Time Information
// Function to display real-time information
const displayRealTimeInfo = () => {
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

// Start displaying real-time information
displayRealTimeInfo();
// Asé - A chatbot like menu/guide. Navigator.
const promptAction = async () => {
  // Get the system's locale from the LANG environment variable
  const langEnv = process.env.LANG;
  let message = "Yes?"; // Default message
  if (langEnv) {
    // Extract the language from the LANG environment variable
    const lang = langEnv.split(".")[0];
    switch (lang) {
      case "en_US":
        message = "Yes?"; // English message
        break;
      case "fr_FR":
        message = "Oui?"; // French message
        break;
      // Add more cases for other languages as needed
      default:
        message = "Yes?"; // Default message for unsupported languages
        break;
    }
  }

  const { action } = await inquirer.prompt([
    {
      type: "input",
      name: "action",
      message: message,
      default: "Try 'help'", // Set default input message
      prefix: "Asé", // Remove default prefix
      transformer: (input) => {
        // Remove default message once the user starts typing
        if (input === "Type 'help' for available commands") return ""; // If default message, return empty string
        return input; // Otherwise, return the user's input
      },
    },
  ]);
  return action.trim().toLowerCase(); // Convert input to lowercase and remove leading/trailing spaces
};
// Fetch GitHub activity for a user
const fetchGitHubActivity = async (username) => {
  try {
    // Make a GET request to the GitHub API to fetch user's public activity
    const response = await axios.get(
      `https://api.github.com/users/${username}/events/public`
    );
    // Extract the array of events from the response data
    const events = response.data;
    return events;
  } catch (error) {
    console.error("Error fetching GitHub activity:", error.message);
    return null;
  }
};
// Function to display GitHub activity
const displayGitHubActivity = (events, username) => {
  if (!events || events.length === 0) {
    console.log("No GitHub activity found.");
    return;
  }
  console.log("GitHub activity for " + username + ":");
  // Limit the number of displayed events to the last 7
  const limitedEvents = events.slice(0, 3);
  // Display each event
  limitedEvents.forEach((event, index) => {
    console.log(
      `${index + 1}. Type: ${event.type}, Repo: ${event.repo.name}, Date: ${
        event.created_at
      }`
    );
  });
  // Include a link to the user's GitHub profile
  console.log(`\nGitHub Profile: https://github.com/${username}\n`);
};

// Twitter Activity
// Create a new Twit instance with your API keys and access tokens
const twitter = new twit({
  consumer_key: 'dShQGD5XneY4ZkxP4EuKrGBTz',
  consumer_secret: '9unEJYaRW1osw9ezz7Cf4DdvKzEewQUMVgNbPd6JVEzZeSR5vj',
  access_token: '166877175-ygCRJ9TbHSJmnjgG95rj4yx3puc2j2MaM5KyRRQi',
  access_token_secret: 'AWGbV5t4WlBmvQP3t4RhLhZAuIcZCDQRHcHiF3BzWItZ6',
});
// Function to fetch Twitter activity for a user
const fetchTwitterActivity = async (username) => {
  try {
    // Make a GET request to the Twitter API to fetch user's timeline
    const response = await twitter.get('statuses/user_timeline', {
      screen_name: username,
      count: 3, // Limit the number of tweets to 3
    });
    // Extract the array of tweets from the response data
    const tweets = response.data;
    return tweets;
  } catch (error) {
    console.error("Error fetching Twitter activity:", error.message);
    return null;
  }
};


// Function to display Twitter activity
const displayTwitterActivity = (tweets, username) => {
  if (!tweets || tweets.length === 0) {
    console.log("No Twitter activity found.");
    return;
  }
  console.log("Twitter activity for @" + username + ":");
  // Display each tweet
  tweets.forEach((tweet, index) => {
    console.log(`${index + 1}. Text: ${tweet.text}, Date: ${tweet.created_at}`);
  });
  // Include a link to the user's Twitter profile
  console.log(`\nTwitter Profile: https://twitter.com/${username}\n`);
};
// .....................

// Function to handle user input
const handleUserInput = async () => {
  let exit = false;
  while (!exit) {
    const userInput = await promptAction();
    switch (userInput) {
      case "email":
        open("mailto:sourceaura@proton.me");
        console.log("\nNamasté\n");
        break;
      case "spotify":
        open("https://open.spotify.com/user/12161931859");
        console.log("\nNamasté\n");
        break;
      case "github":
        const username = "SourceAura"; // Replace with the desired GitHub username
        const githubEvents = await fetchGitHubActivity(username);
        if (githubEvents !== null) {
          displayGitHubActivity(githubEvents, username);
        } else {
          console.log("Failed to fetch GitHub activity.");
        }
        break;
      case "twitter":
        const twitterUsername = "SourceAura"; // Replace with the desired Twitter username
        const tweets = await fetchTwitterActivity(twitterUsername);
        if (tweets !== null) {
          displayTwitterActivity(tweets, twitterUsername);
        } else {
          console.log("Failed to fetch Twitter activity.");
        }
        break;
      case "help":
        console.log("\nCommands:\n");
        console.log("  - email: email me?");
        console.log("  - github: Display Activity");
        console.log("  - twitter: Latest Tweets");
        console.log("  - spotify: Spotify profile");
        console.log("  - help: List command options");
        console.log("  - exit: Quit the chatbot\n");
        console.log("\n");
        break;
      case "exit":
        exit = true;
        console.log("\nNamasté...\n");
        process.exit(0);
        break;
      default:
        console.log("\nInvalid! Try 'help'.");
        break;
    }
  }
};
// Start handling user input
await handleUserInput();
