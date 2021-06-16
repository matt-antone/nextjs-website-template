export default function LogoLink({url,image,text}){
  return (
    <a href={url}>
      <img
        loading="lazy"
        className="h-8 w-auto sm:h-10"
        src={image}
        alt={text}
        width={250}
        height={50}
      />
    </a>
  )
}