export default function Home() {
  const asciiArt = `▄▄    ▄▄                ▄▄
██    ██                ██
████▄ ████▄ ▄█▀█▄ ▄█▀█▄ ██ ▀▀▀██
██ ██ ██ ██ ██▄█▀ ██▄█▀ ██   ▄█▀
████▀ ██ ██ ▀█▄▄▄ ▀█▄▄▄ ██ ▄██▄▄`;

  return (
    <div className="pt-20 pb-20 px-10 flex flex-col items-center">
      <pre className="text-red text-center font-mono whitespace-pre text-[14px] leading-relaxed">
        {asciiArt}
      </pre>
    </div>
  );
}
