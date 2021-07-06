export default function ButtonLink(props){
  ////console(props)
  return (
    <a
      className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-brand-primary bg-brand-primary hover:bg-white"
      href={props.href} target="">{props.text ? props.text : props.children}</a>
  )
}