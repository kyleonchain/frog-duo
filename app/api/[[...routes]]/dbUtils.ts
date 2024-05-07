import { Pool } from 'pg';

// Initialize PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Function to insert or update user data
export async function upsertUserData(farcasterId: string, duolingoUsername: string, streak: number, totalXp: number, langLearning: string, learningFrom: string, joinedDate: Date) {
    const query = `
        INSERT INTO duolingo_farcaster (farcaster_id, duolingo_username, streak, total_xp, lang_learning, learning_from, joined_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (farcaster_id) DO UPDATE
        SET duolingo_username = EXCLUDED.duolingo_username, streak = EXCLUDED.streak, total_xp = EXCLUDED.total_xp, lang_learning = EXCLUDED.lang_learning, learning_from = EXCLUDED.learning_from, joined_date = EXCLUDED.joined_date;
    `;
    try {
        await pool.query(query, [farcasterId, duolingoUsername, streak, totalXp, langLearning, learningFrom, joinedDate]);
        console.log('Upsert operation successful for Farcaster ID:', farcasterId);
    } catch (error) {
        console.error('Error during upsert operation:', error);
    }
}

// Function to retrieve rankings
export async function getRankings() {
    const query = `SELECT * FROM duolingo_farcaster ORDER BY streak DESC;`;
    const { rows } = await pool.query(query);
    return rows;
}