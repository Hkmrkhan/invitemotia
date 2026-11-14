import { useState, useEffect, useRef, useCallback } from 'react';

export function useSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const bgMusicRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/assets/music/music.mp3');
    audio.loop = true;
    audio.volume = 0.55;
    bgMusicRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const startMusic = useCallback(() => {
    if (bgMusicRef.current && !isPlaying) {
      bgMusicRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy prevented playback until user interaction
      });
    }
  }, [isPlaying]);

  const toggleSound = useCallback(() => {
    if (!bgMusicRef.current) return;
    if (isMuted) {
      bgMusicRef.current.muted = false;
      setIsMuted(false);
      if (bgMusicRef.current.paused) {
        bgMusicRef.current.play();
        setIsPlaying(true);
      }
    } else {
      bgMusicRef.current.muted = true;
      setIsMuted(true);
    }
  }, [isMuted]);

  const playSfx = useCallback((type) => {
    const sfxMap = {
      part: '/assets/cover/sfx-part.mp3',
      shimmer: '/assets/cover/sfx-shimmer.mp3',
      tink: '/assets/cover/sfx-tink.mp3',
      plop: '/assets/hero/sfx-plop.mp3',
      write: '/assets/hero/sfx-write.mp3',
      fold: '/assets/letter/sfx-fold.mp3',
      fold2: '/assets/letter/sfx-fold2.mp3',
      chime: '/assets/letter/sfx-chime.mp3',
      rise: '/assets/letter/sfx-rise.mp3',
      light: '/assets/families/sfx-light.mp3',
      join: '/assets/families/sfx-join.mp3',
    };

    const src = sfxMap[type];
    if (src) {
      const sfx = new Audio(src);
      sfx.volume = 0.7;
      sfx.play().catch(() => {});
    }
  }, []);

  return {
    isPlaying,
    isMuted,
    startMusic,
    toggleSound,
    playSfx,
  };
}

