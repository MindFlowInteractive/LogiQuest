import axios from 'axios';

const API_URL = 'https://api.github.com/repos/MindFlowInteractive/LogiQuest/contributors';

// Fetch contributors from GitHub API
export const fetchContributors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching contributors:', error);
    throw error;
  }
};
