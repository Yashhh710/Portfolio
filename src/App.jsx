import React, { useState } from 'react';
import VideoScreen from './components/VideoScreen';
import IntermediateScreen from './components/IntermediateScreen';
import MissionScreen from './components/MissionScreen';
import CardsScreen from './components/CardsScreen';
import LoadingScreen from './components/LoadingScreen';
import VoiceControl from './components/VoiceControl';

function App() {
  const [currentScreen, setCurrentScreen] = useState('s-video');
  const [deployTarget, setDeployTarget] = useState({ name: '', url: '' });

  const handleVideoComplete = () => {
    setCurrentScreen('s-intermediate');
    setTimeout(() => setCurrentScreen('s-mission'), 2500);
  };

  const handleAcceptMission = () => setCurrentScreen('s-cards');

  const launchPortfolio = (name, url) => {
    setDeployTarget({ name, url });
    setCurrentScreen('s-loading');
  };

  const onDeployComplete = () => {
    window.open(deployTarget.url, '_blank');
    setTimeout(() => setCurrentScreen('s-cards'), 1400);
  };

  return (
    <>
      <VoiceControl />
      <VideoScreen isActive={currentScreen === 's-video'} onComplete={handleVideoComplete} />
      <IntermediateScreen isActive={currentScreen === 's-intermediate'} />
      <MissionScreen isActive={currentScreen === 's-mission'} onAccept={handleAcceptMission} />
      <CardsScreen isActive={currentScreen === 's-cards'} onLaunch={launchPortfolio} />
      <LoadingScreen isActive={currentScreen === 's-loading'} targetName={deployTarget.name} onComplete={onDeployComplete} />
    </>
  );
}

export default App;
