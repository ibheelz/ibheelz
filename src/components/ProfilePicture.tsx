"use client";

import { useState } from "react";

export default function ProfilePicture() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-col items-end gap-2">
      {imageError || true ? (
        <div className="w-[200px] h-[220px] bg-surface flex items-center justify-center border border-border">
          <span className="text-muted text-sm">[ photo ]</span>
        </div>
      ) : (
        <img
          src="/images/bheelz.jpg"
          alt="bheelz"
          className="w-[200px] h-[220px] object-cover"
          onError={() => setImageError(true)}
        />
      )}
      <span className="text-gray text-xs">bheelz.jpg</span>
    </div>
  );
}
