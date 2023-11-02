import { config } from "@/helpers/config/envConfig";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  return (
    <ReactPlayer
      url={config.yt_video_url}
      config={{
        youtube: {
          playerVars: { showinfo: 1 },
        },
      }}
      controls
      width="100%"
      height="100%"
    />
  );
};

export default VideoPlayer;
