import PortfolioCard from './PortfolioCard';
import { portfolios } from '../../data/portfolioData';
import './CardsScreen.css';

const CardsScreen = ({ isActive, onLaunch }) => {
  return (
    <div id="s-cards" className={`screen ${isActive ? 'active' : ''}`} style={{ justifyContent: 'flex-start', overflowY: 'auto', padding: 0 }}>
      <div className="cards-header">
        <h2>SELECT YOUR DESTINATION</h2>
        <p>// 6 PORTFOLIOS FOUND — CLICK TO DEPLOY</p>
      </div>
      <div className="cards-grid">
        {portfolios.map((port, index) => (
          <PortfolioCard key={port.id} data={port} index={index} onLaunch={onLaunch} />
        ))}
      </div>
    </div>
  );
};

export default CardsScreen;
