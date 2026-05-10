export default function Navbar() {
  return (
    <nav className="w-full h-12 bg-[#1a1a3e] border-b-4 border-[#00ff41] flex items-center justify-between px-6">
      <span className="font-['Press_Start_2P'] text-[13px] text-[#00ff41] shadow-[2px_2px_0_#000]">
        SKRIBBBLY
      </span>
      <div className="flex items-center gap-5 text-[#e8e8e8]">
        <button className="font-['Press_Start_2P'] text-[10px] hover:text-[#ffd700] transition-none">🔊</button>
        <button className="font-['Press_Start_2P'] text-[10px] hover:text-[#ffd700] transition-none">⚙</button>
      </div>
    </nav>
  )
}
