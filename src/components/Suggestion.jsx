import React, { useState, useEffect } from 'react';

function Suggestion() {
  
  const [motivationalQuote, setMotivationalQuote] = useState({});

  const fetchMotivationalQuote = async() =>{
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();

      if (response.status==200) {
        setMotivationalQuote(data);
      } else {
        console.error('Failed to fetch motivational quote');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  }

  useEffect(() => {
    fetchMotivationalQuote();
  }, []); 

  return (
    <div className='mt-3 d-flex justify-content-center align-items-center flex-column'>
      <div className='border rounded p-3 bg-light'>
        <p className='lead fw-bold'>{motivationalQuote.content || "Share your spark! Pitch your ideas. Let's make waves together!"}</p>
        {motivationalQuote.author && (
          <p className='text-end'>- {motivationalQuote.author}</p>
        )}
      </div>
    </div>
  )
}

export default Suggestion