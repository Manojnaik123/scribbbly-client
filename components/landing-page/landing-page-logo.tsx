import { LOGO_COLORS } from '@/utils/colors/all-colors';
import { LOGO_LETTERS } from '@/utils/texts/all-texts';
import React from 'react'

const LandingPageLogo = () => {
    return (
        <div
            className="flex items-end flex-wrap justify-center gap-0.5 sm:gap-1 select-none"
            style={{ animation: 'pixelFloat 3s steps(3) infinite' }}
        >
            {LOGO_LETTERS.map((letter, i) => (
                <span
                    key={i}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold leading-none"
                    style={{
                        color: LOGO_COLORS[i % LOGO_COLORS.length],
                        textShadow: '3px 3px 0 #000',
                        fontFamily: "'Press Start 2P', monospace",
                    }}
                >
                    {letter}
                </span>
            ))}
        </div>
    )
}

export default LandingPageLogo