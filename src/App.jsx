import { useEffect, useRef, useState } from "react";
import Seackbar from "./componets/Seackbar";
import VerticalSlider from "./componets/VerticalSlider";

function App() {
  const [videoProgress, setVideoprogress] = useState(0);

  const videoRef = useRef(null);

  const handleTimeUpdate = () => {
    const percent = videoRef.current.currentTime / videoRef.current.duration;
    setVideoprogress(percent);
  };

  function togglePlay() {
    console.log("toggled");
    videoRef.current.paused
      ? videoRef.current.play()
      : videoRef.current.pause();
  }

  function skip(duration) {
    videoRef.current.currentTime += duration;
  }

  useEffect(() => {
    function handleKeyDown(e) {
      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          togglePlay();
          break;
        case "j":
          skip(-10);
          break;
        case "l":
          skip(10);
          break;
        default:
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [videoRef]);

  return (
    <div>
      <div className="container">
        <video
          src="/assets/video.mp4"
          width={600}
          onTimeUpdate={handleTimeUpdate}
          controls
          ref={videoRef}
        ></video>
        <div style={{ paddingTop: 24 }}></div>
        <Seackbar value={videoProgress} setValue={setVideoprogress} />
        <div style={{ margin: "24px 0 0 0" }} />
        <VerticalSlider />
      </div>
    </div>
  );
}

export default App;
