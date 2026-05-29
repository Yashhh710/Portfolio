import { useState, useEffect } from 'react';
import VideoScreen from './components/VideoScreen/VideoScreen';
import VoiceToggle from './components/VoiceToggle/VoiceToggle';
import './App.css';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('s-video');
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  const speak = (text, rate = 0.95, pitch = 0.85) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate;
    u.pitch = pitch;
    u.volume = 1;
    
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      v.name.toLowerCase().includes('daniel') ||
      v.name.toLowerCase().includes('alex') ||
      v.name.toLowerCase().includes('google uk') ||
      v.name.toLowerCase().includes('male')
    );
    if (preferred) u.voice = preferred;
    window.speechSynthesis.speak(u);
  };

  const toggleVoice = () => {
    const newVoiceState = !voiceEnabled;
    setVoiceEnabled(newVoiceState);
    if (!newVoiceState) {
      window.speechSynthesis.cancel();
    }
  };

  const handleVideoComplete = () => {
    // Keep on video screen
    speak("Video playback complete.");
  };

  return (
    <>
      <VoiceToggle voiceEnabled={voiceEnabled} toggleVoice={toggleVoice} />
      
      <VideoScreen 
        isActive={activeScreen === 's-video'} 
        onComplete={handleVideoComplete} 
      />
    </>
  );
};

export default App;
