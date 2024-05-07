import { getRankings } from './dbUtils';

// Function to format rankings for display
export async function displayRankings() {
    const rankings = await getRankings();
    return rankings.map((user, index) => ({
        rank: index + 1,
        username: user.duolingo_username,
        streak: user.streak
    }));
}