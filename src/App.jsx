import React from 'react';
import { VoiceProvider } from './components/VoiceContext';
import ScreenManager from './components/ScreenManager';
import VoiceControl from './components/VoiceControl';

function App() {
  return (
    <VoiceProvider>
      <VoiceControl />
      <ScreenManager />
    </VoiceProvider>
  );
}

export default App;
