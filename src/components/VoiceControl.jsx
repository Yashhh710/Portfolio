import { useVoice } from './VoiceContext';

function VoiceControl() {
  const { voiceEnabled, toggleVoice } = useVoice();

  return (
    <button className={`voice-toggle ${!voiceEnabled ? 'muted' : ''}`} onClick={toggleVoice}>
      <span className="voice-dot"></span>
      <span id="voice-label">{voiceEnabled ? 'VOICE ON' : 'VOICE OFF'}</span>
    </button>
  );
}

export default VoiceControl;
