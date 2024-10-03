import React, { useEffect, useRef } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 1; // Sett volumet til 1 (fullt volum)
        console.log('Prøver å spille av lyd...');
        audioRef.current.play().then(() => {
          console.log('Lydavspilling startet!');
        }).catch((error) => {
          console.error('Autoplay ble blokkert. Brukerinteraksjon kreves for å starte lyd: ', error);
        });
      }
    };

    // Legg til en klikkhendelse for å prøve å spille lyd
    window.addEventListener('click', playAudio);

    return () => {
      window.removeEventListener('click', playAudio);
    };
  }, []);

  return (
    <div>
      <audio ref={audioRef} loop onCanPlay={() => audioRef.current.play()}>
       <source src="/music.mp3" type="audio/mpeg" />
      </audio>

    </div>
  );
};

export default BackgroundMusic;
