// WaveVisualizer.jsx
import { useEffect, useRef, useState } from 'react';
import Wavify from 'react-wavify';

const WaveVisualizer = ({ audioRef }) => {
  const [amplitude, setAmplitude] = useState(20); // Initial amplitude

  useEffect(() => {
    if (!audioRef.current) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioRef.current);

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const update = () => {
      analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
      setAmplitude(Math.min(60, avg)); // Limit max amplitude
      requestAnimationFrame(update);
    };

    update();

    return () => {
      source.disconnect();
      analyser.disconnect();
    };
  }, [audioRef]);

  return (
    <div style={{ position: 'absolute', bottom: 0, width: '48%', marginBottom: '10px' }}>
      <Wavify
        fill="#1db954"
        paused={false}
        options={{
          height: amplitude,
          amplitude: amplitude,
          speed: 0.2,
          points: 3,
        }}
      />
    </div>
  );
};

export default WaveVisualizer;
