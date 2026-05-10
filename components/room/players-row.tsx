import PixelAvatar from "../common/pixel-avatar";

export default function PlayerRow() {
  const isActive = true

  return (
    <div
      className={`
  flex items-center gap-2 px-3 py-3 border-b border-[#1a1a3e] border-l-4
  ${isActive ? 'bg-[#1a1a3e] border-l-[#ffd700]' : 'border-l-transparent'}
`}
    >
      {/* Rank */}
      <span className="text-[8px] text-red-500 w-6 shrink-0">
        {/* {'# ' + String(player.rank).padStart(2, '0')} */}
      </span>

      {/* Avatar */}
      <div className="shrink-0">
        <PixelAvatar
          color={'red'} // fallback if not typed yet
          scale={2}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 min-w-0">
        <span
          className={`text-[7px] truncate ${
            true ? 'text-[#00e5ff]' : 'text-[#e8e8e8]'
          }`}
        >
          {'manoj'}
          {true ? ' [YOU]' : ''}
        </span>

        <span className="text-[6px] text-[#00ff41]">
          {123} PTS
        </span>
      </div>

      {/* Drawing indicator */}
      {true && (
        <span className="text-[10px] shrink-0 ml-auto">✏</span>
      )}
    </div>
  )
}