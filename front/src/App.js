// import React, { useState, useRef, useEffect } from 'react';
// import './App.css';
// import micIcon from './microphone.png'; // Make sure your icon is here

// const App = () => {
//   const [selectedOption, setSelectedOption] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const [audioURL, setAudioURL] = useState(null);
//   const [hasPermission, setHasPermission] = useState(false);

//   const recognitionRef = useRef(null);
//   const finalTranscriptRef = useRef('');
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const audioPlayerRef = useRef(null); // for autoplay

//   useEffect(() => {
//     // Request microphone permission on component mount
//     const requestMicrophonePermission = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         setHasPermission(true);
//         // Automatically start the microphone if permission is granted
//         startMicrophone(stream);
//       } catch (err) {
//         console.error('Microphone access denied:', err);
//         alert('Microphone access is required to use this feature.');
//       }
//     };

//     requestMicrophonePermission();
//   }, []);

//   const startMicrophone = (stream) => {
//     if (!('webkitSpeechRecognition' in window)) {
//       alert('Speech Recognition is not supported in your browser.');
//       return;
//     }

//     // 🎤 Start speech recognition
//     if (!recognitionRef.current) {
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.continuous = true;
//       recognition.interimResults = true;
//       recognition.lang = 'en-US';

//       recognition.onresult = (event) => {
//         let tempTranscript = '';
//         for (let i = event.resultIndex; i < event.results.length; ++i) {
//           tempTranscript += event.results[i][0].transcript;
//         }
//         finalTranscriptRef.current = tempTranscript;
//       };

//       recognition.onend = () => {
//         setIsListening(false);
//         // Speech ends, recording should already be stopped
//       };

//       recognitionRef.current = recognition;
//     }

//     finalTranscriptRef.current = '';
//     recognitionRef.current.start();
//     setAudioURL(null);

//     // 🎧 Start audio recording
//     const mediaRecorder = new MediaRecorder(stream);

//     audioChunksRef.current = [];

//     mediaRecorder.ondataavailable = (e) => {
//       audioChunksRef.current.push(e.data);
//     };

//     mediaRecorder.onstop = () => {
//       const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
//       const audioUrl = URL.createObjectURL(audioBlob);
//       setAudioURL(audioUrl);

//       // Autoplay
//       if (audioPlayerRef.current) {
//         audioPlayerRef.current.src = audioUrl;
//         audioPlayerRef.current.play();
//       }
//     };

//     mediaRecorderRef.current = mediaRecorder;
//     mediaRecorder.start();

//     setIsListening(true);
//   };

//   const handleDropdownChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   const toggleListening = async () => {
//     if (!hasPermission) {
//       alert('Microphone access is required to use this feature.');
//       return;
//     }

//     if (!isListening) {
//       // 🎤 Start speech recognition and audio recording
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       startMicrophone(stream);
//     } else {
//       recognitionRef.current.stop();
//       mediaRecorderRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   return (
//     <div className="App">
//       <div className="container">
//         <h2>Voice To Voice Translation</h2>

//         <label>Choose a Destination Language:</label>
//         <select value={selectedOption} onChange={handleDropdownChange}>
//           <option value="">-- Choose a Language --</option>
//           <option value="option1">Telugu</option>
//           <option value="option2">English</option>
//           <option value="option3">Hindi</option>
//           <option value="option3">Tamil</option>
//           <option value="option3">Sanskrit</option>
//         </select>

//         <div className="mic-container">
//           <img
//             src={micIcon}
//             alt="Microphone"
//             onClick={toggleListening}
//             className={isListening ? 'mic-red' : 'mic-green'}
//           />
//           <span className="mic-status">
//             {isListening ? 'Stop' : 'Start'}
//           </span>
//           <span className="mic-listening">
//             {isListening ? '🎙️ Listening...' : ''}
//           </span>
//         </div>

//         {audioURL && (
//           <div className="audio-container">
//             <p><strong>Recorded Audio:</strong></p>
//             <audio controls src={audioURL}></audio>
//             <br />
//             <a href={audioURL} download="recording.webm">Download Audio</a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import micIcon from './microphone.png'; // Make sure your icon is here

const App = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioPlayerRef = useRef(null); // for autoplay

  useEffect(() => {
    // Request microphone permission on component mount
    const requestMicrophonePermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
      } catch (err) {
        console.error('Microphone access denied:', err);
        alert('Microphone access is required to use this feature.');
      }
    };

    requestMicrophonePermission();
  }, []);

  const startMicrophone = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech Recognition is not supported in your browser.');
      return;
    }

    // 🎤 Start speech recognition
    if (!recognitionRef.current) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let tempTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          tempTranscript += event.results[i][0].transcript;
        }
        finalTranscriptRef.current = tempTranscript;
      };

      recognition.onend = () => {
        setIsListening(false);
        // Speech ends, recording should already be stopped
      };

      recognitionRef.current = recognition;
    }

    finalTranscriptRef.current = '';
    recognitionRef.current.start();
    setAudioURL(null);

    // 🎧 Start audio recording
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);

        // Autoplay
        if (audioPlayerRef.current) {
          audioPlayerRef.current.src = audioUrl;
          audioPlayerRef.current.play();
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
    });

    setIsListening(true);
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const toggleListening = async () => {
    if (!hasPermission) {
      alert('Microphone access is required to use this feature.');
      return;
    }

    if (!isListening) {
      // 🎤 Start speech recognition and audio recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      startMicrophone(stream);
    } else {
      recognitionRef.current.stop();
      mediaRecorderRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h2>Voice To Voice Translation</h2>

        <label>Choose a Destination Language:</label>
        <select value={selectedOption} onChange={handleDropdownChange}>
          <option value="">-- Choose a Language --</option>
          <option value="option1">Telugu</option>
          <option value="option2">English</option>
          <option value="option3">Hindi</option>
          <option value="option3">Tamil</option>
          <option value="option3">Sanskrit</option>
        </select>

        <div className="mic-container">
          <img
            src={micIcon}
            alt="Microphone"
            onClick={toggleListening}
            className={isListening ? 'mic-red' : 'mic-green'}
          />
          <span className="mic-status">
            {isListening ? 'Stop' : 'Start'}
          </span>
          <span className="mic-listening">
            {isListening ? '🎙️ Listening...' : ''}
          </span>
        </div>

        {audioURL && (
          <div className="audio-container">
            <p><strong>Recorded Audio:</strong></p>
            <audio controls src={audioURL}></audio>
            <br />
            <a href={audioURL} download="recording.webm">Download Audio</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
