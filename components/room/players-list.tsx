'use client'

import React, { useEffect, useState } from 'react'
import PlayerRow from './players-row';

import { Player } from '@/utils/props/player-prop';
import { Room } from '@/utils/props/room-prop';
import { log } from 'next/dist/server/typescript/utils';
import { socket } from '@/lib/socket';


const PlayersList = ({ room }: { room: Room }) => {

  // const [room, setRoom] = useState<Room | null>(null);

  // useEffect(() => {

  //   socket.on('room-updated', (room) => {
  //     console.log('from players list');

  //     // setRoom(room)
  //   })

  // }, [])

  // useEffect(() => {
  //   socket.on('room-updated', (room) => {
  //     console.log('from plaers list');

  //   })
  // })

  return (
    <div className="w-full h-full shrink-0 bg-[#0f0f23] border-r-2 border-black flex flex-col">
      {/* Header */}
      <div className="bg-[#00ff41] px-3 py-2">
        <span className="text-black text-[8px]">PLAYERS</span>
      </div>

      {/* Player rows */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {room && room.players.map((player) => (
          <PlayerRow key={player.id} player={player} isActive={room.currentDrawerId === player.id} />
        ))}
      </div>
    </div>
  )
}

export default PlayersList