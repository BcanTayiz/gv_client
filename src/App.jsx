import React, { useState, useEffect } from 'react';
import api from './axiosConfig';
import Card from './components/Card'; 
import RestartServerButton from './components/Restart';

const App = () => {
  const [streamData, setStreamData] = useState([]);
  const [error, setError] = useState(null);
  const [isStreamOn, setIsStreamOn] = useState(true); // State to track if the stream is on or off
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  useEffect(() => {
    let intervalId;

    const fetchStreamData = async () => {
      try {
        const response = await api.get('/stream/', {
          params: {
            stream: true,
            limit: 10,
            offset: 0,
          },
          headers: {
            'Authorization': 'Bearer USER123', // Hardcoded token for demo
            'Accept': 'text/event-stream',
          },
        });

        if (response.status === 429) {
          clearInterval(intervalId);
        }

        const parsedData = response.data.split('\n')
          .filter(item => item.startsWith('data: '))
          .map(item => JSON.parse(item.substring(5)));

        setStreamData(prevStreamData => [...prevStreamData, ...parsedData]);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    if (isStreamOn) {
      fetchStreamData(); // Fetch initially
      intervalId = setInterval(fetchStreamData, 5000);
    } else {
      setStreamData([]); // Clear data if stream is off
    }

    return () => clearInterval(intervalId);
  }, [isStreamOn]); // Include isStreamOn in the dependency array to re-fetch data when the stream state changes

  const toggleStream = () => {
    setIsStreamOn(prevState => !prevState); // Toggle the stream state
    setIsLoading(true); // Set loading state when toggling
  };

  return (
    <>
      <div>
        <h1>Streaming Data</h1>
        <div>
          <label>
            <input type="checkbox" checked={isStreamOn} onChange={toggleStream} />
            {isStreamOn ? 'Stream On' : 'Stream Off'}
            <RestartServerButton/>
          </label>
        </div>
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <div className='card-container'>
            {isLoading ? (
              <div className='loading-container'>Loading...</div>
            ) : (
              streamData.map((data, index) => (
                <Card
                  key={index}
                  message={data.message}
                  group={data.group}
                  rateLimit={data.rate_limit}
                  streamSeq={data.stream_seq}
                />
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
