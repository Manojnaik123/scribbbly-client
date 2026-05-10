import React from 'react'
import PlayerRow from './players-row';

const players = [1,2,3]

const PlayersList = () => {
  return (
    <div className="w-full h-full shrink-0 bg-[#0f0f23] border-r-2 border-black flex flex-col">
      {/* Header */}
      <div className="bg-[#00ff41] px-3 py-2">
        <span className="text-black text-[8px]">PLAYERS</span>
      </div>

      {/* Player rows */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {players.map((player) => (
          <PlayerRow key={Math.random()} />
        ))}
      </div>
    </div>
  )
}

export default PlayersList