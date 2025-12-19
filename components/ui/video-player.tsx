'use client';

import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';

interface VideoPlayerProps {
  src: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        fluid: true,
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        sources: [
          {
            src,
            type: 'application/x-mpegURL',
          },
        ],
      });
    } else if (playerRef.current) {
      playerRef.current.src({
        src,
        type: 'application/x-mpegURL',
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>
    </div>
  );
}
