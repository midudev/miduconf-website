export const shareTicketOnX = ({ username }) => {
  const hash = crypto.randomUUID().split('-')[0]
  const intent = 'https://x.com/intent/tweet'
  const text = `¡No te pierdas la miduConf 2025!

👩‍💻 Conferencia de programación gratuita
🔥 Speakers TOP internacionales
🎁 +256 regalos para todos
...¡y muchas sorpresas más!

Apunta la fecha: 10 de SEPTIEMBRE

miduconf.com/ticket/${username}/${hash}`

  window.open(`${intent}?text=${encodeURIComponent(text)}`)
}
