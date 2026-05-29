import React, { useState, useEffect, useCallback } from 'react';
import VideoScreen from './components/VideoScreen';
import IntermediateScreen from './components/IntermediateScreen';
import MissionScreen from './components/MissionScreen';
import CardsScreen from './components/CardsScreen';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('s-video');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [deployTarget, setDeployTarget] = useState({ name: '', url: '' });

  // Initialize Speech Synthesis Voices
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  const speak = useCallback((text, rate = 0.95, pitch = 0.85) => {
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
  }, [voiceEnabled]);

  const toggleVoice = () => {
    if (voiceEnabled) {
      window.speechSynthesis.cancel();
    }
    setVoiceEnabled(prev => !prev);
  };

  const handleVideoComplete = () => {
    setCurrentScreen('s-intermediate');
    speak("Loading mission database. Stand by.");
    setTimeout(() => {
      setCurrentScreen('s-mission');
      speak("Incoming mission. Welcome to Yash Tambade's portfolio. Six universes await. Choose wisely.");
    }, 2500);
  };

  const handleAcceptMission = () => {
    setCurrentScreen('s-cards');
    speak("Six portfolios detected. Select your destination.");
  };

  const launchPortfolio = (name, url) => {
    setDeployTarget({ name, url });
    setCurrentScreen('s-loading');
    speak(`Deploying ${name}. Initiating launch sequence.`);
  };

  const onDeployComplete = () => {
    speak("Launch successful. Redirecting now.");
    window.open(deployTarget.url, '_blank');
    setTimeout(() => setCurrentScreen('s-cards'), 1400);
  };

  return (
    <>
      <button className={`voice-toggle ${!voiceEnabled ? 'muted' : ''}`} onClick={toggleVoice}>
        <span className="voice-dot"></span>
        <span id="voice-label">{voiceEnabled ? 'VOICE ON' : 'VOICE OFF'}</span>
      </button>

      <VideoScreen 
        isActive={currentScreen === 's-video'} 
        onComplete={handleVideoComplete} 
      />
      <IntermediateScreen 
        isActive={currentScreen === 's-intermediate'} 
      />
      <MissionScreen 
        isActive={currentScreen === 's-mission'} 
        onAccept={handleAcceptMission} 
      />
      <CardsScreen 
        isActive={currentScreen === 's-cards'} 
        onLaunch={launchPortfolio} 
      />
      <LoadingScreen 
        isActive={currentScreen === 's-loading'} 
        targetName={deployTarget.name}
        onComplete={onDeployComplete}
      />
    </>
  );
}

export default App;
