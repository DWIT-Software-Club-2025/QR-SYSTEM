import React, { useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import "../App.css"
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
    <div className='flex flex-col justify-center items-center align-middle p-4 sm:p-6 md:p-8 lg:p-10'>
      <div id="qr-reader" className='w-full max-w-md'></div>
      <h1 className='font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 p-4 sm:p-6 md:p-8 lg:p-10 text-center'>Upload Your QR Code</h1>
      <input id="file-input" className='hidden' type="file" accept="image/*" onChange={handleFileChange} />
      <button
        className='custom-file-upload p-2 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-center'
        onClick={() => document.getElementById('file-input').click()}
      >
        Choose File
      </button>
      {error && <p className='text-red-500 mt-4'>{error}</p>}
      {scannedData && <p className='mt-4'>{scannedData}</p>}
    </div>
  );
};
export default Scanner;