/**
 * Interface for Twitter metrics data
 */
export interface TweetMetrics {
  retweet_count: number;
  reply_count: number;
  like_count: number;
  quote_count: number;
}

/**
 * Interface for Tweet data structure
 */
export interface TweetData {
  id: string;
  text: string;
  created_at: string;
  public_metrics: TweetMetrics;
}

/**
 * Interface for Twitter API response
 */
export interface TwitterApiResponse {
  data: TweetData[];
  meta: {
    result_count: number;
    next_token?: string;
  };
} 