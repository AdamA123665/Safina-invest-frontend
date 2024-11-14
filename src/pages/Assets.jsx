import React from 'react';

function Assets() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Where to Invest</h1>
      <p>Explore Islamic ETFs and other Sharia-compliant investment options.</p>
      {/* Placeholder for asset table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Asset</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Ticker</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>5-Year Average Return</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '10px' }}>MSCI US Islamic ETF</td>
            <td style={{ border: '1px solid #ccc', padding: '10px' }}>MSCIUSI</td>
            <td style={{ border: '1px solid #ccc', padding: '10px' }}>8.5%</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
}

export default Assets;
