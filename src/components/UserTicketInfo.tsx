import { useTicket } from "@hooks/useTicket"

export const UserTicketInfo = () => {
  const ticket = useTicket()
  
  const laVariableQueNoVariaPeroAlFinalSi = ticket?.user_fullname ?? '.'

  return (
    <div class="flex items-center space-x-4">
      <img class="rounded-full w-14 h-14" src={`https://unavatar.io/github/${ticket?.user_name}`} alt="" />
      <div class="">
          <div class="font-mono font-bold text-blue-800">{`@${ticket?.user_name ?? ''}`}</div>
          <div class="text-2xl font-bold text-slate-900">{laVariableQueNoVariaPeroAlFinalSi}</div>
      </div>
    </div>
  )
    
}