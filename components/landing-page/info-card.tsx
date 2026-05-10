import { InfoCardProps } from "@/utils/props/all-props";

export default function InfoCard({ title, accentColor, borderColor, children }: InfoCardProps) {
  return (
    <div className={`bg-[#12123a] border-2 ${borderColor} shadow-[4px_4px_0_#000] p-5 flex flex-col gap-3`}>
      <h2 className={`font-['Press_Start_2P'] text-[11px] ${accentColor} border-b-2 ${borderColor} pb-2`}>
        {title}
      </h2>
      <div className="font-['Press_Start_2P'] text-[7px] text-[#9090b0] leading-6">
        {children}
      </div>
    </div>
  )
}