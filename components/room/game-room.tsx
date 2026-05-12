'use client'

import React, { useEffect, useRef, useState } from 'react'
import GameNavbar from './game-navbar';
import PlayersList from './players-list';
import DrawingCanvas from './drawing-canvas';
import ChatPanel from './chat-panel';
import { socket } from '@/lib/socket'
import { getRandomBrainrotName } from '@/utils/texts/all-texts';
import { AVATAR_COLORS } from '@/utils/colors/all-colors';
import WaitingRoom from './waiting-room';
import { Room } from '@/utils/props/room-prop';
import { LanguageType } from '@/utils/props/all-props';
import { playSound } from '@/lib/sound';
import Sample from './sample';

const GameRoom = ({ roomId, activeAvatarIndex, enteredUserName, selectedLanguage }: { roomId: string, enteredUserName: string, activeAvatarIndex: number, selectedLanguage: LanguageType }) => {
  const [room, setRoom] = useState<Room | null>(null)
  const handlerRef = useRef<((room: Room) => void) | null>(null)

  function startGame() {
    socket.emit('round-start', {
      roomId
    })
  }

  useEffect(() => {

    socket.connect()
    console.log('GAMEROOM EFFECT RUNNING') 
    playSound('/sounds/start.mp3')

    socket.emit('join-room', {
      roomId,
      name: enteredUserName,
      selectedLanguage,
      avatarColor: AVATAR_COLORS[activeAvatarIndex]
    })

    console.log('CLIENT SOCKET ID:', socket.id)
    // const handler = () =>

    function handler(room: Room) {
      // console.log('GAME ROOM HANDLER FIRED', room.currentPhase)
      setRoom(room)
    }

    socket.on('room-updated', handler)  // here 
    // console.log('TOTAL LISTENERS:', socket.listeners('room-updated').length)

    // socket.on('room-updated', () => {
    //   setRoom(room)
    // })

    return () => {
      
      console.log('GAMEROOM CLEANUP RUNNING') 
      socket.off('room-updated', handler)  // ✅ no implicit return
      socket.disconnect()
    }
  }, [])

  return (
    <div className=' flex flex-col flex-1'>
      <GameNavbar roomName={roomId} />
      <div className="flex-1 grid grid-cols-2 grid-rows-2 md:grid-cols-5 md:grid-rows-1">

        {/* Section 2 */}
        <div className="order-1 col-span-2 row-span-1 md:order-2 md:col-span-3 flex flex-col h-full">
          {room && room.gameStarted ? (
            <DrawingCanvas room={room} setRoom={setRoom} />
          ) : !room?.gameEnded ? (
            <WaitingRoom isHost={room?.players.find(player => player.id === socket.id)?.isHost || false} onStart={startGame} roomId={room?.id ?? ''} />
          ) : (
            <div className='h-full w-full flex justify items-center border-4 border-green-400'>
              Game ended
            </div>
          )}
        </div>

        {/* <Sample/> */}

        {/* Section 1 */}
        <div className=" order-2 md:order-1 md:col-span-1 bg-red-500">
          {room && <PlayersList room={room} />}
        </div>

        {/* Section 3 */}
        <div className=" order-3 md:order-3 md:col-span-1 bg-green-500">
          {room && <ChatPanel room={room} />}
        </div>

      </div>
    </div>
  )
}

export default GameRoom

