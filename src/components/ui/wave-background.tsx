'use client';

import React from 'react';

interface WavesProps {
  className?: string;
  strokeColor?: string;
  backgroundColor?: string;
  pointerSize?: number;
}

export const Waves = React.memo(function Waves({
  className = '',
  strokeColor = '#00000066',
  backgroundColor = 'transparent',
}: WavesProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 18%, rgba(0,0,0,0.08), transparent 38%),
            radial-gradient(circle at 82% 76%, rgba(0,0,0,0.08), transparent 42%),
            linear-gradient(to bottom, rgba(255,255,255,0.18), rgba(255,255,255,0))
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage: `repeating-linear-gradient(
            to right,
            transparent 0,
            transparent 62px,
            ${strokeColor} 62px,
            ${strokeColor} 63px
          )`,
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.3))',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.3))',
        }}
      />
    </div>
  );
});
