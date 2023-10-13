import { useState, useEffect } from 'react';

const Counter = ({ totalNumber }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const totalNumberz=Number(totalNumber)

  useEffect(() => {
    const incrementCounter = () => {
      let startTimestamp;
      const duration = 1000; // 2 seconds
      function updateCounter(timestamp) {
        if (!startTimestamp) {
          startTimestamp = timestamp;
        }
        const elapsedTime = timestamp - startTimestamp;
        const progress = Math.min(elapsedTime / duration, 1); // Ensure progress doesn't exceed 1
        setCurrentNumber(Math.floor(progress * totalNumberz));

        if (currentNumber < totalNumberz) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
    };

    incrementCounter();
  }, [totalNumber]);

  return (
    <div>
      <div>{isNaN(currentNumber)?0:currentNumber.toLocaleString()}</div>
    </div>
  );
};

export default Counter;
