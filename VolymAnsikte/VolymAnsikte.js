//Ignorera alla deprecated saker- dom funka

navigator.mediaDevices.getUserMedia({ audio: true })
  .then((stream) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

    analyser.smoothingTimeConstant = 0.1;
    analyser.fftSize = 1024;

    microphone.connect(analyser);
    analyser.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination);

    scriptProcessor.onaudioprocess = () => {
      const array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      const arraySum = array.reduce((a, value) => a + value, 0);
      const average = arraySum / array.length;

      console.log(`Average Volume: ${Math.round(average)}`);
      colorPids(average);
    };
  })
  .catch((err) => {
    console.error('Microphone access error:', err);
  });

function colorPids(volume) {
  const allPids = document.querySelectorAll('.pid');
  const numberOfPidsToColor = Math.round(volume / 4.5);
  
  allPids.forEach((pid, index) => {
    pid.style.backgroundColor = index < numberOfPidsToColor ? '#69ce2b' : '#e6e7e8';
  });
}
