import { config } from '@/helpers/config/envConfig'
import ReactPlayer from 'react-player'

interface IVideoPlayer {
  onReady: () => void
}

const VideoPlayer = ({ onReady }: IVideoPlayer) => {
  return (
    <ReactPlayer
      playing
      src={config.yt_video_url}
      controls
      width="100%"
      height="100%"
      onReady={onReady}
    />
  )
}

export default VideoPlayer
