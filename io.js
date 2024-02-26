// io.js
import inquirer from 'inquirer';
// Define Twitter API credentials from environment variables
const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET } = process.env;


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

// Function to fetch Twitter activity for a user
const fetchTwitterActivity = async (username) => {
  try {
    const response = await twitter.get('statuses/user_timeline', {
      screen_name: username,
      count: 3,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Twitter activity:', error.message);
    return null;
  }
};
// Function to display Twitter activity
const displayTwitterActivity = (tweets, username) => {
  if (!tweets || tweets.length === 0) {
    console.log('\nNo Twitter activity found.\n');
    return;
  }
  console.log(`\nTwitter activity for @${username}:\n`);
  tweets.forEach((tweet, index) => {
    console.log(`${index + 1}. Text: ${tweet.text}, Date: ${new Date(tweet.created_at).toLocaleString()}`);
  });
  console.log(`\nTwitter Profile: https://twitter.com/${username}\n`);
};

// Function for user input - output.
const io = async () => {
  while (true) {
    try {
      const { action } = await inquirer.prompt([
        {
          type: 'input',
          name: 'action',
          message: 'How can I assist you?',
          prefix: '',
        },
      ]);

      switch (action.trim().toLowerCase()) {
        case 'email':
          clear();
          callsign();
          open('mailto:sourceaura@proton.me');
          console.log('\nOpening email client...\n');
          break;
        case 'spotify':
          clear();
          callsign();
          open('https://open.spotify.com/user/12161931859');
          console.log('\nOpening Spotify profile...\n');
          break;
        case 'github':
          const githubUsername = 'SourceAura'; // Replace with desired GitHub username
          const githubEvents = await fetchGitHubActivity(githubUsername);
          clear();
          callsign();
          displayGitHubActivity(githubEvents, githubUsername);
          break;
        case 'twitter':
          const twitterUsername = 'SourceAura'; // Replace with desired Twitter username
          const tweets = await fetchTwitterActivity(twitterUsername);
          displayTwitterActivity(tweets, twitterUsername);
          break;
        case 'help':
          clear();
          callsign();
          displayHelpMenu();
          break;
        case 'back':
          clear();
          console.log('\nBack to main menu...');
          callsign();
          break;
        case 'exit':
          console.log('\nExiting...');
          process.exit(0);
        default:
          clear();
          callsign();
          console.log('\nInvalid command! Type "help" for available commands.\n');
          break;
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }
};

// Export the i/o function
export default io;
