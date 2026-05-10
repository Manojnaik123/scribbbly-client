import { PixelButtonProps } from '@/utils/props/all-props';
import React from 'react'

const colorMap = {
    green: { bg: 'bg-[#00ff41]', text: 'text-black', shadow: 'shadow-[4px_4px_0_#000]', hover: 'hover:bg-[#00cc33]' },
    cyan: { bg: 'bg-[#00e5ff]', text: 'text-black', shadow: 'shadow-[4px_4px_0_#000]', hover: 'hover:bg-[#00b8cc]' },
    pink: { bg: 'bg-[#ff77a8]', text: 'text-black', shadow: 'shadow-[4px_4px_0_#000]', hover: 'hover:bg-[#ff4488]' },
    yellow: { bg: 'bg-[#ffd700]', text: 'text-black', shadow: 'shadow-[4px_4px_0_#000]', hover: 'hover:bg-[#ccac00]' },
    gray: { bg: 'bg-[#2d2d6b]', text: 'text-[#e8e8e8]', shadow: 'shadow-[4px_4px_0_#000]', hover: 'hover:bg-[#3d3d8b]' },
}

const PixelButton = ({
    label,
    onClick,
    color = 'green',
    fullWidth,
    className
}:
    PixelButtonProps
) => {
    const currentColor = colorMap[color]
    return (
        <button
            onClick={onClick}
            className={`
        ${currentColor.bg} ${currentColor.text} ${currentColor.shadow} ${currentColor.hover}
        ${fullWidth ? 'w-full' : ''}
        border-2 border-black
        px-4 py-3
        font-['Press_Start_2P'] text-[11px] tracking-wider
        active:translate-x-[3px] active:translate-y-[3px] active:shadow-none
        transition-none cursor-crosshair
        ${className ?? ''}
      `}
        >
            {label}
        </button>
    )
}

export default PixelButton