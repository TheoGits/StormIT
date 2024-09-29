import React, { useEffect, useRef } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current.play();
  }, []);

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src="/path/to/your/music-file.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default BackgroundMusic;
