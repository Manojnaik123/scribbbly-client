'use client'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import PixelButton from '../common/pixel-button';
import PixelAvatar from '../common/pixel-avatar';
import { AVATAR_COLORS } from '@/utils/colors/all-colors';
import { useState } from 'react'
import { getRandomBrainrotName } from '@/utils/texts/all-texts';


const GameStartingCard = ({ setRoomId }: { setRoomId: Dispatch<SetStateAction<string>> }) => {

    const [activeAvatarIndex, setActiveAvatarIndex] = useState(0)

    const [enteredUserName, setEnteredUserName] = useState('')

   

    function prevAvatar() {
        setActiveAvatarIndex((i) => (i - 1 + AVATAR_COLORS.length) % AVATAR_COLORS.length)
    }

    function nextAvatar() {
        setActiveAvatarIndex((i) => (i + 1) % AVATAR_COLORS.length)
    }

    function randomAvatar() {
        setActiveAvatarIndex(Math.floor(Math.random() * AVATAR_COLORS.length))
    }

    async function handleCreatePrivateRoom() {
        const response = await fetch('http://localhost:3001/room', {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: enteredUserName || getRandomBrainrotName(), avatar: AVATAR_COLORS[activeAvatarIndex] })
        })

        const data = await response.json()

        setRoomId(data.roomId)
    }

   

    
    

    return (
        <>
            <div className="w-full border-b-4 border-[#ffd700] pb-4">
                <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                    {AVATAR_COLORS.map((colorKey, i) => (
                        <div
                            key={colorKey}
                            className="bg-[#12123a] p-1 border-2 border-black shadow-[3px_3px_0_#000] cursor-pointer hover:border-[#ffd700]"
                            style={{ animation: `pixelBounce 1.5s steps(2) infinite`, animationDelay: `${i * 0.15}s` }}
                            onClick={() => setActiveAvatarIndex(i)}
                        >
                            {/* Smaller on mobile */}
                            <PixelAvatar color={colorKey} scale={2} active={i === activeAvatarIndex} className="sm:hidden" />
                            <PixelAvatar color={colorKey} scale={3} active={i === activeAvatarIndex} className="hidden sm:block" />

                            {/* <PixelAvatar scale={3} color={colorKey} active={i === activeAvatarIndex} className="" /> */}
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-full max-w-lg border border-4 border-[#ffd700] shadow-[8px_8px_0_#000] p-4 sm:p-6 flex flex-col gap-5 relative'>
                <span className="absolute -top-3 right-4 bg-[#ffd700] text-black text-[7px] px-2 py-0.5 font-['Press_Start_2P']">
                    LOGIN_v1.94
                </span>

                <div className="flex flex-col gap-2">
                    <label className="text-[7px] sm:text-[8px] text-[#e8e8e8]">ENTER YOUR CODENAME:</label>
                    <input
                        type="text"
                        value={enteredUserName}
                        onChange={(e) => setEnteredUserName(e.target.value)}
                        placeholder="PLAYER_ONE"
                        maxLength={16}
                        className="w-full h-11 sm:h-12 bg-black border-2 border-[#00ff41] px-3 text-[#00ff41] text-[9px] sm:text-[10px] outline-none focus:border-[#ffd700] placeholder:text-[#1a4a1a]"
                        style={{ fontFamily: "'Press Start 2P', monospace" }}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[7px] sm:text-[8px] text-[#e8e8e8]">LANGUAGE:</label>
                    <div className="flex gap-3">
                        <select
                            // value={language}
                            // onChange={(e) => setLanguage(e.target.value)}
                            className="flex-1 h-11 bg-black border-2 border-[#ff77a8] text-[#ff77a8] text-[7px] sm:text-[8px] px-3 outline-none cursor-pointer"
                            style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                            {['ENGLISH', 'GERMAN', 'FRENCH', 'SPANISH', 'PORTUGUESE'].map((l) => (
                                <option key={l} value={l}>{l}</option>
                            ))}
                        </select>
                        <button
                            onClick={randomAvatar}
                            className="bg-[#2d2d6b] border-2 border-black text-[#e8e8e8] text-[7px] sm:text-[8px] px-3 sm:px-4 shadow-[3px_3px_0_#000] hover:bg-[#3d3d8b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                            style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                            ⚄ RANDOM
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[7px] sm:text-[8px] text-[#e8e8e8] text-center">CHOOSE AVATAR:</label>
                    <div className="flex items-center justify-center gap-4 bg-black border-2 border-[#2d2d6b] p-4">
                        <button
                            onClick={prevAvatar}
                            className="text-[#e8e8e8] text-xl w-8 h-8 bg-[#2d2d6b] border-2 border-black shadow-[3px_3px_0_#000] hover:bg-[#3d3d8b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center"
                        >
                            ‹
                        </button>
                        {/* Smaller preview on mobile */}
                        <PixelAvatar color={AVATAR_COLORS[activeAvatarIndex]} scale={4} className="sm:hidden" />
                        <PixelAvatar color={AVATAR_COLORS[activeAvatarIndex]} scale={6} className="hidden sm:block" />
                        <button
                            onClick={nextAvatar}
                            className="text-[#e8e8e8] text-xl w-8 h-8 bg-[#2d2d6b] border-2 border-black shadow-[3px_3px_0_#000] hover:bg-[#3d3d8b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center"
                        >
                            ›
                        </button>
                    </div>
                </div>

                <PixelButton label="> PLAY! <" color="green" fullWidth />
                <PixelButton label="[ CREATE PRIVATE ROOM ]" color="cyan" fullWidth onClick={handleCreatePrivateRoom} />

            </div>
        </>
    )
}

export default GameStartingCard