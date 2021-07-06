const MainSidebar = ({children}) => {
  return (
    <main className="col-span-12 lg:col-span-9 max-w-none relative z-20">
      {children}
    </main>
  )
}

export default MainSidebar
