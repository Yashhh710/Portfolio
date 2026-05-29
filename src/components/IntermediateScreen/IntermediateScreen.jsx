import CornerDecoration from '../Common/CornerDecoration';
import './IntermediateScreen.css';

const IntermediateScreen = ({ isActive }) => {
  return (
    <div id="s-intermediate" className={`screen ${isActive ? 'active' : ''}`}>
      <div className="load-grid"></div>
      <div className="load-vignette"></div>
      <CornerDecoration />
      <div className="load-content">
        <div className="load-glyph" data-text="LOADING">LOADING</div>
        <div className="load-ring" style={{ marginTop: '2rem' }}></div>
        <div className="load-label">ACCESSING MISSION DATABASE</div>
      </div>
    </div>
  );
};

export default IntermediateScreen;
