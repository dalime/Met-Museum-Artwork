import React, { useState, useEffect, useRef } from 'react';

import Artwork from './components/Artwork';
import './App.css';

function App() {
  // Component state
  const [objectIDs, setObjectIDs] = useState([]);
  const [currentObjectIndex, setCurrentObjectIndex] = useState(null);
  const [pauseTimer, setPauseTimer] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const [imgSrc, setImgSrc] = useState('');
  const [imgTitle, setImgTitle] = useState('');

  // Error
  const [error, setError] = useState(null);

  // useInterval helper hook to set an interval for useEffect
  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      if (pauseTimer === false) {
        savedCallback.current = callback;
      }

    }, [callback]);

    useEffect(() => {
      if (pauseTimer === false) {
        function tick() {
          savedCallback.current();
        }
        if (delay !== null) {
          let id = setInterval(tick, delay);
          return () => clearInterval(id);
        }
      }
    }, [delay]);
  }

  /**
   * Fetches an object from the server based on ID
   * @param {number} id
   */
  const fetchObject = (id) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/image/${id}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => response.json()).then((res) => {
      console.log('fetched object', res);
      // Fetched the object
      if (res.primaryImage) {
        setImgSrc(res.primaryImage);
      }
      if (res.title && res.title.length) {
        setImgTitle(res.title);
      }
      setCurrentArtwork(res);
    }).catch((error) => {
      // If error, display error
      setError(error.message);
    });
  }

  useEffect(() => {
    // Fetch all object IDs from the server
    fetch(`${process.env.REACT_APP_SERVER_URL}/images1`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => response.json()).then((res) => {
      // If there is one or more objectIDs in the response
      if (res.objectIDs && res.objectIDs.length) {
        // Set ObjectIDs to the response
        setObjectIDs(res.objectIDs);
        // Set the current index and fetch the first object from the list
        setCurrentObjectIndex(0);
        fetchObject(res.objectIDs[0]);
      }
    }).catch((error) => {
      // If error, display error
      setError(error.message);
    });
  }, []);

  // Set up interval of 10 seconds to switch art image
  useInterval(() => {
    // Increment Object ID by 1 and fetch the associated object
    if (objectIDs.length) {
      const newIndex = currentObjectIndex + 1;
      setCurrentObjectIndex(newIndex);
      fetchObject(objectIDs[newIndex]);
    }
  }, pauseTimer ? Math.max : 10000);

  return (
    <div className="App">
      <h1>
        Met Museum Artwork
      </h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Artwork
        artwork={currentArtwork}
        imgSrc={imgSrc}
        imgTitle={imgTitle}
        setPauseTimer={setPauseTimer}
      />
    </div>
  );
}

export default App;
