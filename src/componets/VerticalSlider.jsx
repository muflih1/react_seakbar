import React, { useEffect, useRef, useState } from "react";

export default function VerticalSlider() {
  const [value, setValue] = useState(0.5);
  const [isScrubbing, setIsScrubbing] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    function handleDocScrub(e) {
      if (isScrubbing) toggleScrubbing(e);
    }
    function handleDocMove(e) {
      if (isScrubbing) handleMoseMove(e);
    }

    document.addEventListener('mouseup', handleDocScrub);
    document.addEventListener('mousemove', handleDocMove);

    return () => {
      document.removeEventListener('mouseup', handleDocScrub);
      document.removeEventListener('mousemove', handleDocMove);
    }
  }, [isScrubbing]);


  const toggleScrubbing = (e) => {
    let buttons;
    if (e.nativeEvent) {
      buttons = e.nativeEvent.buttons;
    } else {
      buttons = e.buttons;
    }

    setIsScrubbing((buttons & 1) === 1);

    handleMoseMove(e);
  };

  const handleMoseMove = (e) => {
    let y;
    if (e.nativeEvent) {
      y = e.nativeEvent.y;
    } else {
      y = e.y;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const percent = 1 - Math.min(Math.max(0, y - rect.y), rect.height) / rect.height;

    if (isScrubbing) {
      e.preventDefault();
      setValue(percent);
    }
  };

  const thumbHeight = 16;
  const thumbContainer = 32;

  const bottom = value * (thumbContainer - thumbHeight);

  return (
    <div
      className="vertical-slider-container"
      onMouseDown={toggleScrubbing}
      onMouseMove={handleMoseMove}
      ref={containerRef}
    >
      <div className="vertical-slider-area">
        <div className="progress" style={{ flexGrow: value }} />
        <div className="thumb-container" style={{ bottom: `calc(${(value * 100)}% - ${bottom}px)` }}>
          <div className="thumb" />
        </div>
      </div>
    </div>
  );
}
