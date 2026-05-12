'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ChatPanel from './chat-panel';
import Canvas from './canvas';
import { socket } from '@/lib/socket';
import { Room } from '@/utils/props/room-prop';
import { playSound } from '@/lib/sound';
import RoomPage from '@/app/[roomId]/page';
import PlayerRow from './players-row';

const DrawingCanvas = ({ room, setRoom }: { room: Room, setRoom: Dispatch<SetStateAction<Room | null>> }) => {
    const isDrawer = room?.currentDrawerId === socket.id

    useEffect(() => {
        const handler = (room: Room) => {
            console.log('from drawing canvas');

            if ((room.wordsCollection ?? []).length > 0) {
                playSound('sounds/beep.mp3')
            }
            if (room.currentWord) {
                playSound('sounds/beep.mp3')
            }
            setRoom(room)
        }

        socket.on('room-updated', handler)

        return () => {
            socket.off('room-updated', handler)  // ← this was missing
        }
    }, [])

    function handleWordSelection(selectedWord: string) {
        console.log(selectedWord);

        socket.emit('word-selected', {
            roomId: room?.id,
            selectedWord
        })
    }

    const points = [10, 7, 5]

    const sortedPlayers = [...(room.players ?? [])].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))

    return (
        <>
            {/* <div className='relative flex flex-col h-full'> */}

            {/* OVERLAY */}
            {(room.currentPhase === 'drawing' || room.currentPhase === 'selection') && (
                <div className='flex justify-start items-center px-2 py-1 md:px-4 md:py-2 gap-4'>

                    <>
                        <div className='text-[10px] sm:text-[14px] border-2 p-1 md:p-4 border-[#00ff41] text-[#00ff41]'>
                            {room.currentPhase === 'drawing' && room.timeLeft}
                            {room.currentPhase === 'selection' && room.wordSelectionTime}
                        </div>
                        <div className=' flex flex-col'>
                            <span className='text-[6px] sm:text-[8px] text-[#ffd700]'>Round</span>
                            <span className="text-[8px] sm:text-[10px] text-[#e8e8e8]">{room?.currentRound} / {room?.maxRounds}</span>
                        </div>
                    </>

                    <div className="flex-1 flex flex-col items-center justify-center gap-1 min-w-0">
                        <span className="text-[6px] sm:text-[7px] text-[#ff77a8]">CURRENT GUESS:</span>
                        <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
                            {(room?.currentWord ?? '').split('').map((letter, i) => (
                                <div key={i} className="flex flex-col items-center gap-1">
                                    {socket.id === room?.currentDrawerId ? (
                                        <span className="text-[11px] sm:text-[14px] text-[#e8e8e8] w-4 sm:w-5">{letter || ' '}</span>
                                    ) : (
                                        <>
                                            <span className="text-[11px] sm:text-[14px] text-[#e8e8e8] w-4 sm:w-5">{' '}</span>
                                            <div className="w-4 sm:w-5 h-0.5 bg-[#e8e8e8] " />
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className='relative flex flex-col h-full'>
                {room?.currentPhase === 'selection' ? (
                    <div className='relative flex flex-col h-full'>
                        {/* OVERLAY */}
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

                            <div className="bg-[#12123a] border-4 border-[#ffd700] shadow-[8px_8px_0_#000] 
                                px-6 py-5 w-full h-full flex flex-col justify-center items-center  gap-4 relative">

                                {/* Top tag */}
                                <span className="absolute -top-3 right-4 bg-[#ffd700] text-black text-[7px] px-2 py-0.5 font-['Press_Start_2P']">
                                    WORD_SELECT_v1
                                </span>

                                {/* Title */}
                                <h2 className="text-[#e8e8e8] text-[10px] sm:text-[12px] font-['Press_Start_2P']">
                                    {isDrawer ? 'CHOOSE A WORD' : `${room.players.find(p => p.id === room.currentDrawerId)?.name} IS CHOOSING A WORD`}
                                </h2>

                                {/* Options */}
                                {isDrawer ? (
                                    <div className="flex gap-3 flex-wrap justify-center items-center">
                                        {(room?.wordsCollection ?? []).map((w, i) => (
                                            <button
                                                key={w}
                                                onClick={() => handleWordSelection(w)}
                                                className="
                                            bg-linear-to-b from-[#ff4d6d] to-[#7a1b3a]
                                            border-2 border-black
                                            text-[#ffd700]
                                            text-[8px] sm:text-[9px]
                                            px-3 py-2
                                            shadow-[3px_3px_0_#000]
                                            hover:from-[#ff6b85] hover:to-[#9b244a]
                                            hover:text-[#00ff41]
                                            hover:border-[#ffd700]
                                            active:translate-x-0.5
                                            active:translate-y-0.5
                                            active:shadow-none
                                            transition-all"
                                                style={{ fontFamily: "'Press Start 2P', monospace" }}
                                            >
                                                {w}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-[#e8e8e8]/50 text-[7px] sm:text-[9px] font-['Press_Start_2P']">PLEASE WAIT...</p>
                                )}

                            </div>
                        </div>

                    </div>
                ) : room?.currentPhase === 'drawing' ? (
                    <div className='flex-1'>
                        <Canvas />
                    </div>
                ) : room?.currentPhase === 'results' ? (
                    // <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

                    <div className="h-full bg-[#1b1f3a] border-4 border-[#00ff41] 
                              w-full p-6 sm:p-8 flex flex-col items-center gap-6 relative">

                        {/* Header */}
                        <h2 className="text-[#e8e8e8] text-[12px] sm:text-[14px] font-['Press_Start_2P'] text-center">
                            THE WORD WAS <span className="text-[#ffd700]">{room.currentWord}</span>
                        </h2>

                        {((room.correctGuessedPlayerIds?.length ?? 0) > 0) ? (
                            <>
                                <p className="text-[#00ff41] text-[9px] sm:text-[10px] font-['Press_Start_2P']">
                                    RESULTS OF THIS ROUND
                                </p>

                                <div className="w-full flex flex-col gap-2 mt-2">
                                    {(room.correctGuessedPlayerIds ?? []).map((id, i) => (
                                        <div
                                            key={i}
                                            className="flex justify-between items-center bg-[#0f1330] border border-[#2d2d6b] px-3 py-2 shadow-[3px_3px_0_#000]"
                                        >
                                            <span className="text-[#e8e8e8] text-[10px] sm:text-[11px] font-['Press_Start_2P']">
                                                {room.players.find(player => player.id === id)?.name}
                                            </span>

                                            <span className="text-[#00ff41] text-[10px] sm:text-[11px] font-['Press_Start_2P']">
                                                {`+${points[i] ?? 0}`}
                                            </span>
                                        </div>
                                    ))}
                                    <div
                                        key={'frfrfrf'}
                                        className="flex justify-between items-center bg-[#0f1330] border border-[#2d2d6b] px-3 py-2 shadow-[3px_3px_0_#000]"
                                    >
                                        <span className="text-[#e8e8e8] text-[10px] sm:text-[11px] font-['Press_Start_2P']">
                                            {room.players.find(player => player.id === room.currentDrawerId)?.name}
                                        </span>

                                        <span className="text-[#00ff41] text-[10px] sm:text-[11px] font-['Press_Start_2P']">
                                            {`+${5}`}
                                        </span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-[#c80d0d] text-[9px] sm:text-[10px] font-['Press_Start_2P']">
                                    NO ONE GUSSESD CORRECT IN THIS ROUND
                                </p>
                                <div className="w-full flex flex-col gap-2 mt-2">
                                    {(room.players ?? []).map((player, i) => (
                                        <div
                                            key={i}
                                            className="flex justify-between items-center bg-[#0f1330] border border-[#2d2d6b] px-3 py-2 shadow-[3px_3px_0_#000]"
                                        >
                                            <span className="text-[#e8e8e8] text-[10px] sm:text-[11px] font-['Press_Start_2P']">
                                                {player.name}
                                            </span>

                                            <span className="text-[#c80d0d] text-[10px] sm:text-[11px] font-['Press_Start_2P']">
                                                {'+0'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Score List */}


                        {/* Footer hint */}
                        <span className="text-[7px] text-[#888] font-['Press_Start_2P'] mt-2">
                            NEXT ROUND STARTING...
                        </span>

                    </div>
                    // {/* </div> */}
                ) : room.currentPhase === 'gameEnded' ? (
                    <>
                        <div className="py-6 h-full">
                            <div className="flex items-center justify-between mb-5">
                                <span style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[9px] text-[#ffd700] tracking-wide">LEADERBOARD</span>
                                {/* <span style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[7px] text-[#00ff41] animate-pulse">● LIVE</span> */}
                            </div>

                            <div className="bg-[#0a0a1a] border-[3px] border-[#ffd700] shadow-[5px_5px_0_#000] p-2.5 mb-4 h-full">
                                <span style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[6px] text-[#888] block mb-1.5 tracking-widest">RANK  PLAYER PTS</span>
                                <div className="h-px bg-[#2d2d6b] mb-2.5" />

                                {/* RANK 1 */}
                                <div className="flex items-center border-2 border-[#ffd700] shadow-[3px_3px_0_#000] bg-gradient-to-r from-[#2a1f00] to-[#1a1000] p-3 mb-3">
                                    <div style={{ fontFamily: "'Press Start 2P', monospace" }} className="w-11 h-11 bg-[#ffd700] text-black text-[13px] border-r-2 border-black mr-3 flex items-center justify-center shrink-0">1</div>
                                    <div className="flex-1">
                                        <div style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[10px] text-[#ffd700] mb-1">{sortedPlayers[0].name}</div>
                                        <div className="flex gap-1.5 items-center">
                                            <span style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[7px] bg-[#ffd700] text-black px-1.5 py-0.5">★ TOP</span>
                                            <span style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[7px] text-[#888]"></span>
                                        </div>
                                    </div>
                                    <div style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[13px] text-[#ffd700] shrink-0">{sortedPlayers[0].score}</div>
                                </div>

                                {/* RANK 2 */}
                                <div className="flex items-center border-2 border-[#c0c0c0] shadow-[3px_3px_0_#000] bg-[#12123a] px-3 py-2.5 mb-2">
                                    <div style={{ fontFamily: "'Press Start 2P', monospace" }} className="w-9 h-9 bg-[#c0c0c0] text-black text-[10px] border-r-2 border-black mr-2.5 flex items-center justify-center shrink-0">2</div>
                                    <div className="flex-1">
                                        <div style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[8px] text-[#e8e8e8] mb-0.5">{sortedPlayers[1].name}</div>
                                        <span style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[7px] text-[#888]">''</span>
                                    </div>
                                    <div style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[10px] text-[#c0c0c0] shrink-0">{sortedPlayers[1].score}</div>
                                </div>

                                {/* RANK 3 */}
                                <div className="flex items-center border-2 border-[#cd7f32] shadow-[3px_3px_0_#000] bg-[#12123a] px-3 py-2.5 mb-2">
                                    <div style={{ fontFamily: "'Press Start 2P', monospace" }} className="w-9 h-9 bg-[#cd7f32] text-black text-[10px] border-r-2 border-black mr-2.5 flex items-center justify-center shrink-0">3</div>
                                    <div className="flex-1">
                                        <div style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[8px] text-[#e8e8e8] mb-0.5">{sortedPlayers[2].name}</div>
                                        <span style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[7px] text-[#888]"></span>
                                    </div>
                                    <div style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[10px] text-[#cd7f32] shrink-0">{sortedPlayers[2].score}</div>
                                </div>

                                <div className="h-px bg-[#2d2d6b] my-2" />

                                {/* RANKS 4-7 */}
                                {(sortedPlayers.slice(3) ?? []).map((player, i) => (
                                    <div key={player.id} className={`flex items-center border-2 border-[#2d2d6b] shadow-[3px_3px_0_#000] bg-[#0f0f2a] px-3 py-2 `}>
                                        <div style={{ fontFamily: "'Press Start 2P', monospace" }} className="w-8 h-8 bg-[#2d2d6b] text-[#e8e8e8] text-[9px] border-r-2 border-black mr-2.5 flex items-center justify-center shrink-0">{i + 4}</div>
                                        <div className="flex-1">
                                            <div style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[7px] text-[#aaa] mb-0.5">{player.name}</div>
                                            <span style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[7px] text-[#555]">LVL {''}</span>
                                        </div>
                                        <div style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[9px] text-[#888] shrink-0">{player.score}</div>
                                    </div>
                                ))}
                            </div>


                        </div>
                    </>
                ) : (
                    <>
                    </>
                )}
            </div>

            <div className="bg-[#0a0a1a] border-t-2 border-[#00ff41] overflow-hidden h-7 flex items-center">
                <div className="whitespace-nowrap text-[#00ff41] text-[7px] animate-marquee">
                    {Array(6).fill(`${'drawerName'} IS DRAWING... `).join('')}
                </div>
            </div>
            {/* </div> */}
        </>
    )
}

export default DrawingCanvas