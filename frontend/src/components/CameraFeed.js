import React, { useRef, useEffect } from "react";
import axios from "axios";

const CameraFeed = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        // Wait for the metadata to load
        await videoRef.current.play();
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    };
  
    getVideo();
  }, []);

  const captureFrame = async () => {
    // Stop the video playback to release webcam resources
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());

    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    const dataUrl = canvasRef.current.toDataURL("image/jpeg");
    const blob = await (await fetch(dataUrl)).blob();
    const formData = new FormData();
    formData.append("frame", blob, "frame.jpg");

    try {
      await axios.post("http://127.0.0.1:8000/student/camera/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Frame sent successfully");
    } catch (err) {
      console.error("Error sending frame: ", err);
    }

    // Restart the video playback after capturing the frame
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  return (
    <div>
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: "none" }}
      />
      <button onClick={captureFrame}>Capture Frame</button>
      hello
    </div>
  );
};

export default CameraFeed;
