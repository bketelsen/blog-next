import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import categories from '@/data/categories'
import global from '@/data/global'

const LayoutWrapper = ({ children }) => {
  const cats = categories.filter(
    (cat) =>  cat.slug !== 'page'
  )
  return (
    <SectionContainer>
      <div className="flex flex-col justify-between h-screen">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label="Tailwind CSS Blog">
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo />
                </div>

                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {global.siteName}
                  </div>

              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {cats.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100"
                >
                  {cat.plural}
                </Link>
              ))}

                <Link
                  key='about'
                  href='/about'
                  className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100"
                >
                  About
                </Link>
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
