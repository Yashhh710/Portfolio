import './VoiceToggle.css';

const VoiceToggle = ({ voiceEnabled, toggleVoice }) => {
  return (
    <button 
      className={`voice-toggle ${!voiceEnabled ? 'muted' : ''}`} 
      id="voice-toggle" 
      onClick={toggleVoice}
    >
      <span className="voice-dot" id="voice-dot"></span>
      <span id="voice-label">{voiceEnabled ? 'VOICE ON' : 'VOICE OFF'}</span>
    </button>
  );
};

export default VoiceToggle;
