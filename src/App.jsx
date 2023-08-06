import { useRef, useState } from "react";
import Seackbar from "./componets/Seackbar";

function App() {
  const [videoProgress, setVideoprogress] = useState(0);

  const videoRef = useRef(null);

  const handleTimeUpdate = () => {
    const percet = videoRef.current.currentTime / videoRef.current.duration;
    setVideoprogress(percet);
  };

  console.log(videoRef);

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
        <Seackbar
          value={videoProgress}
          setValue={setVideoprogress}
        />
      </div>
    </div>
  );
}

export default App;
