import React from 'react'

const ChatPanel = () => {
    return (
        <div className="flex flex-col h-full w-full  bg-[#0f0f23] border-l-2 border-black">

            {/* Header */}
            <div className="bg-[#1a1a3e] border-b-2 border-black px-3 py-2 shrink-0">
                <span className="text-[#ff77a8] text-[7px] sm:text-[8px]">CHAT LOG</span>
            </div>

            {/* Messages — scrollable, takes all remaining space */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-1 px-2 sm:px-3 py-2 min-h-0">
                {/* {messages.map((msg) => (
                    <ChatLine key={msg.id} message={msg} />
                ))} */}
            </div>

            {/* Input — always at bottom, never cut off */}
            <div className="shrink-0 border-t-4 border-[#00ff41] flex items-center px-2 py-2 gap-2 bg-[#0f0f23]">
                <span className="text-[#00ff41] text-[9px] shrink-0">{'>'}</span>
                <input
                    type="text"
                    // value={guess}
                    // onChange={(e) => onGuessChange(e.target.value)}
                    // onKeyDown={(e) => e.key === 'Enter' && onGuessSubmit()}
                    // placeholder={isDrawing ? 'YOU ARE DRAWING' : 'TYPE GUESS_'}
                    // disabled={isDrawing}
                    className="flex-1 min-w-0 bg-transparent text-[#00ff41] text-[6px] sm:text-[7px] outline-none placeholder:text-[#1a4a1a] disabled:text-[#333355] disabled:placeholder:text-[#333355]"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                />
            </div>
        </div>
    )
}

export default ChatPanel