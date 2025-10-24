"use client";

import React, { useState, useEffect } from 'react';

function Countdown() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const calculateTimeLeft = () => {
    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setHours(now.getHours() + 1, 0, 0, 0);
    
    const difference = nextHour - now;
    
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (isClient) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="text-center p-3 mb-8 bg-blue-500/10 border border-blue-500/30 text-blue-300 rounded-lg">
        <span>Key resets in: </span>
        <span className="font-mono font-bold text-white">--:--</span>
      </div>
    );
  }

  return (
    <div className="text-center p-3 mb-8 bg-blue-500/10 border border-blue-500/30 text-blue-300 rounded-lg">
      <span>Key resets in: </span>
      <span className="font-mono font-bold text-white">
        {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
      </span>
    </div>
  );
}

export default Countdown;