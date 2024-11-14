import React from 'react';

function Research() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Research</h1>
      <p>Read articles and insights on the latest trends in Islamic finance and investment.</p>
      {/* Placeholder for articles */}
      <div style={{ marginTop: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', marginBottom: '10px' }}>
          <h2>Article Title 1</h2>
          <p>Summary of the article goes here. Click to read more.</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', marginBottom: '10px' }}>
          <h2>Article Title 2</h2>
          <p>Summary of the article goes here. Click to read more.</p>
        </div>
      </div>
    </div>
  );
}

export default Research;
