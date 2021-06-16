const CLOUDINARY_URL = 'https://res.cloudinary.com/navalign-wealth-partners/image/upload';

export default function CloudinaryImage({src = '',lazy = false,alt,width,height,layout,className,transform = '',ariaHidden = null}){
  return (
    <picture>
      <img
        src={convertImage(src,width,height,transform)}
        aria-hidden={ariaHidden}
        alt={alt}
        width={width}
        height={height}
        layout={layout ? layout : ''}
        className={`${className ? className : ''}`}
        loading={ lazy ? 'lazy' : 'eager' }
        />
    </picture>
  )
}

export const getTransform = (width,height,transform) => {
  // const h = height ? `h_${height},` : ''
  // const w = width ? `w_${width},` : ''
  const t = transform ? transform : ''
  return `/c_fill,${h}${w}${t}`
}

export const convertImage = (src,width,height,transform = '') => {
  switch(true){
    case !src.includes('http'):
      return CLOUDINARY_URL+"/"+transform+src
    default:
      const split = src.split('upload')
      //console.log(split)
      return split[0]+'upload/'+transform+split[1]
  }
}
