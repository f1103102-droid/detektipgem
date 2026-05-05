/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface Props {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export default function TypewriterEffect({ text, speed = 30, onComplete }: Props) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed + (Math.random() * 20)); // Varying speed for human/distorted feel
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, speed, onComplete]);

  return (
    <motion.span 
      key={text}
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      className="font-mono leading-relaxed"
    >
      {displayedText}
      {index < text.length ? (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.1, repeat: Infinity }}
          className="inline-block w-2.5 h-5 bg-bento-accent ml-1 align-middle shadow-[0_0_8px_rgba(224,192,151,0.5)]"
        />
      ) : (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block w-2.5 h-5 bg-bento-accent/30 ml-1 align-middle"
        />
      )}
    </motion.span>
  );
}
