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
}

export function Navbar() {
  return (
    <aside className='mb-16 -ml-[8px] tracking-tight'>
      <div className='lg:sticky lg:top-20'>
        <nav
          className='fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto'
          id='nav'
        >
          <div className='flex flex-row space-x-0 pr-10'>
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <NavLink key={path} href={path}>
                  {name}
                </NavLink>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
