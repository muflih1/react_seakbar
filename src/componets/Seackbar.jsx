import React, { useEffect, useRef, useState } from "react";

export default function Seackbar({ value, setValue }) {
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [thumbHovered, setThumbHovered] = useState(false);
  const [thumbActive, setThumbActive] = useState(false);

  useEffect(() => {
    function handleDocumentScrub(e) {
      if (isScrubbing) handleScrubbing(e);
      setThumbActive(false);
    }
    function handleDocumentMove(e) {
      if (isScrubbing) handleMouseMove(e);
    }
    document.addEventListener("mouseup", handleDocumentScrub);
    document.addEventListener("mousemove", handleDocumentMove);

    return () => {
      document.removeEventListener("mouseup", handleDocumentScrub);
      document.removeEventListener("mousemove", handleDocumentMove);
    };
  }, [isScrubbing, thumbActive]);

  const containerRef = useRef(null);

  const thumbWidth = 16;
  const containerWidth = 32;

  const handleScrubbing = (e) => {
    let buttons;
    if (e.nativeEvent) {
      buttons = e.nativeEvent.buttons;
    } else {
      buttons = e.buttons;
    }
    setIsScrubbing((buttons & 1) === 1);
    handleMouseMove(e);
  };

  const handleMouseMove = (e) => {
    let x;
    if (e.nativeEvent) {
      x = e.nativeEvent.x;
    } else {
      x = e.x;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max(0, x - rect.x), rect.width) / rect.width;

    if (isScrubbing) {
      e.preventDefault();
      setValue(percent);
    }
  };

  const leftValue = value * (containerWidth - thumbWidth);

  return (
    <div
      className="seakbar-container"
      onMouseDown={handleScrubbing}
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <div className="seakbar-area">
        <div className="progress" style={{ flexGrow: value }} />
        <div
          className={`thumb-wrapper ${
            thumbHovered ? "thumb-wrapper-hovered" : ""
          } ${thumbActive ? "thumb-wrapper-active" : ""}`}
          onMouseOver={() => setThumbHovered(true)}
          onMouseLeave={() => setThumbHovered(false)}
          onMouseDown={() => setThumbActive(true)}
          onMouseUp={() => setThumbActive(false)}
          style={{ left: `calc(${value * 100}% - ${leftValue}px)` }}
        >
          <div className={`thumb`} />
        </div>
      </div>
    </div>
  );
}
