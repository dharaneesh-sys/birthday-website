import { useState, useRef, useCallback, useEffect } from 'react';
import './MusicPlayer.css';

/* ─── Audio source (URL-encoded path) ────────────────── */

const AUDIO_SRC =
  '/music/favourite-track/_Ninaithu_Ninaithu_Parthen_Female_Version_Tamil_Ringtone_(by%20Fringster.com).mp3';

/* ─── Inline SVG Icons ────────────────────────────────── */

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function MusicNoteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

/* ─── Helper ──────────────────────────────────────────── */

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ─── Component ───────────────────────────────────────── */

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  /* ── Toggle play/pause ────────────────────────────── */

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || error) return;

    if (audio.paused) {
      audio.play().catch(() => {
        setError('Audio unavailable');
        setIsPlaying(false);
      });
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [error]);

  /* ── Audio event handlers ─────────────────────────── */

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (audio) setCurrentTime(audio.currentTime);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (audio && isFinite(audio.duration)) setDuration(audio.duration);
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const handleError = useCallback(() => {
    setError('Audio unavailable');
    setIsPlaying(false);
  }, []);

  /* ── Keyboard shortcut (Space to toggle) ──────────── */

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay]);

  /* ── Progress ─────────────────────────────────────── */

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  /* ── Render ───────────────────────────────────────── */

  return (
    <section className="music-player" aria-label="Music player">
      <h2 className="music-player__heading">Her Favorite Track</h2>
      <p className="music-player__subtitle">A song that feels like her</p>

      <div className="music-player__card">
        {/* Album art placeholder */}
        <div className="music-player__art">
          <MusicNoteIcon />
        </div>

        {/* Track info */}
        <div className="music-player__info">
          <h3 className="music-player__track-name">
            Ninaithu Ninaithu Parthen
          </h3>
          <p className="music-player__artist">
            Tamil Ringtone &middot; Female Version
          </p>
        </div>

        {/* Controls */}
        {error ? (
          <p className="music-player__error">{error}</p>
        ) : (
          <>
            <button
              className="music-player__play-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              type="button"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            {/* Progress bar */}
            <div className="music-player__progress">
              <div className="music-player__progress-track">
                <div
                  className="music-player__progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="music-player__progress-time">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </>
        )}

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={AUDIO_SRC}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          onError={handleError}
        />
      </div>
    </section>
  );
}
