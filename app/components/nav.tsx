import { BrandIcon } from './BrandIcon'
import NavLink from './NavLink'

const navItems = {
  '/': {
    name: 'home',
  },
  '/blog': {
    name: 'blog',
  },
  '/reading': {
    name: 'reading',
  },
  '/memos': {
    name: 'memos',
  },
}

type SocialLink = {
  href: string
  label: string
  icon: Parameters<typeof BrandIcon>[0]['name']
  external?: boolean
}

const socialLinks: SocialLink[] = [
  {
    href: 'https://github.com/ShroXd',
    label: 'GitHub profile',
    icon: 'siGithub',
    external: true,
  },
  {
    href: '/rss',
    label: 'RSS feed',
    icon: 'siRss',
    external: true,
  },
]

export function Navbar() {
  return (
    <aside className='mb-16 -ml-[8px] tracking-tight'>
      <div className='lg:sticky lg:top-20'>
        <nav
          className='fade relative flex w-full scroll-pr-6 flex-col px-0 pb-0 md:relative md:overflow-visible'
          id='nav'
        >
          <div className='flex w-full flex-col flex-wrap gap-6 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-row flex-wrap gap-x-6 gap-y-2'>
              {Object.entries(navItems).map(([path, { name }]) => {
                return (
                  <NavLink key={path} href={path}>
                    {name}
                  </NavLink>
                )
              })}
            </div>
            <ul className='flex flex-row items-center gap-3'>
              {socialLinks.map(link => (
                <li key={link.href}>
                  <a
                    className='group flex h-9 w-9 items-center justify-center rounded-full border border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:text-neutral-900 focus-visible:outline-offset-2 focus-visible:outline-neutral-800'
                    aria-label={link.label}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    target={link.external ? '_blank' : undefined}
                    href={link.href}
                  >
                    <BrandIcon
                      name={link.icon}
                      className='h-4 w-4 text-current transition-colors duration-200'
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  )
}
