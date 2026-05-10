import React from 'react'
import ChatPanel from './chat-panel';
import Canvas from './canvas';

const DrawingCanvas = () => {
    const wordHint = 'hello'.split(' ')
    return (
        <>
            <div className='flex justify-start items-center px-2 py-1 md:px-4 md:py-2 gap-4'>
                <div className='text-[10px] sm:text-[14px] border-2 p-1 md:p-4 border-[#00ff41] text-[#00ff41]'>
                    56
                </div>
                <div className=' flex flex-col'>
                    <span className='text-[6px] sm:text-[8px] text-[#ffd700]'>Round</span>
                    <span className="text-[8px] sm:text-[10px] text-[#e8e8e8]">1 / 3</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center gap-1 min-w-0">
                    <span className="text-[6px] sm:text-[7px] text-[#ff77a8]">CURRENT GUESS:</span>
                    <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
                        {wordHint.map((letter, i) => (
                            <div key={i} className="flex flex-col items-center gap-0.5">
                                <span className="text-[11px] sm:text-[14px] text-[#e8e8e8] w-4 sm:w-5">{letter || ' '}</span>
                                <div className="w-4 sm:w-5 h-0.5 bg-[#e8e8e8]" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex-1'>
                <Canvas/>
            </div>
            <div className='bg-black h-3 md:h-6'>
                
            </div>
        </>
    )
}

export default DrawingCanvas