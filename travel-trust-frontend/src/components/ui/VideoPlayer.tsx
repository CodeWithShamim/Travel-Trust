import { config } from '@/helpers/config/envConfig';
import ReactPlayer from 'react-player';
import { MediaController } from 'media-chrome/react';

interface IVideoPlayer {
  onReady: () => void;
}

const VideoPlayer = ({ onReady }: IVideoPlayer) => {
  return (
    <MediaController
      style={{
        width: '100%',
        // aspectRatio: '16/9',
        height: '400px',
        borderRadius: '20px',
      }}
    >
      <ReactPlayer
        src={config.yt_video_url}
        controls
        width="100%"
        height="100%"
        onReady={onReady}
        className="rounded-xl"
        style={{
          borderRadius: '20px',
        }}
      />
    </MediaController>
  );
};

export default VideoPlayer;
