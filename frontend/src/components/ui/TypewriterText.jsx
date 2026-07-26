import React, { useState, useEffect } from 'react';

export const TypewriterText = ({
  text = '',
  speed = 25,
  delay = 100,
  className = '',
  cursor = true,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (!text) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && currentIndex < text.length && (
        <span className="animate-pulse text-[#2563EB] font-bold inline-block ml-0.5">|</span>
      )}
    </span>
  );
};
