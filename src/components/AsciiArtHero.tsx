export default function AsciiArtHero() {
  const asciiArt = `  _    _            _
 | |__| |_  ___ ___| |___
 | '_ \\ ' \\/ -_) -_) |_ /
 |_.__/_||_\\___\\___|_/__|`;

  return (
    <div className="flex flex-col items-center gap-5 border-[5px] border-double border-red p-[30px] inline-flex">
      <pre className="text-red text-[13px] leading-[1] tracking-normal font-medium m-0 whitespace-pre">
        {asciiArt}
      </pre>
      <p className="text-white text-base font-medium m-0">developer & pentester</p>
    </div>
  );
}
