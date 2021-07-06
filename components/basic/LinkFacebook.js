import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

function LinkFacebook({url,text}) {
  return (
    <a
    href={url}
    target="new"
    rel="noreferrer noopener"
    className="inline-flex text-brand-primary">
      <span className="pr-1"><FontAwesomeIcon icon={faFacebook}/></span>
      { text ? (<span>{text}</span>) : '' }
    </a>
  )
}

export default LinkFacebook

