import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './Chapter9Quiz.css';

/* ───────────────────────────────────────────
   Types
   ─────────────────────────────────────────── */
interface Question {
  id: number;
  text: string;
  options: [string, string, string];
  correct: number; // index into options
}

interface QuestionResult {
  selected: number;
  correct: boolean;
}

/* ───────────────────────────────────────────
   Data
   ─────────────────────────────────────────── */
const questions: Question[] = [
  {
    id: 1,
    text: 'Who eats more?',
    options: ['You', 'Me', 'Both equal'],
    correct: 2,
  },
  {
    id: 2,
    text: 'Who is always late?',
    options: ['You', 'Me', 'Both on time'],
    correct: 1,
  },
  {
    id: 3,
    text: 'Who talks more?',
    options: ['You', 'Me', 'Both equally'],
    correct: 0,
  },
  {
    id: 4,
    text: 'Who is more stubborn?',
    options: ['You', 'Me', 'Both'],
    correct: 2,
  },
  {
    id: 5,
    text: 'Who laughs more?',
    options: ['You', 'Me', 'Both the same'],
    correct: 0,
  },
];

/* ── Funny messages ── */
const wrongMessages = [
  'Nope! Try again 😄',
  'Not quite! Give it another shot 😅',
  'Haha, nice try! Guess again 😄',
  'Close, but no cigar! Try once more 😊',
  'Ooh, so close! Try again 🙈',
  'Not today! Have another go 😄',
];

const correctMessages = [
  'You know me so well! 🎉',
  'Spot on! 🎉',
  'Nailed it! 🎉',
  'Perfect! You really know me 😍',
  'Correctomundo! 🎉',
  'Bullseye! 🎯',
];

const finalMessages = [
  'You absolutely crushed it! You know me better than I know myself! ⭐',
  'Amazing score! We really are on the same wavelength! 🌟',
  'Look at you go! You really pay attention — you\'re awesome! ⭐',
  'Great job! You know us so well! 🌟',
];

/* ── Helpers ── */
const pickRandom = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

/* ── Cubic bezier helper (avoids tuple type issues with framer-motion v12) ── */
const easeOut = [0.25, 0.1, 0.25, 1] as const;

/* ── Animation variants ── */
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.94,
    transition: { duration: 0.35, ease: easeOut },
  },
};

const scoreCardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easeOut, delay: 0.15 },
  },
};

/* ───────────────────────────────────────────
   Component
   ─────────────────────────────────────────── */
