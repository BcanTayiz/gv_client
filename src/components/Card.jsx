
import React from 'react';

const Card = ({ message, group, rateLimit, streamSeq }) => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '16px',margin:'30px' }}>
      <h3>User Info</h3>
      <p><strong>Message:</strong> {message}</p>
      <p><strong>Group:</strong> {group}</p>
      <p><strong>Rate Limit:</strong> {rateLimit}</p>
      <p><strong>Stream Seq:</strong> {streamSeq}</p>
    </div>
  );
};

export default Card;
