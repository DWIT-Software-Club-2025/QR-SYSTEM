import React, { useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const Scanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    try {
      const html5QrCode = new Html5Qrcode('qr-reader');
      const result = await html5QrCode.scanFile(file, true);
      setScannedData(result);
      sendScannedDataToBackend(result);
    } catch (err) {
      console.error('Error scanning file:', err);
      setError('Error scanning file. Please try again.');
    }
  };

  const sendScannedDataToBackend = async (data) => {
    try {
      const response = await fetch('/scanqr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: data }),
      });

      if (!response.ok) {
        throw new Error('Failed to send scanned data to backend');
      }

      const result = await response.json();
      console.log('Backend response:', result);
    } catch (error) {
      console.error('Error sending scanned data to backend:', error);
      setError('Error sending scanned data to backend. Please try again.');
    }
  };

  return (
    <div>
      <div id="qr-reader"></div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {error && <p>Error: {error}</p>}
      {scannedData && <p>Scanned Data: {scannedData}</p>}
    </div>
  );
};

export default Scanner;