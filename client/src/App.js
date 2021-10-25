import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [imgSrc, setImgSrc] = useState('');
  const [imgTitle, setImgTitle] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/images`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log('response', response);
    }).catch((error) => {
      console.error('error', error);
    });
  }, []);

  return (
    <div className="App">
      <h1>Home Art Gallery</h1>
      {imgSrc && (
        <img src={imgSrc} alt={imgTitle} style={{ width: 200, height: 200, }} width={200} height={200} />
      )}
    </div>
  );
}

export default App;
