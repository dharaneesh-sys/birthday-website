import { useState, useEffect } from 'react';
import { CustomLoader } from './components/loader/CustomLoader';
import Hero from './components/landing/Hero';
import Chapter1Timeline from './components/chapters/Chapter1Timeline';
import Chapter2Gallery from './components/chapters/Chapter2Gallery';
import Chapter3Amazing from './components/chapters/Chapter3Amazing';
import Chapter4Memories from './components/chapters/Chapter4Memories';
import Chapter5Music from './components/chapters/Chapter5Music';
import Chapter6Letters from './components/chapters/Chapter6Letters';
import Chapter7Wishes from './components/chapters/Chapter7Wishes';
import Chapter8BucketList from './components/chapters/Chapter8BucketList';
import Chapter9Quiz from './components/chapters/Chapter9Quiz';
import Chapter100Things from './components/chapters/Chapter100Things';
import FinalSurprise from './components/final/FinalSurprise';
import CursorTrail from './components/effects/CursorTrail';
import FloatingStars from './components/effects/FloatingStars';
import EasterEggs from './components/easter-eggs/EasterEggs';
import DayCounter from './components/widgets/DayCounter';
import WeatherWidget from './components/widgets/WeatherWidget';
import ScratchCard from './components/widgets/ScratchCard';

function App() {
  const [phase, setPhase] = useState<'loading' | 'hero' | 'chapters'>('loading');
  const [currentChapter, setCurrentChapter] = useState(0);

  const chapters = [
    { id: 'chapter-1', label: 'Where It All Started' },
    { id: 'chapter-2', label: 'Moments We Never Wanted To End' },
    { id: 'chapter-3', label: "Reasons You're Amazing" },
    { id: 'chapter-4', label: 'Our Favourite Memories' },
    { id: 'chapter-5', label: 'Music That Reminds Me Of You' },
    { id: 'chapter-6', label: 'Open When' },
    { id: 'chapter-7', label: 'Birthday Wishes' },
    { id: 'chapter-8', label: 'Future Adventures' },
    { id: 'chapter-9', label: 'Fun Quiz' },
    { id: 'chapter-10', label: '100 Things' },
  ];

  useEffect(() => {
    if (phase === 'chapters') document.body.style.overflow = 'auto';
  }, [phase]);

  return (
    <div className="relative">
      {phase === 'loading' && <CustomLoader onComplete={() => setPhase('hero')} />}
      {phase === 'hero' && <Hero onBegin={() => setPhase('chapters')} />}
      {phase === 'chapters' && (
        <div>
          <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F8F5EF]/80 backdrop-blur-md border-b border-[#E7D7C1]/30">
            <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-2">
              <span className="font-serif text-[#C8A46B] text-xs sm:text-sm tracking-widest uppercase shrink-0">
                Chapter {currentChapter + 1}
              </span>
              <div className="flex gap-1 overflow-x-auto max-w-[55vw] sm:max-w-[60vw] scrollbar-hide">
                {chapters.map((ch, i) => (
                  <button key={ch.id} onClick={() => { setCurrentChapter(i); document.getElementById(ch.id)?.scrollIntoView({ behavior: 'smooth' }); }}
                    className={`min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0 ${i === currentChapter ? 'text-[#C8A46B]' : 'text-[#C8A46B]/30'}`}
                    aria-label={ch.label}
                  >
                    <span className={`block rounded-full transition-all ${i === currentChapter ? 'w-3 h-3 bg-[#C8A46B]' : 'w-2 h-2 bg-[#C8A46B]/30'}`} />
                  </button>
                ))}
              </div>
            </div>
          </nav>
          <section id="chapter-1" className="min-h-screen pt-16">
            <Chapter1Timeline />
          </section>
          <section id="chapter-2" className="min-h-screen">
            <Chapter2Gallery />
          </section>
          <section id="chapter-3" className="min-h-screen">
            <Chapter3Amazing />
          </section>
          <section id="chapter-4" className="min-h-screen">
            <Chapter4Memories />
          </section>
          <section id="chapter-5" className="min-h-screen">
            <Chapter5Music />
          </section>
          <section id="chapter-6" className="min-h-screen">
            <Chapter6Letters />
          </section>
          <section id="chapter-7" className="min-h-screen">
            <Chapter7Wishes />
          </section>
          <section id="chapter-8" className="min-h-screen">
            <Chapter8BucketList />
          </section>
          <section id="chapter-9" className="min-h-screen">
            <Chapter9Quiz />
          </section>
          <section id="chapter-10" className="min-h-screen">
            <Chapter100Things />
          </section>
          <FinalSurprise />
          <section id="bonus" className="min-h-screen bg-[#F8F5EF] py-16 sm:py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#C8A46B] mb-2">Little Extras</h2>
              <p className="font-serif italic text-[#6B6B6B] text-sm sm:text-base mb-8 sm:mb-12">Thoughtful touches, just for you</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
                <DayCounter />
                <WeatherWidget />
                <ScratchCard />
              </div>
            </div>
          </section>
        </div>
      )}
      <CursorTrail />
      <FloatingStars />
      <EasterEggs />
    </div>
  );
}

export default App;
