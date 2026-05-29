import React, { useState } from 'react';

function PortCard({ title, url, img, num, desc, tags, badge, onLaunch }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="port-card" onClick={() => onLaunch(title, url)}>
      <div className={`card-img ${imgLoaded || imgError ? 'img-loaded' : ''}`}>
        {!imgError ? (
          <img 
            src={img} 
            alt={title} 
            onLoad={() => setImgLoaded(true)} 
            onError={() => setImgError(true)} 
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '8px', zIndex: 2
          }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', letterSpacing: '4px', color: 'rgba(0,255,136,0.2)' }}>
              {badge}
            </div>
            <div style={{ fontSize: '9px', color: '#333', letterSpacing: '3px' }}>
              SCREENSHOT UNAVAILABLE
            </div>
          </div>
        )}
        <div className="card-img-overlay"></div>
        <div className="card-badge">{badge}</div>
        <div className="card-scan"></div>
      </div>
      <div className="card-body">
        <div className="card-num">{num}</div>
        <div className="card-title">{title}</div>
        <div className="card-desc">{desc}</div>
        <div className="card-tags">
          {tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
        </div>
        <div className="card-action"><span className="arrow">→</span> LAUNCH</div>
      </div>
    </div>
  );
}

function CardsScreen({ isActive, onLaunch }) {
  const cardsData = [
    {
      title: 'Professional',
      url: 'https://yash-portfolio-professional.vercel.app/',
      img: 'https://github.com/Yashhh710/My-Portfolio-Hub/blob/main/img/1.png?raw=true',
      num: 'PORT_01 / PRO',
      desc: 'Clean, corporate-grade portfolio built for job applications and serious first impressions.',
      tags: ['REACT', 'PROFESSIONAL', 'V5'],
      badge: 'PORT_01'
    },
    {
      title: 'Dark Theme',
      url: 'https://portfolio-v4-three-mauve.vercel.app/',
      img: 'https://github.com/Yashhh710/My-Portfolio-Hub/blob/main/img/2.png?raw=true',
      num: 'PORT_02 / DARK',
      desc: 'Slick dark-mode experience — where shadows do the talking and every detail bleeds style.',
      tags: ['DARK UI', 'VERCEL', 'V4'],
      badge: 'PORT_02'
    },
    {
      title: 'SkyLine Protocol',
      url: 'https://map-port-v1.vercel.app/',
      img: 'https://github.com/Yashhh710/My-Portfolio-Hub/blob/main/img/3.png?raw=true',
      num: 'PORT_03 / MAP',
      desc: 'An immersive world-map based portfolio. Navigate the globe, discover the projects.',
      tags: ['WORLD MAP', 'INTERACTIVE', 'UNIQUE'],
      badge: 'PORT_03'
    },
    {
      title: 'MacOS UI',
      url: 'https://mac-lyart.vercel.app/',
      img: 'https://github.com/Yashhh710/My-Portfolio-Hub/blob/main/img/4.png?raw=true',
      num: 'PORT_04 / MAC',
      desc: 'A full macOS lock-screen experience as a portfolio. Password: 7103. The most creative one.',
      tags: ['MACOS UI', 'PASSWORD', '🔐 7103'],
      badge: '🔐 PORT_04'
    },
    {
      title: 'The Origin',
      url: 'https://yashhh710.github.io/Portfolio_v1/',
      img: 'https://github.com/Yashhh710/My-Portfolio-Hub/blob/main/img/5.png?raw=true',
      num: 'PORT_05 / ORIGIN',
      desc: 'Where it all began — the first full portfolio. Raw, real, and full of late-night energy.',
      tags: ['V1', 'ORIGIN', '3D VIBES'],
      badge: 'PORT_05'
    },
    {
      title: 'Portfolio Hub',
      url: 'https://my-portfolio-hub-ten.vercel.app/',
      img: 'https://github.com/Yashhh710/My-Portfolio-Hub/blob/main/img/7.png?raw=true',
      num: 'PORT_06 / MAIN',
      desc: 'The central command — a cinematic hub linking all universes in Yash\'s creative multiverse.',
      tags: ['REACT', 'VITE', 'NETLIFY'],
      badge: 'PORT_06'
    }
  ];

  return (
    <div id="s-cards" className={`screen ${isActive ? 'active' : ''}`} style={{ justifyContent: 'flex-start', overflowY: 'auto', padding: '0' }}>
      <div className="cards-header">
        <h2>SELECT YOUR DESTINATION</h2>
        <p>// Portfolio generator ready. Pick one of the six templates for Yash</p>
      </div>
      <div className="cards-grid">
        {cardsData.map((card, index) => (
          <PortCard key={index} {...card} onLaunch={onLaunch} />
        ))}
      </div>
    </div>
  );
}

export default CardsScreen;
