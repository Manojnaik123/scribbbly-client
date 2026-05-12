'use client'

import { socket } from "@/lib/socket";
import { useEffect, useRef } from "react";

const Sample = () => {
    const handlerRef = useRef<((room: any) => void) | null>(null)

    useEffect(() => {
        // store handler in ref so it survives remounts
        handlerRef.current = (room) => {
            console.log('from sample', room.wordSelectionTime)
        }

        socket.on('room-updated', handlerRef.current)

        return () => {
            if (handlerRef.current) {
                socket.off('room-updated', handlerRef.current)
                handlerRef.current = null
            }
        }
    }, [])

    return (
        <div className='w-28 h-28 bg-red-500'></div>
    )
}

export default Sample