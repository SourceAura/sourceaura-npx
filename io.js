import inquirer from "inquirer";
import axios from "axios";
import open from "open";
import ora from 'ora';
import NodeCache from 'node-cache';
import chalk from 'chalk';

// Fetch GitHub activity for a user
const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

const fetchGitHubActivity = async (username) => {
  const cacheKey = `github_activity_${username}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const spinner = ora('Fetching GitHub activity...').start();
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/events/public`,
    );
    spinner.succeed('GitHub activity fetched successfully');
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    spinner.fail('Error fetching GitHub activity');
    console.error("Error details:", error.message);
    return null;
  }
};

// Optimize the GitHub activity display
const displayGitHubActivity = (events, username) => {
  if (!events || events.length === 0) {
    console.log(chalk.yellow("\nNo GitHub activity found.\n"));
    return;
  }
  console.log(chalk.cyan(`\nRecent activity for ${username}:\n`));
  events.slice(0, 3).forEach((event, index) => {
    console.log(
      chalk.green(`${index + 1}. Type: ${event.type}, Repo: ${event.repo.name}, Date: ${new Date(event.created_at).toLocaleString()}`),
    );
  });
  console.log(chalk.blue(`\nView more at: https://github.com/${username}\n`));
};

// Function to display the main menu
const displayMenu = async () => {
  const mainMenuChoices = [
    { name: "GitHub", value: "github" },
    { name: "Twitter", value: "twitter" },
    { name: "Email", value: "email" },
    { name: "About Me", value: "about" },
    { name: "Exit", value: "exit" },
  ];

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Choose an option:",
      choices: mainMenuChoices,
      pageSize: 1,
    },
  ]);

  return action;
};

// Function to display the GitHub submenu
const displayGitHubMenu = async (githubUsername) => {
  const githubMenuChoices = [
    { name: "currently", value: "githubActivity" },
    { name: "github", value: "openGitHub" },
    { name: "back", value: "back" },
  ];

  const { githubAction } = await inquirer.prompt([
    {
      type: "list",
      name: "githubAction",
      message: "GitHub Options:",
      choices: githubMenuChoices,
      pageSize: 1,
    },
  ]);

  return githubAction;
};

// Add a new function for Twitter activity
const fetchTwitterActivity = async (username) => {
  // Implement Twitter API call here
};

// Update the Twitter function
const displayTwitterInfo = (username) => {
  console.log(chalk.cyan(`\nTwitter Handle: @${username}`));
  console.log(chalk.blue(`\nView profile at: https://twitter.com/${username}\n`));
};

// Add a new function to display About Me information
const displayAboutMe = () => {
  console.log(chalk.cyan("\n🫀 • 🫁 • 🧠\n"));
  console.log(chalk.yellow("🌱 :: An ever budding Software Designer."));
  console.log(chalk.yellow("With an eye for multi-user accessibility. - ♿️\n"));
  console.log(chalk.magenta("When I'm not exploring code and things."));
  console.log(chalk.magenta("I'm usually writing poetry 🖊, painting 🎨, or practicing guitar 🎸.\n"));
};

// Main function for user input - output
const io = async () => {
  const githubUsername = "SourceAura"; // Replace with desired GitHub username
  const twitterUsername = "SourceAura";

  while (true) {
    try {
      const action = await displayMenu();

      switch (action) {
        case "github":
          const githubAction = await displayGitHubMenu(githubUsername);
          if (githubAction === "githubActivity") {
            const githubEvents = await fetchGitHubActivity(githubUsername);
            displayGitHubActivity(githubEvents, githubUsername);
          } else if (githubAction === "openGitHub") {
            open(`https://github.com/${githubUsername}`);
          }
          break;
        case "twitter":
          displayTwitterInfo(twitterUsername);
          const { openTwitter } = await inquirer.prompt([
            {
              type: 'confirm',
              name: 'openTwitter',
              message: 'Would you like to open the Twitter profile in your browser?',
              default: false
            }
          ]);
          if (openTwitter) {
            open(`https://twitter.com/${twitterUsername}`);
            console.log(chalk.green("\nOpening Twitter profile in your default browser...\n"));
          }
          break;
        case "email":
          open("mailto:sourceaura@proton.me");
          console.log("\nOpening email client...\n");
          break;
        case "about":
          displayAboutMe();
          break;
        case "exit":
          console.log("\nExiting...");
          process.exit(0);
        default:
          console.log("\nInvalid command! Please choose a valid option.\n");
          break;
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      console.log("Please try again or choose a different option.");
    }
  }
};

// Export the i/o function
export default io;
