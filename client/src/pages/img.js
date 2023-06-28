import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Image = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Get the image URL from Pinata
    const apiKey = 'd3148e847f29b44394a3';
    axios
      .get('https://ipfs.io/ipfs/QmbYpDwdSx6x1ijrbMbzjJLgs4AHSRYYafhEiSqtPUTbjM', {})
      .then((response) => response.data)
      .then((data) => setImageUrl(data.image));
  }, []);

  console.log(imageUrl);
  return <img src={imageUrl} alt="Image" />;
};

export default Image;
