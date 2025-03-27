const API_URL = 'https://api.github.com/repos/MindFlowInteractive/LogiQuest/contributors';

export const fetchContributors = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || 'Failed to fetch contributors');
        }

        // Extract only required fields: username, avatar, and profile link
        return data.map((contributor: any) => ({
            username: contributor.login,
            avatar: contributor.avatar_url,
            profile: contributor.html_url,
        }));
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};
