'use client'

import React from 'react'
import { playSound } from '@/lib/sound'
import { PixelSelectProps } from '@/utils/props/all-props';
import { pixelSelectColorMap } from '@/utils/colors/all-colors';

const PixelSelect = ({
  value,
  onChange,
  options,
  disabled = false,
  color = 'pink',
  height = 'h-11',
}: PixelSelectProps) => {

  const currentColor = pixelSelectColorMap[color]

  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => {
        playSound('/sounds/select.mp3')
        onChange(e.target.value)
      }}
      onClick={() => {
        playSound('/sounds/select.mp3')
      }}
      className={`
        ${height}
        flex-1 
        bg-black
        border-2
        ${currentColor.border}
        ${currentColor.text}
        text-[7px] sm:text-[8px]
        px-3
        outline-none
        font-['Press_Start_2P']

        ${disabled
          ? 'cursor-not-allowed opacity-60'
          : 'cursor-pointer'
        }
      `}
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  )
}

export default PixelSelect