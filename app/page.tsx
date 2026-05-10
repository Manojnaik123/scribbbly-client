'use client'

import { useEffect, useState } from 'react'

import Footer from "@/components/common/footer";
import PixelAvatar from "@/components/common/pixel-avatar";
import GameStartingCard from "@/components/landing-page/game-starting-card";
import GameStartingCars from "@/components/landing-page/game-starting-card";
import InfoCard from "@/components/landing-page/info-card";
import InformationSection from "@/components/landing-page/information-section";
import LandingPageLogo from "@/components/landing-page/landing-page-logo";
import Navbar from "@/components/landing-page/navbar";
import { AVATAR_COLORS, LOGO_COLORS } from "@/utils/colors/all-colors";
import { HARDCODED_NEWS_ITEMS, LOGO_LETTERS } from "@/utils/texts/all-texts";
import Image from "next/image";
import { useSearchParams } from 'next/navigation'
import GameRoom from '@/components/room/game-room';

export default function Home() {
  const [roomId, setRoomId] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const curRoomId = searchParams.get('roomId')

    async function checkRoom() {

      const res = await fetch(
        `http://localhost:3001/room/${curRoomId}`
      )

      if (!res.ok) {
        console.log('Room does not exist')
        return
      }
      setRoomId(curRoomId || '')
    }

    if(curRoomId){
      checkRoom()
    }

  }, [roomId])

  // remove this 
  console.log(roomId);

  return (
    <div
      className="min-h-screen flex flex-col bg-[#0f0f23] text-[#e8e8e8]"
      style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: 'pixelated' }}
    >

      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{ background: 'repeating-linear-gradient(transparent 0px, transparent 1px, rgba(0,0,0,0.15) 1px, rgba(0,0,0,0.15) 2px)' }}
      />

      {/* CRT vignette */}
      {/* <div
        className="fixed inset-0 pointer-events-none z-40"
        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)' }}
      /> */}

      {!roomId && (
        <>
          <Navbar />
          <div className="w-full h-1 bg-[#ffd700]" />

          <main className="flex-1 flex flex-col items-center px-4 py-8 gap-8">
            <LandingPageLogo />

            <p className="text-[#00ff41] text-[7px] sm:text-[9px] tracking-widest text-center">
              {`>> DRAW. GUESS. WIN. <<`}
            </p>

            {/* avatar view + game starting card */}
            <GameStartingCard setRoomId={setRoomId} />

            <InformationSection />
          </main>
        </>
      )}

      {roomId && (
        <GameRoom roomId={roomId}/>
      )

      }

      <Footer />
    </div>
  );
}
