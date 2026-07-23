import { useState, useEffect, useRef } from 'react';
import './CustomLoader.css';

export interface CustomLoaderProps {
  /** Called after progress reaches 100% and exit animation completes */
  onComplete: () => void;
}

const MESSAGES = [
  'Opening Memories...',
  'Loading Happiness...',
  'Finding Beautiful Moments...',
  'Preparing Something Special...',
];

const MSG_INTERVAL = 1200;
const PROGRESS_DURATION = 5000;
const FADE_DURATION = 300;
const EXIT_DURATION = 600;

export function CustomLoader({ onComplete }: CustomLoaderProps) {
  const [started, setStarted] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [exiting, setExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);

  // Keep ref in sync so the timeout closure always gets the latest onComplete
  onCompleteRef.current = onComplete;

  // Trigger progress bar CSS transition on mount
  useEffect(() => {
    setStarted(true);
  }, []);

  // Handle progress completion → exit → onComplete
  useEffect(() => {
    if (!started) return;

    const timer = setTimeout(() => {
      setExiting(true);
      // Wait for exit fade animation, then signal parent
      setTimeout(() => onCompleteRef.current(), EXIT_DURATION + 50);
    }, PROGRESS_DURATION);

    return () => clearTimeout(timer);
  }, [started]);

  // Cycle through messages with fade transitions
  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
        setFading(false);
      }, FADE_DURATION);
    }, MSG_INTERVAL);

    return () => clearInterval(interval);
  }, [started]);

  return (
    <div className={`loader${exiting ? ' loader--exit' : ''}`}>
      <div className="loader__inner">
        <p
          className={`loader__message${fading ? ' loader__message--fade' : ''}`}
        >
          {MESSAGES[msgIndex]}
        </p>
        <div className="loader__track">
          <div
            className="loader__bar"
            style={{ width: started ? '100%' : '0%' }}
          />
        </div>
      </div>
    </div>
  );
}
