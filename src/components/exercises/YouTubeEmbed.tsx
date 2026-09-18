'use client';

import { useState } from 'react';
import { Play, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface YouTubeEmbedProps {
  url?: string | null;
  title?: string;
  autoplay?: boolean;
}

export function getYouTubeEmbedUrl(url?: string | null): string {
  const defaultVideoId = '8fXfwG4ftaQ';
  if (!url) return `https://www.youtube.com/embed/${defaultVideoId}`;

  // Handle YouTube Shorts (e.g. youtube.com/shorts/8fXfwG4ftaQ)
  if (url.includes('/shorts/')) {
    const id = url.split('/shorts/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${id || defaultVideoId}`;
  }

  // Handle standard watch?v= (e.g. youtube.com/watch?v=VIDEO_ID)
  if (url.includes('v=')) {
    const id = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${id || defaultVideoId}`;
  }

  // Handle short link (e.g. youtu.be/VIDEO_ID)
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${id || defaultVideoId}`;
  }

  // Fallback to demo video ID
  return `https://www.youtube.com/embed/${defaultVideoId}`;
}

export function YouTubeEmbed({ url, title = 'Exercise Demonstration Video' }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = getYouTubeEmbedUrl(url);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-card border border-border shadow-xl group aspect-video max-w-sm mx-auto">
      {!isPlaying ? (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4 bg-card">
          <div className="p-4 rounded-full bg-primary/20 text-primary border border-primary/30 mb-2 group-hover:scale-110 transition-transform gym-glow">
            <Video className="w-7 h-7" />
          </div>
          <span className="text-xs font-black text-foreground mb-3 text-center">{title}</span>

          <Button
            size="sm"
            onClick={() => setIsPlaying(true)}
            className="gap-2 font-black text-xs h-9 px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
          >
            <Play className="w-4 h-4 fill-current" />
            Watch Demo Video
          </Button>
        </div>
      ) : (
        <iframe
          src={`${embedUrl}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      )}
    </div>
  );
}