function Chapter9Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong'; message: string } | null>(null);
  const [finished, setFinished] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const qRef = useRef<HTMLDivElement>(null);

  /* Cleanup timer on unmount */
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  /* ── Fire confetti burst ── */
  const fireConfetti = useCallback(() => {
    const duration = 1200;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        startVelocity: 28,
        spread: 60,
        origin: { x: Math.random(), y: Math.random() * 0.4 + 0.3 },
        colors: ['#C8A46B', '#E0C99A', '#F4D6CC', '#2B2B2B', '#F8F5EF'],
        zIndex: 9999,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  /* ── Fire celebration confetti ── */
  const fireCelebration = useCallback(() => {
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        startVelocity: 35,
        spread: 90,
        origin: { x: Math.random(), y: Math.random() * 0.3 + 0.2 },
        colors: ['#C8A46B', '#E0C99A', '#F4D6CC', '#FFD700'],
        zIndex: 9999,
      });
      confetti({
        particleCount: 3,
        startVelocity: 20,
        spread: 120,
        origin: { x: Math.random(), y: Math.random() * 0.5 + 0.2 },
        colors: ['#FF6B6B', '#4ECDC4', '#FFE66D'],
        zIndex: 9999,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  /* ── Handle option click ── */
  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (feedback !== null) return; // already answered
      setSelectedOption(optionIndex);

      const isCorrect = optionIndex === questions[currentQ].correct;

      if (isCorrect) {
        const msg = pickRandom(correctMessages);
        setFeedback({ type: 'correct', message: msg });
        fireConfetti();

        // Auto-advance after delay
        timerRef.current = setTimeout(() => {
          setResults((prev) => [...prev, { selected: optionIndex, correct: true }]);
          setSelectedOption(null);
          setFeedback(null);

          if (currentQ < questions.length - 1) {
            setCurrentQ((prev) => prev + 1);
          } else {
            // Quiz done, show score after a beat
            setFinished(true);
            setTimeout(() => setShowScore(true), 400);
            setTimeout(fireCelebration, 600);
          }
        }, 1400);
      } else {
        const msg = pickRandom(wrongMessages);
        setFeedback({ type: 'wrong', message: msg });

        // Reset after shake
        timerRef.current = setTimeout(() => {
          setSelectedOption(null);
          setFeedback(null);
        }, 800);
      }
    },
    [currentQ, feedback, fireConfetti, fireCelebration],
  );

  /* ── Score screen ── */
  if (finished && showScore) {
    const score = results.filter((r) => r.correct).length;
    const finalMsg = pickRandom(finalMessages);

    return (
      <section className="ch9-section">
        <div className="ch9-glow" aria-hidden="true" />
        <div className="ch9-score-wrapper">
          <motion.div
            className="ch9-score-card"
            variants={scoreCardVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Ornament */}
            <span className="ch9-score-ornament" aria-hidden="true">
              &#9733;
            </span>

            {/* Score */}
            <div className="ch9-score-number">
              <span className="ch9-score-value">{score}</span>
              <span className="ch9-score-divider">/</span>
              <span className="ch9-score-total">{questions.length}</span>
            </div>
            <p className="ch9-score-label">Score</p>

            {/* Individual results */}
            <div className="ch9-score-details">
              {results.map((r, i) => (
                <span
                  key={i}
                  className={`ch9-score-dot ${r.correct ? 'ch9-score-dot--correct' : 'ch9-score-dot--wrong'}`}
                  title={`Q${i + 1}: ${r.correct ? 'Correct' : 'Wrong'}`}
                  aria-label={`Question ${i + 1}: ${r.correct ? 'Correct' : 'Wrong'}`}
                >
                  {r.correct ? '✓' : '✗'}
                </span>
              ))}
            </div>

            {/* Message */}
            <p className="ch9-score-message">{finalMsg}</p>

            {/* Restart button */}
            <button
              className="ch9-restart-btn"
              onClick={() => {
                setCurrentQ(0);
                setResults([]);
                setSelectedOption(null);
                setFeedback(null);
                setFinished(false);
                setShowScore(false);
              }}
              type="button"
            >
              Play Again
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ── Quiz in progress ── */
  const question = questions[currentQ];
  const isWrong = feedback?.type === 'wrong';

  return (
    <section className="ch9-section">
      {/* Ambient glow */}
      <div className="ch9-glow" aria-hidden="true" />

      {/* ── Heading ── */}
      <div className="ch9-heading-wrapper">
        <span className="ch9-ornament" aria-hidden="true">&#x2E19;</span>
        <h2 className="ch9-heading">How Well Do You Know Us?</h2>
        <p className="ch9-subtitle">A little fun quiz to test your memory</p>
      </div>

      {/* ── Progress dots ── */}
      <div className="ch9-progress-dots" role="progressbar" aria-label="Quiz progress" aria-valuenow={currentQ} aria-valuemin={0} aria-valuemax={questions.length}>
        {questions.map((q, i) => {
          const done = results[i] !== undefined;
          const active = i === currentQ;
          const correct = done && results[i].correct;
          const wrong = done && !results[i].correct;
          return (
            <div
              key={q.id}
              className={[
                'ch9-dot',
                active && !done ? 'ch9-dot--active' : '',
                correct ? 'ch9-dot--correct' : '',
                wrong ? 'ch9-dot--wrong' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-label={`Question ${i + 1}: ${correct ? 'Correct' : wrong ? 'Wrong' : active ? 'Active' : 'Pending'}`}
            >
              <span className="ch9-dot-inner" />
            </div>
          );
        })}
      </div>

      {/* ── Question card ── */}
      <div className="ch9-card-wrapper" ref={qRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            className="ch9-card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            {/* Question */}
            <p className="ch9-question-text">{question.text}</p>

            {/* Options */}
            <div className="ch9-options">
              {question.options.map((opt, i) => {
                const isSelected = selectedOption === i;
                const isCorrectOption = i === question.correct;
                const showFeedback = feedback !== null;
                const optionCorrect = showFeedback && isCorrectOption && feedback.type === 'correct';
                const optionWrong = showFeedback && isSelected && feedback.type === 'wrong';

                return (
                  <motion.button
                    key={i}
                    className={[
                      'ch9-option',
                      optionCorrect ? 'ch9-option--correct' : '',
                      optionWrong ? 'ch9-option--wrong' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => handleSelect(i)}
                    disabled={feedback !== null}
                    type="button"
                    aria-label={`Option ${i + 1}: ${opt}`}
                    animate={optionWrong ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
                    transition={optionWrong ? { duration: 0.45, ease: 'easeInOut' } : { duration: 0.2 }}
                    whileTap={!feedback ? { scale: 0.96 } : undefined}
                  >
                    <span className="ch9-option-letter">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="ch9-option-text">{opt}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback message */}
            <AnimatePresence>
              {feedback && (
                <motion.p
                  className={`ch9-feedback ch9-feedback--${feedback.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {feedback.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Progress text ── */}
      <p className="ch9-counter">
        Question {currentQ + 1} of {questions.length}
      </p>
    </section>
  );
}

export default Chapter9Quiz;
