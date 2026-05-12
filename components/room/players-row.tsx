'use client'

import PixelAvatar from "../common/pixel-avatar";
import { Player } from '@/utils/props/player-prop';
import { socket } from '@/lib/socket'

export default function PlayerRow(
  { player, isActive }: { player: Player, isActive: boolean }
) {

  return (
    <div
      className={`
        flex items-center gap-2 px-3 py-3 border-b border-[#1a1a3e] border-l-4
        ${isActive ? 'bg-[#1a1a3e] border-l-[#ffd700]' : 'border-l-transparent'}
      `}
    >
      {/* Rank */}
      <span className=" text-[6px] md:text-[7px] text-red-500 w-3 md:w-5 shrink-0">
        {'# '+1}
      </span>

      {/* Avatar */}
      <div className="shrink-0">
        <PixelAvatar
          color={player.avatarColor} // fallback if not typed yet
          scale={2}
          className="hidden md:flex"
          active={isActive}
        />

        <PixelAvatar
          color={player.avatarColor} // fallback if not typed yet
          scale={1}
          className="sm:hidden"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 min-w-0">
        <span
          className={`text-[5px] md:text-[7px] truncate ${true ? 'text-[#00e5ff]' : 'text-[#e8e8e8]'
            }`}
        >
          {player.name}
          {socket.id === player.id ? ' [YOU]' : ''}
        </span>

        <span className="text-[5px] md:text-[6px] text-[#00ff41]">
          {123} PTS {player.isHost && '[Host]'}
        </span>
      </div>

      {/* Drawing indicator */}
      {true && (
        <span className="text-[10px] shrink-0 ml-auto">✏</span>
      )}
    </div>
  )
}