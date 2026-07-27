import React, { useEffect, useState } from 'react';
import { useSpring, useTransform } from 'framer-motion';

export const AnimatedCounter = ({ value, duration = 1.0, prefix = '', suffix = '' }) => {
  const numericValue = typeof value === 'number' ? value : parseFloat(value);
  const isNumeric = !isNaN(numericValue) && isFinite(numericValue);

  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (current) =>
    Number.isInteger(numericValue) ? Math.round(current) : parseFloat(current.toFixed(1))
  );
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isNumeric) {
      spring.set(numericValue);
    }
  }, [numericValue, isNumeric, spring]);

  useEffect(() => {
    if (isNumeric) {
      return display.on('change', (latest) => setDisplayValue(latest));
    }
  }, [display, isNumeric]);

  if (!isNumeric) {
    return <span>{value}</span>;
  }

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};
