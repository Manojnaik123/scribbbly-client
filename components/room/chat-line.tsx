import { ChatMessage } from "@/utils/props/player-prop";

export default function ChatLine({ message }: { message: ChatMessage }) {
    if (message.type === 'system') {
        return (
            <p className="text-[#ff77a8] text-[5px] sm:text-[6px] leading-5">{`>> ${message.text}`}</p>
        )
    }

    if (message.type === 'correct') {
        return (
            <div className="bg-[#00ff41] px-2 py-1.5 shrink-0">
                <p className="text-black text-[5px] sm:text-[7px] leading-5">{`>> ${message.text}`}</p>
                <p className="text-black text-[5px] sm:text-[7px]">{`+${message.points}`}</p>
            </div>
        )
    }

    return (
        <p className="text-[5px] sm:text-[7px] leading-5 break-words">
            <span className="text-[#00e5ff]">{message.player}</span>
            <span className="text-[#555588]">{' > '}</span>
            <span className="text-[#e8e8e8]">{message.text}</span>
        </p>
    )
}