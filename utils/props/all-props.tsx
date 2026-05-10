import { WithStringifiedURLs } from "next/dist/lib/metadata/types/metadata-interface";
import { AVATAR_COLORS } from "../colors/all-colors";

export type PixelAvatarProps = {
    color : AvatarColorType
    scale: number
    active? : boolean
    onClick?: () => void
    className?: string
}

export type AvatarColorType = typeof AVATAR_COLORS[number]

export type PixelButtonProps = {
    label: string
    onClick? : () => void
    color?: 'green' | 'cyan' | 'pink' | 'yellow' | 'gray'
    fullWidth? : boolean
    className? : string
}

export type InfoCardProps = {
  title: string
  accentColor: string   
  borderColor: string   
  children: React.ReactNode
}