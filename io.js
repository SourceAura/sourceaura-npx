import inquirer from 'inquirer';
import axios from 'axios';
import open from 'open';

// Fetch GitHub activity for a user
const fetchGitHubActivity = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/events/public`);
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub activity:', error.message);
    return null;
  }
};

// Function to display GitHub activity
const displayGitHubActivity = (events, username) => {
  if (!events || events.length === 0) {
    console.log('\nNo GitHub activity found.\n');
    return;
  }
  console.log(`\nGitHub activity for ${username}:\n`);
  events.slice(0, 3).forEach((event, index) => {
    console.log(`${index + 1}. Type: ${event.type}, Repo: ${event.repo.name}, Date: ${new Date(event.created_at).toLocaleString()}`);
  });
  console.log(`\nGitHub Profile: https://github.com/${username}\n`);
};

// Function to display the main menu
const displayMenu = async () => {
  const mainMenuChoices = [
    { name: 'GitHub Options', value: 'github' },
    { name: 'Email me', value: 'email' },
    { name: 'Exit', value: 'exit' },
  ];

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Choose an option:',
      choices: mainMenuChoices,
      pageSize: 1,
    },
  ]);

  return action;
};

// Function to display the GitHub submenu
const displayGitHubMenu = async (githubUsername) => {
  const githubMenuChoices = [
    { name: 'See recent GitHub activity', value: 'githubActivity' },
    { name: 'Go to my GitHub page', value: 'openGitHub' },
    { name: 'Back to main menu', value: 'back' },
  ];

  const { githubAction } = await inquirer.prompt([
    {
      type: 'list',
      name: 'githubAction',
      message: 'GitHub Options:',
      choices: githubMenuChoices,
      pageSize: 1,
    },
  ]);

  return githubAction;
};

// Main function for user input - output
const io = async () => {
  const githubUsername = 'SourceAura'; // Replace with desired GitHub username

  while (true) {
    try {
      const action = await displayMenu();

      switch (action) {
        case 'github':
          const githubAction = await displayGitHubMenu(githubUsername);
          if (githubAction === 'githubActivity') {
            const githubEvents = await fetchGitHubActivity(githubUsername);
            displayGitHubActivity(githubEvents, githubUsername);
          } else if (githubAction === 'openGitHub') {
            open(`https://github.com/${githubUsername}`);
          }
          break;
        case 'email':
          open('mailto:sourceaura@proton.me');
          console.log('\nOpening email client...\n');
          break;
        case 'exit':
          console.log('\nExiting...');
          process.exit(0);
        default:
          console.log('\nInvalid command! Please choose a valid option.\n');
          break;
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }
};

// Export the i/o function
export default io;
