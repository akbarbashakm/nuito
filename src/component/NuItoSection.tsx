'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const sections = [
  "nu ito • [nwi.toʊ] • (noun)",
  'formed out of nu ie. “New” and ito ie. “Thread“.',
  'The STATUS QUO',
  'We wear our essentials the most—yet they’re the most overlooked. The world offers a false choice: cheap basics or luxury pieces that offer little beyond their label.',
  'Nu ITO exists to challenge that.',
  'A NEW STANDARD',
  'We\'re crafting a capsule wardrobe that grows with intention—one essential at a time. No seasonal cycles. No fleeting trends.',
];

type TypingTextProps = {
  text: string;
  doneTyping: boolean;
  onTypingComplete: () => void;
};


const TypingText: React.FC<TypingTextProps> = ({ text, doneTyping, onTypingComplete }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        onTypingComplete();
      }
    }, 20);

    return () => clearInterval(interval);
  }, [text, onTypingComplete]);

  return <p className="text-lg md:text-xl text-gray-700 mb-6">{displayedText}</p>;
};

export default function NuItoSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Prevent scroll when text is animating
    if (current < sections.length) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [current]);

  const handleNext = () => {
    setCurrent((prev) => prev + 1);
  };

  return (
    <section className="min-h-screen bg-[#f6f6e8] flex flex-col justify-center items-center px-6 py-12">
      {sections.slice(0, current + 1).map((text, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.5 }}
          className="max-w-2xl text-center"
        >
          <TypingText text={text} doneTyping={idx === current} onTypingComplete={handleNext} />
        </motion.div>
      ))}
    </section>
  );
}
