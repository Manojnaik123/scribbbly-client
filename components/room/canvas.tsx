import { CANVAS_COLORS } from '@/utils/colors/all-colors';
import React from 'react'
import { Undo2, Trash } from 'lucide-react'



const Canvas = () => {
    return (
        <div className='h-full w-full flex flex-col'>
            <canvas className='h-full w-full bg-white  border-4 border-[#00ff41] '></canvas>
            <div className='bg-[#12123a] h-12 md:h-16 p-2 flex justify-between items-center border-4 border-t-0 border-[#00ff41]'>
                <div className='grid grid-cols-4 grid-rows-2'>
                    {CANVAS_COLORS.map((color) => (
                        <button
                            key={color}
                            className='h-4 w-4 md:h-6 md:w-6 
                            hover:border-2 border-gray-500'
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
                <div className='bg-emerald-900'>
                    <div className='relative group'>
                        <button
                            className="
                            border-2 border-black
                            bg-gray-600
                            text-[#00ff41]
                            h-8
                            w-8
                            md:h-12
                            md:w-12
                            flex justify-center items-center
                            shadow-[3px_3px_0_#000]
                        "
                        >
                            <div className='h-2 w-2 bg-green-500 rounded-full'></div>
                        </button>

                        {/* Tooltip */}
                        <div
                            className="
                            absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                            bg-[#12123a]
                            border-2 border-black
                            text-[#00ff41]
                            px-2 py-1
                            text-[7px]
                            whitespace-nowrap
                            opacity-0 group-hover:opacity-100
                            pointer-events-none
                            shadow-[3px_3px_0_#000]
                        "
                            style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                            Choose brush stroke
                        </div>
                    </div>
                </div>
                <div className='flex gap-2'>

                    {/* Undo */}
                    <div className='relative group'>
                        <button
                            className="
                                border-2 border-black
                                 bg-gray-600
                                text-[#00ff41]
                               h-8
                            w-8
                            md:h-12
                            md:w-12
                                flex justify-center items-center
                                shadow-[3px_3px_0_#000]
                            "
                        >
                            <Undo2 size={18} strokeWidth={3} />
                        </button>

                        {/* Tooltip */}
                        <div
                            className="
                            absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                            bg-[#12123a]
                            border-2 border-black
                            text-[#00ff41]
                            px-2 py-1
                            text-[7px]
                            whitespace-nowrap
                            opacity-0 group-hover:opacity-100
                            pointer-events-none
                            shadow-[3px_3px_0_#000]
                        "
                            style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                            UNDO
                        </div>
                    </div>

                    {/* Clear */}
                    <div className='relative group'>
                        <button
                            className="
                            border-2 border-black
                             bg-gray-600
                            text-[#00ff41]
                            h-8
                            w-8
                            md:h-12
                            md:w-12
                            flex justify-center items-center
                            shadow-[3px_3px_0_#000]
                        "
                        >
                            <Trash size={18} strokeWidth={3} />
                        </button>

                        {/* Tooltip */}
                        <div
                            className="
                            absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                            bg-[#12123a]
                            border-2 border-black
                            text-[#ff4444]
                            px-2 py-1
                            text-[7px]
                            whitespace-nowrap
                            opacity-0 group-hover:opacity-100
                            pointer-events-none
                            shadow-[3px_3px_0_#000]
                        "
                            style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                            CLEAR
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Canvas