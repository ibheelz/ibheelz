export default function Home() {
  const asciiArt = `▄▄    ▄▄                ▄▄
██    ██                ██
████▄ ████▄ ▄█▀█▄ ▄█▀█▄ ██ ▀▀▀██
██ ██ ██ ██ ██▄█▀ ██▄█▀ ██   ▄█▀
████▀ ██ ██ ▀█▄▄▄ ▀█▄▄▄ ██ ▄██▄▄`;

  return (
    <div className="pt-10 tablet:pt-[50px] pb-20 px-10">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        <div className="border border-red p-4">
          <pre className="text-red font-mono text-[13px] tablet:text-[18px] leading-[1] whitespace-pre font-bold">
            {asciiArt}
          </pre>
        </div>
      </div>
    </div>
  );
}
