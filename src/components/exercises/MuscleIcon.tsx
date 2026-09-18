'use client';

import React from 'react';

export interface MuscleIconProps {
  muscleSlug?: string;
  muscleName?: string;
  className?: string;
}

export function MuscleIcon({ muscleSlug = '', muscleName = '', className = 'w-6 h-6' }: MuscleIconProps) {
  const normalized = (muscleSlug || muscleName).toLowerCase();

  // Helper to determine muscle category & subregion
  const isMidChest = normalized.includes('mid-chest') || normalized.includes('mid chest');
  const isUpperChest = normalized.includes('upper-chest') || normalized.includes('upper chest') || normalized.includes('incline');
  const isChest = isMidChest || isUpperChest || normalized.includes('chest');

  const isShoulders = normalized.includes('deltoid') || normalized.includes('shoulder') || normalized.includes('arnold') || normalized.includes('lateral');
  const isTriceps = normalized.includes('tricep') || normalized.includes('pushdown') || normalized.includes('skull');
  const isBiceps = normalized.includes('bicep') || normalized.includes('curl');
  const isBack = normalized.includes('lat') || normalized.includes('back') || normalized.includes('row') || normalized.includes('pull');
  const isCore = normalized.includes('abs') || normalized.includes('core') || normalized.includes('oblique');

  // Leg subregions
  const isCalves = normalized.includes('calf') || normalized.includes('calves');
  const isGlutes = normalized.includes('glute') || normalized.includes('hip') || normalized.includes('bridge');
  const isHamstrings = normalized.includes('hamstring') || normalized.includes('curl');
  const isQuads = normalized.includes('quad') || normalized.includes('extension');
  const isCompoundLeg = normalized.includes('squat') || (normalized.includes('leg press') && !isCalves) || normalized.includes('lunge') || normalized.includes('deadlift');

  const showUpperLeg = isQuads || isHamstrings || isGlutes || isCompoundLeg || (normalized.includes('leg') && !isCalves);
  const showLowerLeg = isCalves;

  // Render anatomical SVG badge
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} title={muscleName || muscleSlug}>
      <svg viewBox="0 0 64 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Silhouette Body Outline (Torso, Shoulders & Legs) */}
        <path
          d="M18 18 C18 14 26 12 32 12 C38 12 46 14 46 18 L52 24 C54 26 54 32 50 34 L46 36 L46 54 L44 86 C44 90 38 90 38 86 L32 58 L26 86 C26 90 20 90 20 86 L18 54 L18 36 L14 34 C10 32 10 26 12 24 Z"
          className="fill-muted/60 stroke-muted-foreground/40"
          strokeWidth="1.5"
        />

        {/* Highlighted Muscle Groups */}
        {/* Chest Region */}
        {isChest && (
          <g>
            {/* Mid Chest Highlight */}
            <path
              d="M23 26 C28 26 31 28 32 30 C33 28 36 26 41 26 C43 32 37 36 32 36 C27 36 21 32 23 26 Z"
              className={isMidChest ? "fill-primary stroke-primary animate-pulse" : "fill-primary/60 stroke-primary"}
              strokeWidth="1"
            />
            {/* Upper Chest Highlight */}
            {isUpperChest && (
              <path
                d="M24 22 C28 22 31 24 32 25 C33 24 36 22 40 22 C42 26 36 27 32 27 C28 27 22 26 24 22 Z"
                className="fill-amber-400 stroke-amber-300 animate-pulse"
                strokeWidth="1"
              />
            )}
          </g>
        )}

        {/* Shoulders / Deltoids */}
        {isShoulders && (
          <g className="fill-primary stroke-primary">
            <path d="M12 24 C14 20 18 18 20 22 C18 26 14 30 12 24 Z" />
            <path d="M52 24 C50 20 46 18 44 22 C46 26 50 30 52 24 Z" />
          </g>
        )}

        {/* Arms / Triceps / Biceps */}
        {(isTriceps || isBiceps) && (
          <g className="fill-primary stroke-primary">
            <path d="M10 28 C12 28 14 34 12 38 C10 38 8 32 10 28 Z" />
            <path d="M54 28 C52 28 50 34 52 38 C54 38 56 32 54 28 Z" />
          </g>
        )}

        {/* Back / Lats */}
        {isBack && (
          <path
            d="M20 26 C24 30 24 40 26 46 C22 44 18 36 20 26 M44 26 C40 30 40 40 38 46 C42 44 46 36 44 26"
            className="fill-primary stroke-primary"
            strokeWidth="1"
          />
        )}

        {/* Core / Abs */}
        {isCore && (
          <g className="fill-primary">
            <rect x="27" y="38" width="4" height="4" rx="1" />
            <rect x="33" y="38" width="4" height="4" rx="1" />
            <rect x="27" y="44" width="4" height="4" rx="1" />
            <rect x="33" y="44" width="4" height="4" rx="1" />
          </g>
        )}

        {/* Upper Legs (Quads, Hamstrings, Glutes) */}
        {showUpperLeg && (
          <g className="fill-primary stroke-primary/50 animate-pulse">
            <path d="M19 54 L19.5 72 L29.5 72 L31 58 Z" />
            <path d="M45 54 L44.5 72 L34.5 72 L33 58 Z" />
          </g>
        )}

        {/* Lower Legs (Calves) */}
        {showLowerLeg && (
          <g className="fill-primary stroke-primary/50 animate-pulse">
            <path d="M19.5 73 L21 85 C21 88 25 88 25 85 L29 73 Z" />
            <path d="M44.5 73 L43 85 C43 88 39 88 39 85 L35 73 Z" />
          </g>
        )}
      </svg>
    </div>
  );
}
