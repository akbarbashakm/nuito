// components/TypingText.tsx
'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type TypingTextProps = {
  text: string;
  delay?: number;
  className?: string;
};

const TypingText: React.FC<TypingTextProps> = ({ text, delay = 20, className }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [displayedText, setDisplayedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (!inView || typingDone) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [inView, text, delay, typingDone]);

  return (
    <p ref={ref} className={className}>
      {displayedText}
    </p>
  );
};

export default TypingText;
