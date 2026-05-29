import { useState } from 'react';
import { useVoice } from './VoiceContext';
import VideoScreen from './VideoScreen';
import IntermediateScreen from './IntermediateScreen';
import MissionScreen from './MissionScreen';
import CardsScreen from './CardsScreen';
import LoadingScreen from './LoadingScreen';

function ScreenManager() {
  const [currentScreen, setCurrentScreen] = useState('s-video');
  const [deployTarget, setDeployTarget] = useState({ name: '', url: '' });
  const { speak } = useVoice();

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
      <VideoScreen isActive={currentScreen === 's-video'} onComplete={handleVideoComplete} />
      <IntermediateScreen isActive={currentScreen === 's-intermediate'} />
      <MissionScreen isActive={currentScreen === 's-mission'} onAccept={handleAcceptMission} />
      <CardsScreen isActive={currentScreen === 's-cards'} onLaunch={launchPortfolio} />
      <LoadingScreen isActive={currentScreen === 's-loading'} targetName={deployTarget.name} onComplete={onDeployComplete} />
    </>
  );
}

export default ScreenManager;
