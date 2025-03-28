export async function fetchContributors() {
    try {
      const response = await fetch(
        "https://api.github.com/repos/MindFlowInteractive/LogiQuest/contributors"
      );
  
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching contributors:", error);
      return [];
    }
  }
  