import React from 'react';
import api from '../axiosConfig'

const RestartServerButton = () => {
  const restartServer = async () => {
    try {
      const response = await api.post('/reset_rate_limit/', null, {
        headers: {
          'Authorization': 'Bearer USER123',
        },
      });
      console.log(response.data);
      window.location.reload()
    } catch (error) {
      console.error('Error restarting server:', error);
    }
  };

  return (
    <button onClick={restartServer}>
      Restart Streaming
    </button>
  );
};

export default RestartServerButton;
