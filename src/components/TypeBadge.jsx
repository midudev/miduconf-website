import { IconRun } from '@tabler/icons-react'

const types = {
  sprint: {
    name: 'Sprint',
    icon: IconRun,
    className: 'bg-yellow-900 text-yellow-300',
  },
}

export const TypeBadge = ({ name }) => {
  const info = types[name]

  return (
    <span className={`flex justify-center items-center ${info.className}`}>
      <info.icon className="w-8 h-8" />
      {sprint[name]}
    </span>
  )
}
