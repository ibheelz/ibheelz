import { useState, useEffect } from "react";

interface UseTypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
}

export function useTypewriter({
  text,
  speed = 0.04,
  delay = 0,
  loop = false,
}: UseTypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let index = 0;

    const startTyping = () => {
      const type = () => {
        if (index < text.length) {
          setDisplayed(text.slice(0, index + 1));
          index++;
          timeoutId = setTimeout(type, speed * 1000);
        } else {
          setIsDone(true);
          if (loop) {
            index = 0;
            setDisplayed("");
            timeoutId = setTimeout(startTyping, 1000);
          }
        }
      };
      type();
    };

    timeoutId = setTimeout(startTyping, delay * 1000);

    return () => clearTimeout(timeoutId);
  }, [text, speed, delay, loop]);

  return { displayed, isDone };
}
