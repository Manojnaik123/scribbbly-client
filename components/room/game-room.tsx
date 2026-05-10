import React from 'react'
import GameNavbar from './game-navbar';
import PlayersList from './players-list';
import DrawingCanvas from './drawing-canvas';
import ChatPanel from './chat-panel';

const GameRoom = ({ roomId }: { roomId: string }) => {
  const wordHint = 'hello'.split(' ')
  return (
    <div className=' flex flex-col flex-1'>
      <GameNavbar roomName={roomId} />
      <div className="flex-1 grid grid-cols-2 grid-rows-2 md:grid-cols-5 md:grid-rows-1">

        {/* Section 2 */}
        <div className="order-1 col-span-2 row-span-1 md:order-2 md:col-span-3 flex flex-col h-full">
          <DrawingCanvas/>
        </div>

        {/* Section 1 */}
        <div className=" order-2 md:order-1 md:col-span-1 bg-red-500">
          <PlayersList />
        </div>

        {/* Section 3 */}
        <div className=" order-3 md:order-3 md:col-span-1 bg-green-500">
          <ChatPanel/>
        </div>

      </div>
    </div>
  )
}

export default GameRoom

