// Twitter API service for fetching tweets
import { TweetData } from '../types/twitter';

// Twitter API base URL - Twitter API v2 endpoint
const TWITTER_API_URL = 'https://api.twitter.com/2';

// Default username from environment variables
const DEFAULT_TWITTER_USERNAME = import.meta.env.VITE_TWITTER_USERNAME || 'garethhaagman';

/**
 * Get the Twitter API bearer token from environment variables
 * @returns The bearer token for Twitter API authentication
 */
const getBearerToken = (): string => {
  const token = import.meta.env.VITE_TWITTER_BEARER_TOKEN;
  if (!token) {
    console.warn('Twitter Bearer Token is not set in environment variables');
  }
  return token;
};

/**
 * Fetch recent tweets from a specific Twitter user
 * @param username The Twitter username to fetch tweets for
 * @param count Number of tweets to fetch
 * @returns Array of tweet data
 * @throws Error if the API call fails
 */
export const fetchUserTweets = async (
  username: string = DEFAULT_TWITTER_USERNAME, 
  count: number = 5
): Promise<TweetData[]> => {
  try {
    console.log('Fetching tweets for:', username);
    const bearerToken = getBearerToken();
    
    if (!bearerToken) {
      throw new Error('Twitter API credentials not configured');
    }
    
    // First, we need to get the user ID from the username
    console.log(`Fetching user ID for username: ${username}`);
    const userResponse = await fetch(
      `${TWITTER_API_URL}/users/by/username/${username}?user.fields=id,name,username`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      }
    );
    
    // Log detailed response for debugging
    console.log('User lookup status:', userResponse.status);
    const responseText = await userResponse.text();
    
    if (!userResponse.ok) {
      console.error('User lookup failed:', responseText);
      throw new Error(`Failed to find Twitter user: ${username} (${userResponse.status})`);
    }
    
    // Parse the response text into JSON
    let userData;
    try {
      userData = JSON.parse(responseText);
      console.log('User data:', userData);
    } catch (e) {
      console.error('Failed to parse user response:', e);
      throw new Error('Invalid response from Twitter API');
    }
    
    if (!userData.data || !userData.data.id) {
      throw new Error(`Twitter user not found: ${username}`);
    }
    
    const userId = userData.data.id;
    console.log('User ID:', userId);
    
    // Now fetch the user's tweets using their ID
    // Using a smaller count to avoid rate limits
    const actualCount = Math.min(count, 5);
    console.log(`Fetching ${actualCount} tweets for user ID: ${userId}`);
    
    const tweetsResponse = await fetch(
      `${TWITTER_API_URL}/users/${userId}/tweets?max_results=${actualCount}&tweet.fields=created_at,public_metrics&exclude=retweets,replies`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      }
    );
    
    // Log detailed response for debugging
    console.log('Tweets lookup status:', tweetsResponse.status);
    const tweetsResponseText = await tweetsResponse.text();
    
    if (!tweetsResponse.ok) {
      console.error('Tweets lookup failed:', tweetsResponseText);
      throw new Error(`Failed to fetch tweets: ${tweetsResponse.status}`);
    }
    
    // Parse the response text into JSON
    let tweetsData;
    try {
      tweetsData = JSON.parse(tweetsResponseText);
      console.log('Tweets data:', tweetsData);
    } catch (e) {
      console.error('Failed to parse tweets response:', e);
      throw new Error('Invalid response from Twitter API');
    }
    
    // Handle case where user has no tweets
    if (!tweetsData.data) {
      console.log('No tweets found for this user');
      return [];
    }
    
    // Handle case where data isn't an array
    if (!Array.isArray(tweetsData.data)) {
      console.log('Unexpected response format - data is not an array');
      return [];
    }
    
    return tweetsData.data.map((tweet: any) => ({
      id: tweet.id,
      text: tweet.text,
      created_at: tweet.created_at || new Date().toISOString(),
      public_metrics: tweet.public_metrics || {
        retweet_count: 0,
        reply_count: 0,
        like_count: 0,
        quote_count: 0
      }
    }));
  } catch (error) {
    console.error('Error fetching tweets:', error);
    throw error; // Re-throw to allow component to handle error
  }
};

/**
 * Fetch a specific tweet by ID
 * @param id The tweet ID to fetch
 * @returns Tweet data or null if not found
 */
export const fetchTweetById = async (id: string): Promise<TweetData | null> => {
  try {
    const bearerToken = getBearerToken();
    
    if (!bearerToken) {
      throw new Error('Twitter API credentials not configured');
    }
    
    const response = await fetch(
      `${TWITTER_API_URL}/tweets/${id}?tweet.fields=created_at,public_metrics`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Tweet lookup failed:', errorText);
      throw new Error(`Failed to fetch tweet: ${response.status}`);
    }
    
    const responseText = await response.text();
    let data;
    
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse tweet response:', e);
      throw new Error('Invalid response from Twitter API');
    }
    
    if (!data.data) {
      return null;
    }
    
    return {
      id: data.data.id,
      text: data.data.text,
      created_at: data.data.created_at || new Date().toISOString(),
      public_metrics: data.data.public_metrics || {
        retweet_count: 0,
        reply_count: 0,
        like_count: 0,
        quote_count: 0
      }
    };
  } catch (error) {
    console.error('Error fetching tweet by ID:', error);
    throw error; // Re-throw to allow component to handle error
  }
}; 