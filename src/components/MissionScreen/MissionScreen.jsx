import CornerDecoration from '../Common/CornerDecoration';
import './MissionScreen.css';

const MissionScreen = ({ isActive, onAccept }) => {
  return (
    <div id="s-mission" className={`screen ${isActive ? 'active' : ''}`}>
      <CornerDecoration />
      <div className="mission-tag">▶ INCOMING MISSION</div>
      <div className="mission-title">YASH'S<br />PORTFOLIO</div>
      <div className="mission-sub">CLASSIFIED · CREATIVE · FRONTEND</div>
      <div className="mission-desc">
        Your task: <span>explore the digital universe</span> of Yash Tambade.<br />
        <span>6 portfolios</span> await — each a different world.<br />
        Choose wisely. Proceed with curiosity.
      </div>
      <button className="accept-btn" onClick={onAccept}>
        <span className="corner tl"></span><span className="corner tr"></span>
        <span className="corner bl"></span><span className="corner br"></span>
        ▶ ACCEPT MISSION
      </button>
    </div>
  );
};

export default MissionScreen;
