/** @jsxImportSource frog/jsx */
import { Frog, TextInput, Button } from 'frog'
import { devtools } from 'frog/dev'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { Box, Heading, Text, HStack, VStack, vars, Image } from './ui.ts'
import fetch from 'node-fetch'
import { languageData } from './languages.ts'
import { pinata } from 'frog/hubs'
import { upsertUserData } from './dbUtils'
import { displayRankings } from './rankingsUtils'

const app = new Frog({
  ui: { vars },
  assetsPath: '/',
  basePath: '/api',
  hub: pinata(),
})

app.frame('/', async (c) => {
  return c.res({
    action: '/fetch-data',
    image: (
      <Box
        grow
        alignVertical="center"
        backgroundColor="background"
        padding="32"
      >
        <HStack gap="4">
          <VStack>
            <Heading>Duolingo Stats Farcaster Frame</Heading>
            <Text color="FeatherGreen" size="24">
              Check your language learning stats and see where your streak ranks against other Duo users on Farcaster!
            </Text>
            <Image src="https://1000logos.net/wp-content/uploads/2020/10/Duolingo-logo.png" />
          </VStack>
        </HStack>
      </Box>
    ),
    intents: [<TextInput
      placeholder="Enter your Duolingo username" />,
      <Button action='/fetch-data'>Submit</Button>,
    ]
  })
})

// @ts-ignore
app.frame('/fetch-data', async (c) => {
  const { inputText, frameData } = c;
  const { fid } = frameData;
  //console.log('farcaster id', frameData)
  if (inputText) {
    try {
      const response = await fetch(`https://www.duolingo.com/2017-06-30/users?username=${inputText}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        }
      });
      if (response.ok) {
        const userData = await response.json();
        const startDate = new Date(userData.users[0].streakData.currentStreak.startDate);
        const endDate = new Date(userData.users[0].streakData.currentStreak.endDate);
        const formattedStartDate = `${startDate.toLocaleString('default', { month: 'long' })} ${startDate.getDate()}, ${startDate.getFullYear()}`;
        const streak = `${userData.users[0].streakData.currentStreak.length} days 🔥`;
        const streak_num = userData.users[0].streakData.currentStreak.length
        const avatar = `https://${userData.users[0].picture}/large`;
        const language_learning = userData.users[0].learningLanguage.toUpperCase();
        const language_learning_from = userData.users[0].fromLanguage.toUpperCase();
        const joined_date_unix = userData.users[0].creationDate;
        const joined_date = new Date(joined_date_unix * 1000);
        const formatted_joined_date = `${joined_date.toLocaleString('default', { month: 'long' })} ${joined_date.getDate()}, ${joined_date.getFullYear()}`;
        const total_xp = userData.users[0].totalXp

        // Mapping country codes to flag emojis and language names
        const flagEmoji = languageData[language_learning]?.flag || '🌐'; // Default to globe if country code not found
        const flagEmojiFrom = languageData[language_learning_from]?.flag || '🌐'; // Default to globe if country code not found
        
        const fullLanguage = languageData[language_learning]?.name || 'Other'; // Default to globe if country code not found
        const fullLanguagefrom = languageData[language_learning_from]?.name || 'Other'; // Default to globe if country code not found
        
        //console.log('name', languageData[language_learning]?.name);        
        //console.log('streak num: ', streak_num);

        // insert data
        try {
          // Insert or update the database
          await upsertUserData(fid, inputText, streak_num, total_xp, fullLanguage, fullLanguagefrom, joined_date);
        } catch (error) {
          console.error('Failed to upsert user data:', error);
        }
        
        // get streak rank
        const rankings = await displayRankings();
        const userRank = rankings.findIndex(rank => rank.username === inputText) + 1;

        // Prepare social media friendly card
        return c.res({ 
          image: (
                <Box grow backgroundColor="background" padding="32">
                  <HStack gap="4" alignHorizontal="space-between">
                    <VStack gap="4" alignHorizontal="left">
                      <Image src={avatar} width="128" height="128" />
                      <Text size="16" color="text">Duo username: {inputText}</Text>
                      <Text size="16" color="text">FarcasterID: {fid}</Text>
                      <Text size="16">Learning: {fullLanguage} {flagEmoji} from {fullLanguagefrom} {flagEmojiFrom}</Text>
                      <Text size="16">Streak Start: {formattedStartDate}</Text>
                      <Text size="16">Joined: {formatted_joined_date}</Text>
                    </VStack>
                    <VStack gap="4" alignHorizontal="right">
                      <Text size="32" color="FeatherGreen">Streak: {streak}</Text>
                      <Text size="32" color="Humpback">Total XP: {total_xp} 🌟</Text>
                      <Text size="24" color="Fox">Streak Rank: {userRank} of {rankings.length}</Text>
                      {(() => {
                        //console.log('streak num:', userRank);
                        //console.log('num', rankings.length);
                        const percentage = (userRank / rankings.length * 100);
                        let displayText = '';
                        if (percentage <= 0.1) {
                          displayText = 'Top 0.1% of Duolingo users on Farcaster! 🏆 ';
                        } else if (percentage <= 1) {
                          displayText = 'Top 1% of Duolingo users on Farcaster! 🥇';
                        } else if (percentage <= 5) {
                          displayText = 'Top 5% of Duolingo users on Farcaster! 🥈';
                        } else if (percentage <= 10) {
                          displayText = 'Top 10% of Duolingo users on Farcaster! 🥉';
                        }
                        return displayText ? <Text size="16" color="Fox">{displayText}</Text> : <></>;
                      })()}
                    </VStack>
                  </HStack>
                    <Text size="12" color="Cardinal">data as of {endDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
                </Box>
          )
        });
      } else {
        throw new Error('Bad response from server');
      }
    } catch (error) {
      console.error(error);
      const error_msg = `Stats not found for user ${inputText}`
      return c.res({
        image: (
          <Box grow alignVertical="center" backgroundColor="background" padding="32">
            <VStack gap="4">
              <Heading color="FeatherGreen"> Duolingo Streak </Heading>
              <Text size="20"> {error_msg}  </Text>
            </VStack>
          </Box>
        ),
        intents: [
          <Button action="/">Enter Username Again</Button>
        ]
      });
    }
  }
});

//devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);