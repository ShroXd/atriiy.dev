import * as SimpleIcons from 'simple-icons'

type Props = {
  name: keyof typeof SimpleIcons
  className?: string
}

export function BrandIcon({ name, className }: Props) {
  const icon = SimpleIcons[name]

  if (!icon) return null

  return (
    <svg
      role='img'
      viewBox='0 0 24 24'
      className={className}
      fill='currentColor'
    >
      <path d={icon.path} />
    </svg>
  )
}
