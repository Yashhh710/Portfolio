import React, { useState, useEffect, useRef } from 'react';

function LoadingScreen({ isActive, targetName, onComplete }) {
  const [lines, setLines] = useState([]);
  const [progressPct, setProgressPct] = useState(0);
  const [progressLabel, setProgressLabel] = useState('INITIALIZING...');
  const boxRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setLines([]);
      setProgressPct(0);
      setProgressLabel('INITIALIZING...');
      return;
    }

    const steps = [
      { type:'cmd',  prompt:'$', cmd:`ping yash-server.dev`,                               delay: 80 },
      { type:'res',  res:`64 bytes: icmp_seq=1 ttl=64 time=12ms`,        cls:'ok',         delay: 500 },
      { type:'cmd',  prompt:'$', cmd:`ssh yash@tambade.dev -p 2222`,                       delay: 820 },
      { type:'res',  res:`Authentication successful. Welcome, operator.`,cls:'ok',         delay:1220 },
      { type:'cmd',  prompt:'$', cmd:`fetch --portfolio "${targetName}" --format optimized`,delay:1460 },
      { type:'res',  res:`Pulling assets...   ████████░░  80%`,          cls:'res',        delay:1820 },
      { type:'res',  res:`Compressing bundle... done (${Math.floor(Math.random()*300+150)}kb)`, cls:'dim', delay:2100 },
      { type:'res',  res:`✓  Asset package ready`,                        cls:'ok',        delay:2380 },
      { type:'cmd',  prompt:'$', cmd:`deploy --target browser --env prod`,                 delay:2600 },
      { type:'res',  res:`🚀  Launching ${targetName}...`,                       cls:'ok',        delay:2950 },
    ];

    const labels = ['SCANNING...','CONNECTING...','AUTHENTICATING...','FETCHING...','BUILDING...','COMPILING...','PACKAGING...','VERIFYING...','DEPLOYING...','LAUNCHING...'];
    const timeouts = [];

    steps.forEach((step, i) => {
      const t = setTimeout(() => {
        setLines(prev => [...prev, step]);
        const pct = Math.round((i / steps.length) * 100);
        setProgressPct(pct);
        setProgressLabel(labels[i] || 'PROCESSING...');
      }, step.delay);
      timeouts.push(t);
    });

    const completeTimeout = setTimeout(() => {
      setProgressPct(100);
      setProgressLabel('MISSION COMPLETE');
      onComplete();
    }, 3300);
    timeouts.push(completeTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [isActive, targetName, onComplete]);

  // Keep terminal scrolled to bottom
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div id="s-loading" className={`screen ${isActive ? 'active' : ''}`}>
      <div className="load-grid"></div>
      <div className="load-vignette"></div>
      <div className="corner-dec tl"></div><div className="corner-dec tr"></div>
      <div className="corner-dec bl"></div><div className="corner-dec br"></div>

      <div className="load-content">
        <div className="load-glyph" data-text="DEPLOYING">DEPLOYING</div>
        <div className="load-label">TARGET ACQUIRED</div>
        <div className="load-target">{targetName?.toUpperCase() || 'PORTFOLIO'}</div>

        <div className="load-ring"></div>

        <div className="terminal-box" ref={boxRef}>
          {lines.map((line, idx) => (
            <div key={idx} className="terminal-line show">
              {line.type === 'cmd' ? (
                <>
                  <span className="prompt">{line.prompt}</span>
                  <span className="cmd">{line.cmd}</span>
                </>
              ) : (
                <span className={line.cls || 'res'}>&nbsp;&nbsp;{line.res}</span>
              )}
            </div>
          ))}
        </div>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPct}%` }}></div>
          <div className="progress-glow" style={{ right: `${100 - progressPct}%` }}></div>
        </div>
        <div className="progress-stats">
          <span style={{ letterSpacing: '2px' }}>{progressLabel}</span>
          <span className="progress-pct">{progressPct}%</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
