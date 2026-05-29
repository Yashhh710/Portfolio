import React, { useRef, useState, useEffect } from 'react';

function VideoScreen({ isActive, onComplete }) {
  const vidRef = useRef(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const fallbackTimerRef = useRef(null);

  const afterVideo = () => {
    if (videoEnded) return;
    setVideoEnded(true);
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    onComplete();
  };

  const unmuteVideo = () => {
    if (videoStarted) return;
    setVideoStarted(true);
    
    if (vidRef.current) {
      vidRef.current.muted = false;
      vidRef.current.currentTime = 0;
      vidRef.current.play().catch(() => {
        afterVideo();
      });
    } else {
      afterVideo();
    }
    
    fallbackTimerRef.current = setTimeout(afterVideo, 7000);
  };

  const handleSkip = () => {
    if (videoStarted) {
      afterVideo();
    }
  };
  
  useEffect(() => {
    if (!isActive && fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
    }
  }, [isActive]);

  return (
    <div id="s-video" className={`screen ${isActive ? 'active' : ''}`}>
      <video 
        playsInline 
        id="intro-video" 
        src="/videoplayback.mp4" 
        ref={vidRef}
        onEnded={afterVideo}
        onError={() => {
          if (videoStarted) afterVideo();
        }}
      ></video>
      <div className="corner-dec tl"></div><div className="corner-dec tr"></div>
      <div className="corner-dec bl"></div><div className="corner-dec br"></div>
      
      {!videoStarted && (
        <div id="unmute-overlay" style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 5,
          background: 'rgba(0,0,0,0.55)'
        }} onClick={unmuteVideo}>
          <div style={{
            border: '1px solid rgba(0,255,136,0.5)', padding: '18px 40px',
            fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '5px',
            color: '#00ff88', background: 'rgba(0,0,0,0.7)', textAlign: 'center'
          }}>
            ▶ Tap Into the Experience
            <div style={{ fontSize: '9px', color: '#555', letterSpacing: '3px', marginTop: '6px' }}>BROWSERS REQUIRE USER INTERACTION</div>
          </div>
        </div>
      )}
      <button className="skip-btn" onClick={handleSkip}>SKIP ›</button>
    </div>
  );
}

export default VideoScreen;
