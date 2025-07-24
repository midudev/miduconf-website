export const shareTicketOnX = ({ username }) => {
  const hash = crypto.randomUUID().split('-')[0]
  const intent = 'https://x.com/intent/tweet'
  const text = `miduConf 2025 está cada vez más cerca...

¡La conferencia de programación GRATUITA del año!
Con speakers internacionales que inspiran
...¡y muchas sorpresas más!

📅 10 de SEPTIEMBRE

miduconf.com/ticket/${username}/${hash}`

  window.open(`${intent}?text=${encodeURIComponent(text)}`)
}
