import { useState, useRef, useCallback } from 'react';
import './Chapter5Music.css';

/* ───────────────────────────────────────────
   Constants
   ─────────────────────────────────────────── */
const AUDIO_SRC =
  '/music/favourite-track/_Ninaithu_Ninaithu_Parthen_Female_Version_Tamil_Ringtone_(by Fringster.com).mp3';

const VISUALIZER_BAR_COUNT = 48;

/* ───────────────────────────────────────────
   Component
   ─────────────────────────────────────────── */
function Chapter5Music() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  /* ── Play / Pause ── */
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  /* ── Mute / Unmute ── */
  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  }, []);

  /* ── Audio event handlers ── */
  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  /* ── Helpers ── */
  const formatTime = (s: number) => {
    if (!s || !isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="ch5-section">
      {/* ── Ambient glow ── */}
      <div className="ch5-glow" aria-hidden="true" />

      {/* ── Heading ── */}
      <div className="ch5-heading-wrapper">
        <span className="ch5-ornament" aria-hidden="true">&#9835;</span>
        <h2 className="ch5-heading">Music That Reminds Me Of You</h2>
        <p className="ch5-subtitle">Every note carries a memory of us</p>
      </div>

      {/* ── Player ── */}
      <div className="ch5-player">
        {/* ── Turntable ── */}
        <div className="ch5-turntable">
          <div className="ch5-platter">
            {/* Vinyl record */}
            <div
              className={`ch5-vinyl${isPlaying ? ' ch5-spinning' : ''}`}
              aria-label={isPlaying ? 'Record spinning' : 'Record stopped'}
            >
              {/* Grooves */}
              <div className="ch5-grooves" aria-hidden="true" />
              {/* Light reflection sheen */}
              <div className="ch5-sheen" aria-hidden="true" />
              {/* Center label / album art */}
              <div className="ch5-label">
                <span className="ch5-label-text">IB</span>
                <span className="ch5-label-sub">19</span>
              </div>
            </div>

            {/* Spindle */}
            <div className="ch5-spindle" aria-hidden="true" />
          </div>

          {/* ── Tonearm ── */}
          <div
            className={`ch5-tonearm${isPlaying ? ' ch5-tonearm-down' : ''}`}
            aria-hidden="true"
          >
            <div className="ch5-tonearm-base" />
            <div className="ch5-tonearm-arm">
              <div className="ch5-tonearm-head" />
            </div>
          </div>
        </div>

        {/* ── Controls Panel ── */}
        <div className="ch5-panel">
          {/* Track info */}
          <div className="ch5-track-info">
            <h3 className="ch5-track-title">Ninaithu Ninaithu</h3>
            <p className="ch5-track-artist">
              Parthen &mdash; <em>Female Version</em>
            </p>
            <span className="ch5-track-lang">Tamil</span>
          </div>

          {/* Visualizer */}
          <div
            className="ch5-visualizer"
            aria-label="Music visualizer"
            role="presentation"
          >
            {Array.from({ length: VISUALIZER_BAR_COUNT }).map((_, i) => (
              <div
                key={i}
                className={`ch5-bar${isPlaying ? ' ch5-bar-active' : ''}`}
                style={{ '--bar-i': i } as React.CSSProperties}
              />
            ))}
          </div>

          {/* Progress */}
          <div className="ch5-progress">
            <span className="ch5-time">{formatTime(currentTime)}</span>
            <div
              className="ch5-progress-track"
              style={{ '--progress': `${progressPct}%` } as React.CSSProperties}
            >
              <div
                className="ch5-progress-fill"
                style={{ width: `${progressPct}%` }}
              />
              <input
                type="range"
                className="ch5-progress-input"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Seek audio"
              />
            </div>
            <span className="ch5-time">{formatTime(duration)}</span>
          </div>

          {/* Action buttons */}
          <div className="ch5-actions">
            <button
              className="ch5-play-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              type="button"
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
                  <polygon points="7,4 20,12 7,20" />
                </svg>
              )}
            </button>

            <button
              className="ch5-mute-btn"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              type="button"
            >
              {isMuted ? (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="22" y1="9" x2="16" y2="15" />
                  <line x1="16" y1="9" x2="22" y2="15" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Hidden audio element ── */}
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
    </section>
  );
}

export default Chapter5Music;
