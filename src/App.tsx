import HeroSection from './components/HeroSection';
import MemoriesSection from './components/MemoriesSection';
import MusicPlayer from './components/MusicPlayer';
import MessageSection from './components/MessageSection';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <HeroSection />
      <MemoriesSection />
      <MusicPlayer />
      <MessageSection />
      <Guestbook />
      <Footer />
    </div>
  );
}

export default App;
