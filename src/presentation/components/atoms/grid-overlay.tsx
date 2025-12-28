"use client";

export function GridOverlay() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none flex justify-center select-none overflow-hidden">
      <div className="hidden xl:grid w-full max-w-[1216px] h-full grid-cols-12 gap-8 px-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full bg-white/2 border-x border-white/3 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white/1"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
