import BlockContainer from './blocks/BlockContainer'
import navigation from '@data/footer-nav'
import LetsTalk from './LetsTalk'

export default function Footer() {
  return (
    <footer className="bg-white pt-16">
      <BlockContainer landingPage={true}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
          <div className="flex justify-center items-center w-full">
            <div className="w-full lg:w-4/5 xl:w-2/3 items-center">
                <LetsTalk className="w-full list-none items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"/>
            </div>
		    	</div>
          <div className="flex justify-center items-center w-full">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-12">
              <div className="col-span-2 lg:text-right">
                  <img alt="Navalign Wealth Partners" className="w-1/2 md:w-2/3 lg:w-full h-auto max-w-xs mb-4" width={300} height={80} src="https://res.cloudinary.com/navalign/image/upload/q_auto:good/v1546980899/navalign-logo-bottom.svg"/>
                  15910 Ventura Boulevard, Suite 1605<br/>
                  Encino, CA 91436
                </div>
              <div className="grid grid-cols-3 gap-4">
                {navigation.social.map((item) => (
                  <a key={item.name} href={item.href} className="text-gray-600 hover:text-gray-500">
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <nav className="-mx-5 my-8 flex flex-wrap justify-center" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <a href={item.href} className="text-brand-secondary text-gray-500 hover:text-gray-900">
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <p className="mt-8 text-center text-sm text-gray-600">Financial planning and investment management services offered through Navalign, LLC a Registered Investment Adviser.</p>
        <p className="mt-8 text-center text-sm text-gray-600">&copy;2019 Navalign, {
          navigation.secondary.map((item,i)=>{
            return (
              <span key={item.href}>
                <a

                  className="text-brand-secondary"
                  href={item.href} target={item.target ? item.target : ''}
                  rel={item.target ? 'noopener noreferrer' : ''}>
                      {item.name}
                  </a>{ i === (navigation.secondary.length -1) ? "" : " | "}

              </span>
            )

          })
        }</p>
      </BlockContainer>
    </footer>
  )
}
