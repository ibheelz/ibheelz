export default function Home() {
  const asciiArt = `
▄▄    ▄▄                ▄▄
██    ██                ██
████▄ ████▄ ▄█▀█▄ ▄█▀█▄ ██ ▀▀▀██
██ ██ ██ ██ ██▄█▀ ██▄█▀ ██   ▄█▀
████▀ ██ ██ ▀█▄▄▄ ▀█▄▄▄ ██ ▄██▄▄
  `;

  return (
    <div className="py-20 px-10 flex flex-col items-center justify-center">
      <div className="mb-12">
        <pre className="text-red text-center font-mono whitespace-pre text-[14px] leading-relaxed">
          {asciiArt}
        </pre>
      </div>
    </div>
  );
}
