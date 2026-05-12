import { WithStringifiedURLs } from "next/dist/lib/metadata/types/metadata-interface";
import { AVATAR_COLORS } from "../colors/all-colors";

export type LanguageType = 'ENGLISH' | 'FRENCH' | 'GERMAN' | 'SPANISH'

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

export type PixelSelectColor =
  | 'pink'
  | 'green'
  | 'cyan'
  | 'yellow'

export type PixelSelectProps = {
  value: string | number
  onChange: (value: string) => void
  options: (string | number)[]
  disabled?: boolean
  color?: PixelSelectColor
  height?: string
}