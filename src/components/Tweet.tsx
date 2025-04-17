import { MessageCircle, Repeat, Heart, Share } from 'lucide-react';
import { TweetData } from '../types/twitter';

interface TweetProps {
  tweet: TweetData;
}

/**
 * Formats a date to a relative time string (e.g. "2h ago")
 */
const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds}s`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  
  // Format date in Pipboy style for older tweets
  return date.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit'
  }).replace(/\//g, '.');
};

const Tweet = ({ tweet }: TweetProps) => {
  const { text, created_at, public_metrics } = tweet;
  const username = import.meta.env.VITE_TWITTER_USERNAME || 'garethhaagman';
  
  return (
    <div className="border border-pipboy-shadow/30 rounded p-3 mb-3 bg-pipboy-shadow/10 hover:bg-pipboy-shadow/20 transition-colors">
      <div className="flex justify-between mb-1">
        <div className="font-bold text-pipboy-primary">@{username}</div>
        <div className="text-xs text-pipboy-amber">{formatRelativeTime(created_at)}</div>
      </div>
      
      <div className="my-2 text-sm">{text}</div>
      
      <div className="flex justify-between text-xs text-pipboy-shadow pt-2 border-t border-pipboy-shadow/20">
        <div className="flex items-center">
          <MessageCircle className="w-3 h-3 mr-1" />
          <span>{public_metrics.reply_count}</span>
        </div>
        <div className="flex items-center">
          <Repeat className="w-3 h-3 mr-1" />
          <span>{public_metrics.retweet_count}</span>
        </div>
        <div className="flex items-center">
          <Heart className="w-3 h-3 mr-1" />
          <span>{public_metrics.like_count}</span>
        </div>
        <div className="flex items-center">
          <Share className="w-3 h-3 mr-1" />
          <span>{public_metrics.quote_count}</span>
        </div>
      </div>
    </div>
  );
};

export default Tweet; 