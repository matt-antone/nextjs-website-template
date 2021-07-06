
const Aside = ({children}) => {
  return (
    <aside role="complementary" className="col-span-12 lg:col-span-3 print:cols-span-12 lg:border-l pl-8">
      {children}
    </aside>
  )
}
export default Aside
