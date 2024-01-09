import { useEffect, useRef, useState } from "react";
import "../css/Landing.css";
import { Room } from "./Room";

export const Landing = () => {
  const [name, setName] = useState("");
  const [localAudioTrack, setLocalAudioTrack] =
    useState<MediaStreamTrack | null>(null);
  const [localVideoTrack, setlocalVideoTrack] =
    useState<MediaStreamTrack | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [joined, setJoined] = useState(false);

  const getCam = async () => {
    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    // MediaStream
    const audioTrack = stream.getAudioTracks()[0];
    const videoTrack = stream.getVideoTracks()[0];
    setLocalAudioTrack(audioTrack);
    setlocalVideoTrack(videoTrack);
    if (!videoRef.current) {
      return;
    }
    videoRef.current.srcObject = new MediaStream([videoTrack]);
    videoRef.current.play();
    // MediaStream
  };

  useEffect(() => {
    if (videoRef && videoRef.current) {
      getCam();
    }
  }, [videoRef]);

  if (!joined) {
    return (
      <div className="landingPage">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "40px",
          }}
        >
          <video autoPlay ref={videoRef} className="LandingVideo"></video>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="userInputBox">
            <h5>Talk Dierty</h5>
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="landingInput"
              placeholder="Enter Your Name to Proceed"
            ></input>
            <button
              onClick={() => {
                setJoined(true);
              }}
              className="landingJoinBtn"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Room
      name={name}
      localAudioTrack={localAudioTrack}
      localVideoTrack={localVideoTrack}
    />
  );
};
