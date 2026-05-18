"use client";

import { useTypewriter } from "@/hooks/useTypewriter";
import { ReactNode } from "react";

interface TypewriterTextProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  color?: string;
  typingSpeed?: number;
  delayStart?: number;
  showCursor?: boolean;
  cursorColor?: string;
  hideCursorWhenDone?: boolean;
  enableLoop?: boolean;
  className?: string;
}

export default function TypewriterText({
  text,
  tag = "span",
  color = "text-white",
  typingSpeed = 0.04,
  delayStart = 0,
  showCursor = true,
  cursorColor = "text-red",
  hideCursorWhenDone = false,
  enableLoop = false,
  className = "",
}: TypewriterTextProps) {
  const { displayed, isDone } = useTypewriter({
    text,
    speed: typingSpeed,
    delay: delayStart,
    loop: enableLoop,
  });

  const showCursorNow = showCursor && (!hideCursorWhenDone || !isDone);

  const content: ReactNode = (
    <>
      {displayed}
      {showCursorNow && <span className={`${cursorColor} animate-blink`}>|</span>}
    </>
  );

  const tagProps = {
    className: `${color} ${className}`,
  };

  const Tag = tag as keyof JSX.IntrinsicElements;

  return <Tag {...tagProps}>{content}</Tag>;
}
