import { useState, useRef, useEffect } from 'react';
import CornerDecoration from '../Common/CornerDecoration';
import './VideoScreen.css';

const VideoScreen = ({ isActive, onComplete }) => {
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef(null);
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
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        afterVideo();
      });
    }
    fallbackTimerRef.current = setTimeout(afterVideo, 7000);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('error', () => {
        unmuteVideo(); // or skip directly
        afterVideo();
      });
    }
  }, []);

  return (
    <div id="s-video" className={`screen ${isActive ? 'active' : ''}`}>
      <video 
        playsInline 
        id="intro-video" 
        src="models/videoplayback.mp4"
        ref={videoRef}
        onEnded={afterVideo}
      ></video>
      <CornerDecoration />
      
      {!videoStarted && (
        <div id="unmute-overlay" onClick={unmuteVideo}>
          <div className="unmute-box">
            ▶ Tap Into the Experience
            <div className="unmute-sub">BROWSERS REQUIRE USER INTERACTION</div>
          </div>
        </div>
      )}
      
      <button className="skip-btn" id="skip-btn" onClick={afterVideo}>SKIP ›</button>
    </div>
  );
};

export default VideoScreen;
