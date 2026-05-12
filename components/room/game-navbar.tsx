export default function GameNavbar({ roomName }: { roomName: string }) {
    return (
        <nav className="w-full h-12 bg-[#1a1a3e] border-b-4 border-[#00ff41] flex items-center justify-between px-4 shrink-0">
            <span className="text-[#00ff41] text-[13px]" style={{ textShadow: '2px 2px 0 #000' }}>
                SKRIBBBLY
            </span>
            <div className="flex items-center gap-3">
                <span className="text-[8px] text-[#ffd700]">Invite link:</span>
                <span className="text-[8px] text-[#00ff41] border border-[#00ff41] px-2 py-1">{`http://localhost:3000/?roomId=${roomName}`}</span>
            </div>
        </nav>
    )
}
