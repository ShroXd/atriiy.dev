'use client'

import dynamic from 'next/dynamic'
import 'plyr-react/plyr.css'

const Plyr = dynamic(() => import('plyr-react'), { ssr: false })

interface AudioPlayerProps {
  src: string
}

const AudioPlayer = ({ src }: AudioPlayerProps) => {
  const audioSrc = {
    type: 'audio' as const,
    sources: [
      {
        src,
        type: 'audio/mp3',
      },
    ],
  }
  return <Plyr source={audioSrc} />
}

export default AudioPlayer
