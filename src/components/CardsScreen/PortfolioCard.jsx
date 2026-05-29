import { useState } from 'react';

const PortfolioCard = ({ data, index, onLaunch }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div 
      className="port-card" 
      onClick={() => onLaunch(data.name, data.url)}
      style={{ animationDelay: `${0.05 + index * 0.07}s` }}
    >
      <div className={`card-img ${loaded || error ? 'img-loaded' : ''}`}>
        {!error ? (
          <img 
            src={data.image} 
            alt={data.title} 
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            style={error ? { display: 'none' } : {}}
          />
        ) : (
          <div style={{
            position:'absolute',inset:0,display:'flex',flexDirection:'column',
            alignItems:'center',justifyContent:'center',gap:'8px',zIndex:2
          }}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'2rem',letterSpacing:'4px',color:'rgba(0,255,136,0.2)'}}>
              {data.id}
            </div>
            <div style={{fontSize:'9px',color:'#333',letterSpacing:'3px'}}>SCREENSHOT UNAVAILABLE</div>
          </div>
        )}
        <div className="card-img-overlay"></div>
        <div className="card-badge">{data.badge || data.id}</div>
        <div className="card-scan"></div>
      </div>
      <div className="card-body">
        <div className="card-num">{data.num}</div>
        <div className="card-title">{data.title}</div>
        <div className="card-desc">{data.desc}</div>
        <div className="card-tags">
          {data.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <div className="card-action"><span className="arrow">→</span> LAUNCH</div>
      </div>
    </div>
  );
};

export default PortfolioCard;
