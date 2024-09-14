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
      setError('Error scanning file. Please try again. PLease upload the given QR directly.');
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
    <div className='flex flex-col justify-center items-center align-middle p-2 sm:p-4 md:p-6 lg:p-8'>
      <div id="qr-reader" className='flex-grow max-w-md'>  {/* Use flex-grow to make the canvas element take up available space */}
        {/* The canvas element will be rendered here by the html5-qrcode library */}
      </div>
      <h1 className='font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 md:mb-8 lg:mb-10 p-2 sm:p-4 md:p-6 lg:p-8 text-center'>Upload Your QR Code</h1>
      <input id="file-input" className='hidden' type="file" accept="image/*" onChange={handleFileChange} />
      <button
        className='custom-file-upload p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col justify-center'
        onClick={() => document.getElementById('file-input').click()}
      >
        Choose File
      </button>
      {error && <div className='text-red-500 mt-2 bg-red-100 border border-red-400 p-2 rounded w-full max-w-md max-h-64 overflow-y-auto'>{error}</div>}
      {scannedData && <p className='mt-2'>{scannedData}</p>}
    </div>
  );
};

export default Scanner;