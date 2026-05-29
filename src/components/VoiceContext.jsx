import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const VoiceContext = createContext();

export function VoiceProvider({ children }) {
  const [voiceEnabled, setVoiceEnabled] = useState(true);

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
    if (voiceEnabled) window.speechSynthesis.cancel();
    setVoiceEnabled(prev => !prev);
  };

  return (
    <VoiceContext.Provider value={{ voiceEnabled, speak, toggleVoice }}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  return useContext(VoiceContext);
}
